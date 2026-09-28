import type { ComponentType, SVGProps } from "react";
import { promises } from "@/config/content";
import { container } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Ornament";
import { Reveal, StaggerItem, StaggerList } from "@/components/ui/Reveal";
import { BriefcaseIcon, ChefHatIcon, LeafIcon, MenuCardIcon, RingsIcon, RouteIcon } from "@/components/ui/Icons";

const icons: Record<(typeof promises)[number]["icon"], ComponentType<SVGProps<SVGSVGElement>>> = {
  leaf: LeafIcon,
  chef: ChefHatIcon,
  menu: MenuCardIcon,
  rings: RingsIcon,
  briefcase: BriefcaseIcon,
  route: RouteIcon,
};

/** Carte d'engagements qui chevauche le bas du hero sur grand écran : la transition devient un contenu. */
export function Promises() {
  return (
    <section aria-labelledby="promises-title" className="relative z-10 pt-10 lg:pt-0">
      <div className={container}>
        <Reveal y={40} className="border border-gold/20 bg-ivory shadow-luxe-lg lg:-mt-28">
          <div className="flex flex-col gap-3 border-b border-charcoal/8 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <Eyebrow>Pourquoi Maisonnette</Eyebrow>
            <h2 id="promises-title" className="font-serif text-2xl font-light text-charcoal md:text-3xl">
              Six engagements, à chaque réception.
            </h2>
          </div>
          {/* Les filets entre les cases sont l'espace de 1 px laissé sur le fond de la grille. */}
          <StaggerList className="grid grid-cols-2 gap-px bg-charcoal/8 md:grid-cols-3 lg:grid-cols-6">
            {promises.map(({ icon, title, text }) => {
              const Icon = icons[icon];
              return (
                <StaggerItem key={title} className="group bg-ivory px-5 py-7 sm:px-7 lg:py-9">
                  <span className="grid size-12 place-items-center rounded-full border border-gold/40 text-gold-deep transition-colors duration-500 ease-luxe group-hover:border-gold group-hover:bg-gold/10">
                    <Icon className="size-[22px]" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-charcoal md:text-[1.35rem]">{title}</h3>
                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-taupe">{text}</p>
                </StaggerItem>
              );
            })}
          </StaggerList>
        </Reveal>
      </div>
    </section>
  );
}
