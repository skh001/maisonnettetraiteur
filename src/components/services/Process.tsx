import { processSteps } from "@/config/content";
import { container, pad } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerItem, StaggerList } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

/** Étapes réelles d'une commande : ici, la numérotation a un sens. */
export function Process() {
  return (
    <section aria-labelledby="process-title" className="bg-linen-fade relative isolate py-24 md:py-32">
      <span
        aria-hidden="true"
        className="pattern-arches absolute inset-0 -z-10 opacity-50 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]"
      />
      <div className={container}>
        <SectionHeading
          id="process-title"
          eyebrow="Notre méthode"
          split
          title="Comment nous préparons votre réception"
          intro="Un seul interlocuteur, du premier appel au dernier plateau servi."
        >
          <ButtonLink href="/contact" variant="outline-dark" className="mt-6">
            Commencer par un échange
          </ButtonLink>
        </SectionHeading>

        <div className="relative mt-16 md:mt-20">
          {/* Fil qui relie les étapes sur grand écran. */}
          <span
            aria-hidden="true"
            className="absolute left-7 right-[12%] top-7 hidden h-px bg-gradient-to-r from-gold/70 via-gold/40 to-transparent lg:block"
          />
          <StaggerList className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, i) => (
              <StaggerItem key={step.title} className="group">
                <span className="grid size-14 place-items-center rounded-full border border-gold bg-ivory font-serif text-xl text-gold-deep transition-colors duration-500 ease-luxe group-hover:bg-gold group-hover:text-charcoal">
                  {pad(i + 1)}
                </span>
                <h3 className="mt-6 font-serif text-2xl text-charcoal md:text-[1.7rem]">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-taupe">{step.text}</p>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </div>
    </section>
  );
}
