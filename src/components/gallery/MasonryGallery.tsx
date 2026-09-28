"use client";

import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import type { SiteImage } from "@/lib/types";
import { EASE } from "@/lib/motion";
import { buttonClasses } from "@/components/ui/Button";
import { ExpandIcon } from "@/components/ui/Icons";
import { Lightbox } from "./Lightbox";

const PAGE_SIZE = 18;

export function MasonryGallery({ images, title }: { images: SiteImage[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const remaining = images.length - visible;

  return (
    <>
      <ul className="columns-2 gap-3 md:gap-5 lg:columns-3">
        {images.slice(0, visible).map((img, i) => (
          <m.li
            key={img.src}
            className="mb-3 break-inside-avoid md:mb-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: (i % 3) * 0.08 }}
          >
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Agrandir la photo ${i + 1} : ${img.alt}`}
              className="group relative block w-full overflow-hidden bg-sand"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1440px) 460px, (min-width: 1024px) 31vw, 48vw"
                placeholder="blur"
                blurDataURL={img.blurDataURL}
                className="h-auto w-full transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.05]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-charcoal/0 transition-colors duration-700 ease-luxe group-hover:bg-charcoal/20"
              />
              <span
                aria-hidden="true"
                className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-ivory/90 text-charcoal opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                <ExpandIcon className="size-4" />
              </span>
            </button>
          </m.li>
        ))}
      </ul>

      {remaining > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className={buttonClasses("outline-dark")}
          >
            Afficher {Math.min(remaining, PAGE_SIZE)} photos de plus
          </button>
        </div>
      )}

      <AnimatePresence>
        {active !== null && (
          <Lightbox
            images={images}
            index={active}
            label={title}
            onIndexChange={setActive}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
