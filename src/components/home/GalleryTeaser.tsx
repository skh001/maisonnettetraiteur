import Image from "next/image";
import Link from "next/link";
import { getGalleries, type CategoryGallery } from "@/lib/images";
import { container, cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerItem, StaggerList } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Icons";

/**
 * Mosaïque des univers : la première catégorie occupe un grand carré, les suivantes une case.
 * Sans photo, une catégorie devient une carte typographique ; une carte « devis » ferme la grille.
 */
export async function GalleryTeaser() {
  const galleries = await getGalleries();
  if (!galleries.length) return null;

  // Sur grand écran, la grille compte 4 colonnes et la première carte 2 × 2.
  const rest = galleries.length - 1;
  const lastRow = rest <= 4 ? rest % 2 : (rest - 4) % 4;
  const ctaSpan = { 0: "lg:col-span-4", 1: "lg:col-span-2", 2: "lg:col-span-2", 3: "lg:col-span-1" }[lastRow];

  return (
    <section aria-labelledby="gallery-teaser-title" className="py-20 md:py-32">
      <div className={container}>
        <SectionHeading
          id="gallery-teaser-title"
          eyebrow="Notre carte"
          split
          title="La table, par univers"
          intro="Des entrées aux gâteaux marocains, chaque univers se compose selon votre réception. Toutes les photos viennent de nos événements."
        />
        <StaggerList className="mt-14 grid auto-rows-[46vw] grid-cols-2 gap-3 sm:auto-rows-[32vw] md:mt-20 md:gap-5 lg:auto-rows-[min(20vw,300px)] lg:grid-cols-4">
          {galleries.map((g, i) => {
            const last = i === galleries.length - 1;
            return (
              <StaggerItem
                key={g.slug}
                className={cn(
                  i === 0 && "col-span-2 row-span-2",
                  // Nombre impair de petites cartes sur mobile : la dernière s'étire ; idem si elle est seule sur sa ligne.
                  last && rest % 2 === 1 && "col-span-2",
                  last && (lastRow === 1 ? "lg:col-span-2" : "lg:col-span-1"),
                )}
              >
                {g.cover ? (
                  <PhotoCard gallery={g} large={i === 0} />
                ) : (
                  <TextCard gallery={g} dark={galleries.slice(0, i).filter((x) => !x.cover).length % 2 === 0} />
                )}
              </StaggerItem>
            );
          })}
          <StaggerItem className={cn("col-span-2", ctaSpan)}>
            <Link
              href="/contact"
              className="group relative flex h-full flex-col justify-between overflow-hidden bg-gold p-6 text-charcoal transition-colors duration-700 ease-luxe hover:bg-gold-soft md:p-8"
            >
              <span aria-hidden="true" className="pattern-arches absolute inset-0 opacity-60 mix-blend-multiply" />
              <span className="relative text-[0.7rem] font-medium uppercase tracking-[0.32em] text-charcoal/70">Sur mesure</span>
              <span className="relative flex items-end justify-between gap-6">
                <span className="max-w-sm font-serif text-2xl font-light leading-tight md:text-4xl">
                  Composons ensemble le menu de votre réception.
                </span>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-charcoal/30 transition-all duration-500 ease-luxe group-hover:border-charcoal group-hover:bg-charcoal group-hover:text-gold-soft">
                  <ArrowIcon className="size-5" />
                </span>
              </span>
            </Link>
          </StaggerItem>
        </StaggerList>
      </div>
    </section>
  );
}

function PhotoCard({ gallery: g, large }: { gallery: CategoryGallery; large: boolean }) {
  const cover = g.cover!;
  return (
    <Link href={`/galerie#${g.slug}`} className="group relative block h-full overflow-hidden bg-sand text-ivory">
      <Image
        src={cover.src}
        alt=""
        fill
        sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
        placeholder="blur"
        blurDataURL={cover.blurDataURL}
        className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.06]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent"
      />
      {/* Cadre doré intérieur, révélé au survol. */}
      <span
        aria-hidden="true"
        className="absolute inset-3 border border-gold-soft/0 transition-colors duration-700 ease-luxe group-hover:border-gold-soft/60 md:inset-4"
      />
      <span className="absolute inset-x-0 bottom-0 p-4 md:p-6">
        <span className="flex items-end justify-between gap-3">
          <span className={cn("font-serif font-light leading-tight", large ? "text-3xl md:text-5xl" : "text-xl md:text-2xl")}>
            {g.title}
          </span>
          {g.images.length > 0 && <span className="shrink-0 text-xs text-ivory/75">{g.images.length} photos</span>}
        </span>
        <span
          className={cn(
            "block max-w-sm overflow-hidden text-sm leading-relaxed text-ivory/80",
            large
              ? "mt-3"
              : "hidden transition-[max-height,opacity,margin] duration-700 ease-luxe lg:block lg:max-h-0 lg:opacity-0 lg:group-hover:mt-2 lg:group-hover:max-h-24 lg:group-hover:opacity-100 lg:group-focus-visible:mt-2 lg:group-focus-visible:max-h-24 lg:group-focus-visible:opacity-100",
          )}
        >
          {g.teaser}
        </span>
      </span>
    </Link>
  );
}

function TextCard({ gallery: g, dark }: { gallery: CategoryGallery; dark: boolean }) {
  return (
    <Link
      href={`/galerie#${g.slug}`}
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden border p-5 transition-[border-color,background-color] duration-700 ease-luxe md:p-7",
        dark
          ? "border-charcoal bg-charcoal text-ivory hover:border-gold/60"
          : "border-gold/30 bg-linen text-charcoal hover:border-gold hover:bg-sand/60",
      )}
    >
      {/* Arche en filigrane, clin d'œil au logo. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 120"
        className={cn(
          "absolute -right-6 -top-4 h-[85%] transition-transform duration-[1400ms] ease-luxe group-hover:-translate-y-2",
          dark ? "text-gold/25" : "text-gold/40",
        )}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        <path d="M15 120V50a35 35 0 0 1 70 0v70" />
        <path d="M27 120V52a23 23 0 0 1 46 0v68" />
      </svg>
      <span className={cn("relative text-[0.65rem] font-medium uppercase tracking-[0.3em]", dark ? "text-gold-soft" : "text-gold-deep")}>
        Sur commande
      </span>
      <span className="relative">
        <span className="block font-serif text-xl font-light leading-tight md:text-3xl">{g.title}</span>
        <span className={cn("mt-2 hidden text-sm leading-relaxed sm:block", dark ? "text-ivory/70" : "text-taupe")}>{g.teaser}</span>
        <span className={cn("mt-4 inline-flex items-center gap-2 text-xs font-medium", dark ? "text-gold-soft" : "text-gold-deep")}>
          Découvrir
          <ArrowIcon className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  );
}
