import Image from "next/image";
import Link from "next/link";
import { services } from "@/config/content";
import { getAmbianceImages } from "@/lib/images";
import { container, cn } from "@/lib/utils";
import { ArrowIcon, RouteIcon } from "@/components/ui/Icons";
import { Ornament } from "@/components/ui/Ornament";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerItem, StaggerList } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export async function ServicesIndex() {
  const [image] = await getAmbianceImages("services");

  return (
    <section id="prestations" aria-labelledby="services-index-title" className="scroll-mt-24 pb-20 md:pb-32">
      <Ornament className="mb-20 md:mb-28" />
      <div className={cn(container, "grid items-center gap-14 lg:grid-cols-12 lg:gap-10")}>
        {image && (
          <Reveal className="relative mx-auto w-[78%] max-w-sm sm:w-[60%] lg:col-span-4 lg:w-full lg:max-w-none">
            <div className="relative isolate">
              <span aria-hidden="true" className="arch absolute -left-4 top-4 -z-10 size-full border border-gold/50" />
              <div className="arch relative aspect-[3/4] overflow-hidden bg-sand shadow-luxe">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 70vw"
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                  className="object-cover"
                />
              </div>
            </div>
            <p className="absolute -bottom-6 -right-4 flex items-center gap-3 bg-ivory px-5 py-4 text-sm text-charcoal shadow-luxe sm:-right-10">
              <RouteIcon className="size-5 text-gold-deep" />
              Partout en France
            </p>
          </Reveal>
        )}

        <div className={cn(image ? "lg:col-span-7 lg:col-start-6" : "lg:col-span-12")}>
          <SectionHeading
            id="services-index-title"
            eyebrow="Nos prestations"
            title="Pour chaque occasion"
            intro="Une même cuisine, adaptée à votre réception : repas servi, buffet, cocktail ou l’assise de thé."
          />
          <StaggerList className="mt-10 grid border-t border-charcoal/12 sm:grid-cols-2 sm:gap-x-10 md:mt-12">
            {services.map((s) => (
              <StaggerItem key={s.slug} className="border-b border-charcoal/12">
                <Link
                  href={`/services#${s.slug}`}
                  className="group flex items-center justify-between gap-4 py-5 font-serif text-2xl font-light text-charcoal md:text-3xl"
                >
                  <span className="transition-[transform,color] duration-500 ease-luxe group-hover:translate-x-2 group-hover:text-gold-deep">
                    {s.title}
                  </span>
                  <ArrowIcon className="size-5 shrink-0 text-gold-deep opacity-0 transition-all duration-500 ease-luxe group-hover:opacity-100 group-focus-visible:opacity-100" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerList>
          <Reveal className="mt-10">
            <ButtonLink href="/services" variant="outline-dark">
              Découvrir nos services
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
