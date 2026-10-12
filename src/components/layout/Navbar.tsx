"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { contactLinks, navLinks, siteConfig } from "@/config/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/Button";
import { Logo } from "./Logo";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ease-luxe",
        solid
          ? "bg-ivory/90 text-charcoal shadow-[0_1px_0_rgb(31_29_27/0.08)] backdrop-blur-md"
          : "bg-transparent text-ivory",
      )}
    >
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-5 sm:px-8 md:h-20 lg:px-16"
      >
        <Link href="/" aria-label={`${siteConfig.name}, accueil`} className="relative z-10">
          <Logo tone={solid ? "dark" : "light"} />
        </Link>

        <ul className="hidden items-center gap-5 md:flex lg:gap-9">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className="relative py-2 text-sm tracking-wide opacity-90 transition-opacity hover:opacity-100"
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 -bottom-0.5 h-px origin-left transition-transform duration-500 ease-luxe",
                    solid ? "bg-gold-deep" : "bg-gold-soft",
                    isActive(link.href) ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={cn(buttonClasses(solid ? "outline-dark" : "outline-light", "min-h-11 px-6 max-md:hidden"))}
          >
            Demander un devis
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="relative z-10 grid size-11 place-items-center md:hidden"
          >
            <span className="relative block h-3 w-6">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-luxe",
                  open && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-500 ease-luxe",
                  open && "-translate-y-1.5 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="menu-mobile"
            className="fixed inset-0 -z-10 flex flex-col bg-charcoal px-5 pb-10 pt-28 text-ivory sm:px-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <m.ul
              className="flex flex-col gap-2"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
            >
              {navLinks.map((link) => (
                <m.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                  }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "block py-1 font-serif text-5xl font-light",
                      isActive(link.href) ? "text-gold-soft" : "text-ivory",
                    )}
                  >
                    {link.label}
                  </Link>
                </m.li>
              ))}
            </m.ul>
            <div className="mt-auto space-y-5 border-t border-ivory/15 pt-8 text-sm text-ivory/75">
              <a href={contactLinks.tel} className="block">
                {siteConfig.contact.phoneDisplay}
              </a>
              <a href={contactLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="block">
                Écrire sur WhatsApp
              </a>
              <Link href="/contact" className={buttonClasses("gold", "w-full")}>
                Demander un devis
              </Link>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
