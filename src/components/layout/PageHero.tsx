import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/lib/types";
import { container, cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  title: string;
  intro?: ReactNode;
  image?: SiteImage | null;
  children?: ReactNode;
};

/** En-tête photographique des pages intérieures. */
export function PageHero({ title, intro, image, children }: Props) {
  return (
    <section className="relative isolate flex min-h-[72svh] items-end overflow-hidden bg-charcoal text-ivory">
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          className="-z-20 animate-hero-zoom object-cover motion-reduce:animate-none"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(20_18_16/0.88),rgb(20_18_16/0.35)_55%,rgb(20_18_16/0.5))]"
      />
      <div className={cn(container, "pb-14 pt-36 md:pb-20")}>
        <Reveal>
          <h1 className="max-w-4xl font-serif text-5xl font-light leading-[0.98] sm:text-6xl lg:text-8xl">{title}</h1>
          {intro && <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80 md:text-lg">{intro}</p>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
