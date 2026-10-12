import { getGalleries } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { container } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";
import { CategoryNav } from "@/components/gallery/CategoryNav";
import { GallerySection } from "@/components/gallery/GallerySection";
import { ContactCta } from "@/components/home/ContactCta";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Galerie",
  description:
    "Entrées, plats principaux, desserts, commandes à emporter, buffets, animations, assise de thé et gâteaux marocains : les créations faites maison de La Maisonnette Traiteur en images.",
  path: "/galerie",
});

export default async function GalleryPage() {
  // Toutes les catégories sont présentées ; celles sans photo affichent un emplacement « bientôt disponible ».
  const galleries = await getGalleries();
  const hero =
    galleries.find((g) => g.slug === "gateaux-marocains")?.images[0] ?? galleries.find((g) => g.images.length)?.images[0];

  return (
    <>
      <PageHero
        title="Galerie"
        image={hero}
        intro="Des photos prises lors de nos réceptions, classées par univers. Touchez une image pour l'agrandir."
      />

      {galleries.length ? (
        <>
          <CategoryNav items={galleries.map(({ slug, title }) => ({ slug, title }))} />
          {galleries.map((g, i) => (
            <GallerySection key={g.slug} gallery={g} tinted={i % 2 === 1} />
          ))}
        </>
      ) : (
        <p className={`${container} py-32 text-center text-taupe`}>
          Ajoutez des photos dans les dossiers de <code>public/images/gallery</code> pour remplir la galerie.
        </p>
      )}

      <ContactCta />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Galerie", path: "/galerie" },
        ])}
      />
    </>
  );
}
