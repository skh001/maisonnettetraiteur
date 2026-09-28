"use client";

import { m, type Variants } from "framer-motion";
import { contactLinks } from "@/config/site";
import { EASE } from "@/lib/motion";
import { container, cn } from "@/lib/utils";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";

const sequence: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};
const line: Variants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 1.3, ease: EASE } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
};

export function HeroContent() {
  return (
    <m.div
      className={cn(container, "relative pb-12 md:pb-16 lg:pb-44")}
      variants={sequence}
      initial="hidden"
      animate="show"
    >
      <h1
        id="hero-title"
        className="font-serif text-[3.4rem] font-light leading-[0.95] tracking-[-0.015em] sm:text-7xl lg:text-[8.5rem]"
      >
        <span className="block overflow-hidden pb-2">
          <m.span className="block" variants={line}>
            L&apos;art de recevoir,
          </m.span>
        </span>
        <span className="block overflow-hidden pb-2">
          <m.span className="block" variants={line}>
            fait maison.
          </m.span>
        </span>
      </h1>

      <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
        <m.p variants={fade} className="max-w-md text-base leading-relaxed text-ivory/85 md:text-lg">
          Mariages, fiançailles et réceptions : des tables généreuses, cuisinées avec des produits frais et
          servies avec soin.
        </m.p>
        <m.div variants={fade} className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" variant="gold">
            Demander un devis
          </ButtonLink>
          <ButtonLink href="/galerie" variant="outline-light">
            Voir nos réalisations
          </ButtonLink>
          <a
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("outline-light", "sm:hidden")}
          >
            WhatsApp
          </a>
        </m.div>
      </div>

      <m.div
        variants={fade}
        aria-hidden="true"
        className="absolute bottom-44 right-8 hidden h-24 w-px overflow-hidden bg-ivory/15 lg:right-16 lg:block"
      >
        <span className="block h-full w-full animate-scroll-cue bg-gold-soft motion-reduce:animate-none" />
      </m.div>
    </m.div>
  );
}
