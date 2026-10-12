import "server-only";
import { cache } from "react";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { galleryCategories, type GalleryCategory } from "@/config/categories";
import type { SiteImage } from "./types";
import { slugify } from "./utils";

/**
 * Système d'images piloté par le système de fichiers.
 * Tout est lu au build : dimensions réelles (aucun décalage de mise en page)
 * et placeholder flou généré avec sharp.
 */

export type CategoryGallery = GalleryCategory & {
  images: SiteImage[];
  /** Première photo de la catégorie. */
  cover: SiteImage | null;
};

const IMAGES_ROOT = path.join(process.cwd(), "public", "images");
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const ALT_FILE = "_alts.json";
const BRAND = "La Maisonnette Traiteur";

const collator = new Intl.Collator("fr", { numeric: true, sensitivity: "base" });

const readDir = cache(async (dir: string) => {
  try {
    return await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
});

/** Résout « gallery/entrees » en chemin réel, segment par segment (casse et accents ignorés). */
async function resolveFolder(name: string) {
  let resolved = "";
  for (const segment of name.split("/")) {
    const target = slugify(segment);
    const entries = await readDir(path.join(IMAGES_ROOT, resolved));
    const match = entries.find((e) => e.isDirectory() && slugify(e.name) === target)?.name;
    if (!match) return null;
    resolved = resolved ? `${resolved}/${match}` : match;
  }
  return resolved;
}

/** Transforme « 03_tajine-agneau.jpg » en « Tajine agneau ». Ignore les noms d'appareil photo. */
function labelFromFilename(file: string) {
  const base = path
    .parse(file)
    .name.replace(/^\d+[\s._-]*/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!base || /^(img|dsc|dscf|dscn|image|photo|pxl|wa|whatsapp|screenshot|capture|hero)\b/i.test(base)) return "";
  if (/^[\d\s]+$/.test(base) || base.replace(/\s/g, "").length < 3) return "";
  return base.charAt(0).toUpperCase() + base.slice(1);
}

async function readAltOverrides(dir: string): Promise<Record<string, string>> {
  try {
    return JSON.parse(await fs.readFile(path.join(dir, ALT_FILE), "utf8"));
  } catch {
    return {};
  }
}

/** `version` : empreinte du contenu, ajoutée à l'URL pour qu'une photo remplacée sous le même nom ne reste pas en cache. */
type ImageData = Pick<SiteImage, "width" | "height" | "blurDataURL"> & { version: string };
const dataCache = new Map<string, Promise<ImageData | null>>();

function readImageData(file: string) {
  let pending = dataCache.get(file);
  if (!pending) {
    pending = (async () => {
      try {
        const buffer = await fs.readFile(file);
        const meta = await sharp(buffer, { failOn: "none" }).metadata();
        if (!meta.width || !meta.height) return null;
        const rotated = (meta.orientation ?? 1) >= 5;
        const blur = await sharp(buffer, { failOn: "none" })
          .rotate()
          .resize(16, 16, { fit: "inside" })
          .webp({ quality: 45 })
          .toBuffer();
        return {
          width: rotated ? meta.height : meta.width,
          height: rotated ? meta.width : meta.height,
          blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
          version: createHash("sha1").update(buffer).digest("hex").slice(0, 10),
        };
      } catch (error) {
        console.warn(`[images] Fichier ignoré : ${file}`, error);
        return null;
      }
    })();
    dataCache.set(file, pending);
  }
  return pending;
}

/** Toutes les images d'un dossier, triées par nom (« 01-… », « 02-… » pour imposer un ordre). */
export const getFolderImages = cache(async (folder: string, context: string): Promise<SiteImage[]> => {
  const dirName = await resolveFolder(folder);
  if (!dirName) return [];
  const dir = path.join(IMAGES_ROOT, dirName);

  let files: string[];
  try {
    files = (await fs.readdir(dir, { withFileTypes: true }))
      .filter((e) => e.isFile() && !e.name.startsWith(".") && EXTENSIONS.has(path.extname(e.name).toLowerCase()))
      .map((e) => e.name)
      .sort(collator.compare);
  } catch {
    return [];
  }

  const alts = await readAltOverrides(dir);
  const images = await Promise.all(
    files.map(async (file): Promise<SiteImage | null> => {
      const data = await readImageData(path.join(dir, file));
      if (!data) return null;
      const { version, ...size } = data;
      const label = labelFromFilename(file);
      return {
        ...size,
        src: `/images/${dirName.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(file)}?v=${version}`,
        alt: alts[file] ?? (label ? `${label}, ${context.toLowerCase()} ${BRAND}` : `${context}, ${BRAND}`),
        key: slugify(path.parse(file).name),
      };
    }),
  );
  return images.filter((img): img is SiteImage => img !== null);
});

/**
 * Les galeries, dans l'ordre de config/categories.ts ; les dossiers d'une même catégorie se suivent.
 * Une catégorie sans photo reste affichée avec un emplacement « bientôt disponible ».
 */
export const getGalleries = cache(async (): Promise<CategoryGallery[]> =>
  Promise.all(
    galleryCategories.map(async (category) => {
      const images = (await Promise.all(category.folders.map((f) => getFolderImages(f, category.title)))).flat();
      return { ...category, images, cover: images[0] ?? null };
    }),
  ),
);

export async function getCategoryImage(slug: string, index = 0) {
  const gallery = (await getGalleries()).find((g) => g.slug === slug);
  if (!gallery?.images.length) return null;
  return gallery.images[index % gallery.images.length];
}

async function findByKeywords(folders: Array<[folder: string, context: string]>, keywords: string[]) {
  const keys = keywords.map(slugify);
  for (const [folder, context] of folders) {
    const images = await getFolderImages(folder, context);
    const hit = images.find((img) => keys.some((k) => img.key.includes(k)));
    if (hit) return hit;
  }
  return null;
}

async function firstAvailable(slugs: string[]) {
  for (const slug of slugs) {
    const img = await getCategoryImage(slug);
    if (img) return img;
  }
  return (await getGalleries()).find((g) => g.images.length)?.images[0] ?? null;
}

/** Photo du hero : « hero/hero-main.jpg », sinon la première photo du dossier « hero », sinon une photo des galeries. */
export const getHeroImage = cache(async () => {
  const images = await getFolderImages("hero", "Réception");
  const hero = images.find((img) => img.key === "hero-main") ?? images[0];
  return hero ?? firstAvailable(["buffets", "plats", "gateaux-marocains"]);
});

/** Deux photos pour la section « La maison » : dossier « About », sinon galeries. */
export const getAboutImages = cache(async () => {
  const own = await getFolderImages("About", "Notre cuisine");
  if (own.length >= 2) return own.slice(0, 2);
  const fallback = [
    own[0] ?? (await firstAvailable(["gateaux-marocains", "desserts"])),
    await firstAvailable(["entrees", "plats"]),
  ];
  return fallback.filter((img, i, arr): img is SiteImage => !!img && arr.findIndex((x) => x?.src === img.src) === i);
});

/**
 * Défilement infini : toutes les photos du dossier « animated » (01.jpg, 02.jpg…, dans l'ordre des noms),
 * sinon une sélection alternée de chaque catégorie, limitée à `limit` photos.
 */
export const getShowcaseImages = cache(async (limit: number) => {
  const own = await getFolderImages("animated", "Création");
  if (own.length) return own;

  const galleries = (await getGalleries()).filter((g) => g.images.length);
  const picked: SiteImage[] = [];
  for (let round = 0; picked.length < limit && galleries.some((g) => g.images.length > round); round++) {
    for (const g of galleries) {
      if (g.images[round] && picked.length < limit) picked.push(g.images[round]);
    }
  }
  return picked;
});

export async function getStationImage(keywords: string[], name: string) {
  const img = await findByKeywords(
    [
      ["stands", "Animation culinaire"],
      ["gallery/animations", "Animation culinaire"],
    ],
    keywords,
  );
  return img ? { ...img, alt: `${name}, animation culinaire ${BRAND}` } : null;
}

/**
 * Photos d'ambiance des sections éditoriales : dossier dédié d'abord, sinon une photo
 * des galeries choisie par mot-clé (elle doit illustrer le propos de la section).
 */
const AMBIANCE = {
  stations: { folder: "stands", keywords: ["buffet-pastillas-flambees"] },
  services: { folder: "Services", keywords: ["service-poulet-olives"] },
  contact: { folder: "Contact", keywords: ["buffet-entrees-reception"] },
  "sur-mesure": {
    folder: "Sur mesure",
    keywords: ["buffet-entrees-presentoirs", "couscous-tfaya-buffet", "pastillas-plateaux-argent"],
  },
} as const;

/** Une photo par mot-clé, dans l'ordre, sans doublon. */
export async function getAmbianceImages(section: keyof typeof AMBIANCE) {
  const { folder, keywords } = AMBIANCE[section];
  const own = await getFolderImages(folder, "Réception");
  if (own.length) return own.slice(0, keywords.length);

  const picks = await Promise.all(
    keywords.map((k) =>
      findByKeywords(
        [
          ["gallery/entrees", "Les entrées"],
          ["gallery/plats-principaux", "Les plats principaux"],
        ],
        [k],
      ),
    ),
  );
  return picks.filter((img, i): img is SiteImage => !!img && picks.findIndex((x) => x?.src === img.src) === i);
}

export async function getServiceImage(keywords: string[], fallback: { category: string; index: number }) {
  return (
    (await findByKeywords([["Services", "Réception"]], keywords)) ??
    (await getCategoryImage(fallback.category, fallback.index))
  );
}
