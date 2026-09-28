import Link from "next/link";
import { contactLinks, navLinks, siteConfig } from "@/config/site";
import { galleryCategories } from "@/config/categories";
import { container, cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="relative bg-charcoal text-ivory">
      <div className={cn(container, "grid gap-12 py-16 md:grid-cols-12 md:py-24")}>
        <div className="md:col-span-5">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm font-serif text-2xl font-light leading-snug text-ivory/85">
            Une cuisine faite maison, pour les tables qui comptent.
          </p>
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-gold-soft">Suivez-nous</p>
          <SocialLinks tone="light" className="mt-4" />
        </div>

        <nav aria-label="Pages" className="md:col-span-2">
          <h2 className="text-sm text-gold-soft">Pages</h2>
          <ul className="mt-5 space-y-3 text-sm text-ivory/75">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Galeries" className="md:col-span-2">
          <h2 className="text-sm text-gold-soft">Galeries</h2>
          <ul className="mt-5 space-y-3 text-sm text-ivory/75">
            {galleryCategories.map((c) => (
              <li key={c.slug}>
                <Link href={`/galerie#${c.slug}`} className="transition-colors hover:text-ivory">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className="not-italic md:col-span-3">
          <h2 className="text-sm text-gold-soft">Contact</h2>
          <ul className="mt-5 space-y-3 text-sm text-ivory/75">
            <li>
              <a href={contactLinks.tel} className="transition-colors hover:text-ivory">
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={contactLinks.mail} className="break-all transition-colors hover:text-ivory">
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a href={contactLinks.maps} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ivory">
                {siteConfig.address.streetAddress}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.addressLocality}
              </a>
            </li>
            <li>{siteConfig.hours}</li>
            <li className="text-gold-soft">Déplacement partout en France</li>
          </ul>
        </address>
      </div>
      <div className={cn(container, "flex flex-col gap-2 border-t border-ivory/10 py-6 text-xs text-ivory/60 sm:flex-row sm:justify-between")}>
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
        </p>
        <p>Photographies : {siteConfig.name}</p>
      </div>
    </footer>
  );
}
