import Image from "next/image";
import { contactLinks } from "@/config/site";
import { getAmbianceImages, getCategoryImage } from "@/lib/images";
import { container, cn } from "@/lib/utils";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon, PinIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { SocialLinks } from "@/components/layout/SocialLinks";

export async function ContactCta() {
  const image =
    (await getCategoryImage("gateaux-marocains", 1)) ??
    (await getCategoryImage("desserts", 0)) ??
    (await getAmbianceImages("contact"))[0] ??
    null;

  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-charcoal py-28 text-ivory md:py-40">
      {image && (
        <Image
          src={image.src}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          className="-z-20 object-cover"
        />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-charcoal/65" />
      <Reveal className={cn(container, "flex flex-col items-center text-center")}>
        <h2 id="cta-title" className="max-w-3xl font-serif text-5xl font-light leading-[1.02] md:text-7xl">
          Parlons de votre événement
        </h2>
        <p className="mt-6 max-w-md text-ivory/80">
          Date, lieu, nombre d&apos;invités : quelques informations suffisent pour recevoir une proposition détaillée.
        </p>
        <div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <ButtonLink href="/contact" variant="gold" className="w-full sm:w-auto">
            Demander un devis
            <ArrowIcon className="size-4" />
          </ButtonLink>
          <a
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("outline-light", "w-full sm:w-auto")}
          >
            <WhatsAppIcon className="size-[18px]" />
            Écrire sur WhatsApp
          </a>
          <a
            href={contactLinks.maps}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("outline-light", "w-full sm:w-auto")}
          >
            <PinIcon className="size-[18px]" />
            Nous trouver
          </a>
        </div>

        <div className="mt-14 flex flex-col items-center gap-5">
          <span aria-hidden="true" className="h-10 w-px bg-gradient-to-b from-transparent to-gold-soft/70" />
          <p className="text-xs uppercase tracking-[0.3em] text-gold-soft">Suivez nos réceptions</p>
          <SocialLinks tone="light" />
        </div>
      </Reveal>
    </section>
  );
}
