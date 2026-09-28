import Image from "next/image";
import type { CSSProperties } from "react";
import { getShowcaseImages } from "@/lib/images";
import { container, cn } from "@/lib/utils";
import { TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Ornament";

const clampRatio = (w: number, h: number) => Math.min(Math.max(w / h, 0.68), 1.5);

/** Bandeau infini en CSS pur : fluide, léger, en pause au survol. */
export async function Showcase() {
  const images = await getShowcaseImages(16);
  if (!images.length) return null;

  return (
    <section aria-labelledby="showcase-title" className="overflow-hidden py-20 md:py-28">
      <div className={cn(container, "mb-10 flex items-end justify-between gap-6 md:mb-14")}>
        <div>
          <Eyebrow className="mb-4">Nos réalisations</Eyebrow>
          <h2 id="showcase-title" className="max-w-lg font-serif text-3xl font-light leading-tight text-charcoal md:text-4xl">
            Quelques tables récentes, sorties de notre cuisine.
          </h2>
        </div>
        <TextLink href="/galerie" className="shrink-0 text-charcoal">
          Toute la galerie
        </TextLink>
      </div>

      <div className="group mask-fade-x motion-reduce:overflow-x-auto">
        <div
          className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ "--marquee-duration": `${images.length * 6}s` } as CSSProperties}
        >
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 || undefined}
              className="flex shrink-0 items-start gap-4 pb-10 pr-4 md:gap-6 md:pr-6"
            >
              {images.map((img, i) => (
                <li
                  key={`${copy}-${img.src}`}
                  className={cn(
                    "relative h-60 shrink-0 overflow-hidden bg-sand sm:h-72 md:h-[26rem]",
                    i % 3 === 1 && "mt-10",
                    i % 4 === 2 && "arch-sm",
                  )}
                  style={{ aspectRatio: clampRatio(img.width, img.height) }}
                >
                  <Image
                    src={img.src}
                    alt={copy === 0 ? img.alt : ""}
                    fill
                    sizes="(min-width: 768px) 40rem, 24rem"
                    placeholder="blur"
                    blurDataURL={img.blurDataURL}
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
