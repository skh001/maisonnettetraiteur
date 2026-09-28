import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Ornament";

type Props = {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** Surtitre court au-dessus du titre (« Notre philosophie »…). */
  eyebrow?: string;
  tone?: "light" | "dark";
  /** Titre à gauche, introduction à droite sur grand écran. */
  split?: boolean;
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({ id, title, intro, eyebrow, tone = "light", split = false, className, children }: Props) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn(split ? "grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10" : "max-w-3xl", className)}>
      <div className={cn(split && "lg:col-span-7")}>
        {eyebrow && (
          <Eyebrow tone={tone} className="mb-5">
            {eyebrow}
          </Eyebrow>
        )}
        <h2
          id={id}
          className={cn(
            "font-serif text-[2.5rem] font-light leading-[1.02] tracking-[-0.01em] sm:text-5xl lg:text-[4.25rem]",
            dark ? "text-ivory" : "text-charcoal",
          )}
        >
          {title}
        </h2>
      </div>
      {(intro || children) && (
        <div className={cn(split ? "lg:col-span-4 lg:col-start-9" : "mt-6")}>
          {intro && (
            <p className={cn("max-w-md text-base leading-relaxed", dark ? "text-ivory/75" : "text-taupe")}>{intro}</p>
          )}
          {children}
        </div>
      )}
    </Reveal>
  );
}
