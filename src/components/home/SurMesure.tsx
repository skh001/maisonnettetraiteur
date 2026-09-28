import Image from "next/image";
import { formats } from "@/config/content";
import { getAmbianceImages } from "@/lib/images";
import { container, cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Ornament";
import { Reveal, StaggerItem, StaggerList } from "@/components/ui/Reveal";

/** Bandeau pleine largeur : les formules que l'on combine, illustrées par un triptyque de photos verticales. */
export async function SurMesure() {
  const photos = await getAmbianceImages("sur-mesure");

  return (
    <section aria-labelledby="sur-mesure-title" className="relative isolate overflow-hidden bg-charcoal py-24 text-ivory md:py-36">
      <span aria-hidden="true" className="pattern-arches absolute inset-0 -z-10 opacity-40" />
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_40%,transparent,var(--color-charcoal)_70%)]"
      />

      <div className={cn(container, "grid items-center gap-16 lg:grid-cols-12 lg:gap-10")}>
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow tone="dark" className="mb-5">
              Événements sur mesure
            </Eyebrow>
            <h2
              id="sur-mesure-title"
              className="font-serif text-[2.5rem] font-light leading-[1.02] tracking-[-0.01em] sm:text-5xl lg:text-[4.25rem]"
            >
              Un menu composé pour une seule date : la vôtre.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-ivory/75">
              Nous partons de votre événement, de vos invités et de vos envies, puis nous combinons les formules
              qui lui ressemblent.
            </p>
          </Reveal>

          <StaggerList className="mt-10 border-t border-ivory/12">
            {formats.map((f) => (
              <StaggerItem key={f.title} className="group border-b border-ivory/12">
                <div className="flex gap-4 py-5">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-gold transition-transform duration-500 ease-luxe group-hover:rotate-[225deg] group-hover:scale-125"
                  />
                  <div>
                    <h3 className="font-serif text-2xl font-light text-ivory">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ivory/65">{f.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>

          <Reveal className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="gold">
              Composer mon menu
            </ButtonLink>
            <ButtonLink href="/services" variant="outline-light">
              Nos services
            </ButtonLink>
          </Reveal>
        </div>

        {photos.length > 0 && (
          <div className="grid grid-cols-3 gap-3 sm:gap-5 lg:col-span-7 lg:col-start-6">
            {photos.map((img, i) => (
              <Reveal key={img.src} delay={0.12 * i} y={48} className={cn(i === 1 && "mt-12 md:mt-24", i === 2 && "mt-6 md:mt-12")}>
                <div
                  className={cn(
                    "group relative aspect-[9/16] overflow-hidden bg-ink shadow-luxe-lg",
                    i === 0 && "arch",
                    i === 2 && "arch-sm",
                  )}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 18vw, 32vw"
                    placeholder="blur"
                    blurDataURL={img.blurDataURL}
                    className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.05]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
