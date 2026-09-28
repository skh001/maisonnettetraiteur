"use client";

import { useState } from "react";
import { contactLinks, siteConfig } from "@/config/site";
import { buttonClasses } from "@/components/ui/Button";
import { PinIcon } from "@/components/ui/Icons";

/**
 * La carte Google n'est chargée qu'à la demande : aucun cookie tiers
 * avant le consentement (RGPD) et aucun impact sur les performances.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={`Carte : ${siteConfig.name}`}
        src={contactLinks.mapsEmbed}
        className="h-full w-full border-0 grayscale-[35%] sepia-[15%]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 bg-[radial-gradient(circle_at_50%_40%,var(--color-sand),var(--color-linen)_70%)] px-6 text-center">
      <PinIcon className="size-9 text-gold-deep" />
      <p className="max-w-sm text-sm leading-relaxed text-taupe">
        L&apos;affichage de la carte charge un service Google susceptible de déposer des cookies.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button type="button" onClick={() => setLoaded(true)} className={buttonClasses("outline-dark")}>
          Afficher la carte
        </button>
        <a href={contactLinks.maps} target="_blank" rel="noopener noreferrer" className={buttonClasses("gold")}>
          Ouvrir dans Google Maps
        </a>
      </div>
    </div>
  );
}
