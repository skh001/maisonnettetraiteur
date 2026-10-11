import { googleReviewsUrl, testimonials } from "@/data/testimonials";
import { container, cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerItem, StaggerList } from "@/components/ui/Reveal";
import { buttonClasses } from "@/components/ui/Button";
import { ArrowIcon } from "@/components/ui/Icons";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="bg-charcoal py-20 text-ivory md:py-32">
      <div className={container}>
        <SectionHeading
          id="testimonials-title"
          eyebrow="Ils témoignent"
          tone="dark"
          split
          title="Ils nous ont confié leur table"
          intro="Mariages, buffets de Noël, repas d'entreprise : quelques mots de ceux que nous avons reçus."
        />
      </div>
      <StaggerList
        label="Avis de clients"
        tabIndex={0}
        className={cn(
          container,
          "no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 md:mt-20",
          "lg:grid lg:grid-cols-4 lg:overflow-visible",
        )}
      >
        {testimonials.map((t, i) => (
          <StaggerItem key={t.author} className={cn("w-[82vw] max-w-md shrink-0 snap-start lg:w-auto", i % 2 === 1 && "lg:mt-16")}>
            <figure className="flex h-full flex-col border border-ivory/12 bg-ivory/[0.03] p-7 transition-[transform,border-color] duration-700 ease-luxe hover:-translate-y-2 hover:border-gold/50 md:p-9">
              <span aria-hidden="true" className="font-serif text-6xl leading-none text-gold">
                &ldquo;
              </span>
              <blockquote className="mt-2 flex-1 font-serif text-xl font-light leading-snug text-ivory/90 md:text-[1.4rem]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-ivory/12 pt-5 text-sm">
                <span className="block text-ivory">{t.author}</span>
                <span className="text-gold-soft">{t.event}</span>
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </StaggerList>
      <Reveal className={cn(container, "mt-12 flex justify-center md:mt-16")}>
        <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline-light")}>
          Voir tous nos avis Google
          <ArrowIcon className="size-4" />
        </a>
      </Reveal>
    </section>
  );
}
