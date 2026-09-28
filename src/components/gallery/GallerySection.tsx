import Image from "next/image";
import type { CategoryGallery } from "@/lib/images";
import { container, cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";
import { MasonryGallery } from "./MasonryGallery";

export function GallerySection({ gallery, tinted = false }: { gallery: CategoryGallery; tinted?: boolean }) {
  const headingId = `${gallery.slug}-titre`;
  const hasImages = gallery.images.length > 0;

  const details = (
    <>
      <p className="max-w-md leading-relaxed text-taupe">{gallery.description}</p>
      {gallery.items && (
        <ul className="mt-5 grid max-w-md gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {gallery.items.map((item) => (
            <li key={item} className="flex items-baseline gap-3 font-serif text-lg leading-snug text-charcoal">
              <span aria-hidden="true" className="size-1.5 shrink-0 translate-y-[-0.2em] rotate-45 bg-gold" />
              {item}
            </li>
          ))}
        </ul>
      )}
      {gallery.note && <p className="mt-5 max-w-md font-serif text-lg italic text-gold-deep">{gallery.note}</p>}
    </>
  );

  return (
    <section
      id={gallery.slug}
      aria-labelledby={headingId}
      className={cn("scroll-mt-36 py-20 md:scroll-mt-40 md:py-28", tinted && "bg-linen-fade")}
    >
      <div className={container}>
        {hasImages ? (
          <>
            <Reveal className="mb-10 grid gap-4 md:mb-14 md:grid-cols-12 md:items-end">
              <h2 id={headingId} className="font-serif text-4xl font-light leading-none text-charcoal md:col-span-6 md:text-6xl">
                {gallery.title}
              </h2>
              <div className="md:col-span-5 md:col-start-8">
                {details}
                <p className="mt-4 text-sm text-gold-deep">{gallery.images.length} photos</p>
              </div>
            </Reveal>
            <MasonryGallery images={gallery.images} title={gallery.title} />
          </>
        ) : (
          // Catégorie sans galerie : une présentation éditoriale plutôt qu'un vide.
          <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
            <Reveal className="md:col-span-6">
              <h2 id={headingId} className="font-serif text-4xl font-light leading-none text-charcoal md:text-6xl">
                {gallery.title}
              </h2>
              <div className="mt-6">{details}</div>
              <TextLink href="/contact" className="mt-8 text-charcoal">
                Demander un devis
              </TextLink>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
              <div className="relative isolate mx-auto w-[80%] max-w-sm md:w-full">
                <span aria-hidden="true" className="arch absolute -right-4 top-4 -z-10 size-full border border-gold/50" />
                {gallery.cover ? (
                  <div className="arch relative aspect-[3/4] overflow-hidden bg-sand shadow-luxe">
                    <Image
                      src={gallery.cover.src}
                      alt={gallery.cover.alt}
                      fill
                      sizes="(min-width: 768px) 36vw, 80vw"
                      placeholder="blur"
                      blurDataURL={gallery.cover.blurDataURL}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="arch relative grid aspect-[3/4] place-items-center overflow-hidden bg-charcoal text-center shadow-luxe">
                    <span aria-hidden="true" className="pattern-arches absolute inset-0 opacity-40" />
                    <span className="relative px-8">
                      <span aria-hidden="true" className="block font-serif text-[7rem] font-light italic leading-none text-gold/70">
                        {gallery.title.charAt(0)}
                      </span>
                      <span className="mt-4 block text-[0.7rem] uppercase tracking-[0.32em] text-gold-soft">Sur commande</span>
                    </span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
