import Image from "next/image";
import { founder } from "@/config/content";
import { getFounderImage } from "@/lib/images";
import { container, cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Ornament";
import { Reveal } from "@/components/ui/Reveal";

/**
 * « Notre histoire » : la fondatrice. Photo (proportions d'origine) à gauche, collante sur grand écran
 * pendant la lecture ; récit, signature et lien vers les prestations à droite. Sur mobile, la photo d'abord.
 */
export async function Founder() {
  const portrait = await getFounderImage();

  return (
    <section aria-labelledby="founder-title" className="overflow-x-clip py-20 md:py-32">
      <div className={cn(container, "grid gap-16 lg:grid-cols-12 lg:gap-10")}>
        {portrait && (
          <Reveal className="relative isolate lg:sticky lg:top-32 lg:col-span-7 lg:self-start">
            {/* Halo chaud et motif d'arches en filigrane, décalés derrière la photo. */}
            <span
              aria-hidden="true"
              className="absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_35%_45%,var(--color-sand),transparent_70%)] sm:-inset-8"
            />
            <span
              aria-hidden="true"
              className="pattern-arches absolute -bottom-4 -right-3 -z-10 h-3/4 w-1/2 rounded-3xl border border-gold/25 sm:-bottom-6 sm:-right-6"
            />
            <div
              className="relative overflow-hidden rounded-3xl bg-sand shadow-luxe"
              style={{ aspectRatio: `${portrait.width} / ${portrait.height}` }}
            >
              <Reveal y={0} scale={1.08} className="absolute inset-0">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  sizes="(min-width: 1440px) 760px, (min-width: 1024px) 54vw, 100vw"
                  quality={85}
                  placeholder="blur"
                  blurDataURL={portrait.blurDataURL}
                  className="object-cover"
                />
              </Reveal>
            </div>
          </Reveal>
        )}

        <div className={cn(portrait ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-8")}>
          <Reveal>
            <Eyebrow className="mb-5">{founder.eyebrow}</Eyebrow>
            <h2
              id="founder-title"
              className="font-serif text-[2.5rem] font-light leading-[1.02] text-charcoal sm:text-5xl lg:text-6xl"
            >
              {founder.title}
            </h2>
            <p className="mt-6 font-serif text-xl italic leading-snug text-gold-deep md:text-2xl">{founder.subtitle}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-8 space-y-5">
            {founder.story.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-taupe md:text-[1.05rem]">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.16} className="mt-10 border-t border-charcoal/12 pt-8">
            <p className="font-serif text-3xl font-light italic text-charcoal md:text-4xl">— {founder.signature}</p>
            <p className="mt-2 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-gold-deep">{founder.role}</p>
            <a href="#prestations" className={buttonClasses("outline-dark", "mt-9")}>
              Découvrir nos prestations
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
