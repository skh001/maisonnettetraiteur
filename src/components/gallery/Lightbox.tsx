"use client";

import Image from "next/image";
import { AnimatePresence, m, type Variants } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { SiteImage } from "@/lib/types";
import { EASE } from "@/lib/motion";
import { pad } from "@/lib/utils";
import { ChevronLeft, ChevronRight, CloseIcon } from "@/components/ui/Icons";

type Props = {
  images: SiteImage[];
  index: number;
  label: string;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

const slide: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 56 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
  exit: (dir: number) => ({ opacity: 0, x: dir * -56, transition: { duration: 0.4, ease: EASE } }),
};

const navButton =
  "absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-ivory/20 bg-charcoal/40 text-ivory backdrop-blur transition-colors duration-500 hover:border-gold-soft hover:text-gold-soft md:size-14";

export function Lightbox({ images, index, label, onIndexChange, onClose }: Props) {
  const [direction, setDirection] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerStart = useRef<number | null>(null);
  const count = images.length;
  const image = images[index];

  const go = useCallback(
    (step: number) => {
      if (count < 2) return;
      setDirection(step);
      onIndexChange((index + step + count) % count);
    },
    [index, count, onIndexChange],
  );

  // Verrouille le défilement, place le focus, puis le restitue à la fermeture.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      root.style.overflow = "";
      previous?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const neighbours = count > 1 ? [images[(index + 1) % count], images[(index - 1 + count) % count]] : [];

  return createPortal(
    <m.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${label}, photo ${index + 1} sur ${count}`}
      className="fixed inset-0 z-[100] flex flex-col bg-charcoal/[0.97] text-ivory"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-8">
        <p className="text-sm text-ivory/75">
          <span className="font-serif text-lg text-ivory">{label}</span>
          <span className="ml-4 tabular-nums" aria-live="polite">
            {pad(index + 1)} / {pad(count)}
          </span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fermer la galerie"
          className="grid size-12 place-items-center rounded-full border border-ivory/20 transition-colors duration-500 hover:border-gold-soft hover:text-gold-soft"
        >
          <CloseIcon className="size-5" />
        </button>
      </div>

      <div
        className="relative flex-1 touch-pan-y overflow-hidden"
        onPointerDown={(e) => {
          pointerStart.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (pointerStart.current === null) return;
          const dx = e.clientX - pointerStart.current;
          pointerStart.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <m.div
            key={image.src}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            className="pointer-events-none absolute inset-3 md:inset-x-28 md:inset-y-4"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="100vw"
              quality={85}
              placeholder="blur"
              blurDataURL={image.blurDataURL}
              draggable={false}
              style={{ objectFit: "contain" }}
              className="select-none"
            />
          </m.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Photo précédente" className={`${navButton} left-3 md:left-8`}>
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Photo suivante" className={`${navButton} right-3 md:right-8`}>
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      <p className="px-5 pb-6 pt-4 text-center font-serif text-lg italic text-ivory/75">{image.alt}</p>

      {/* Précharge les photos voisines pour une navigation instantanée. */}
      <div aria-hidden="true" className="pointer-events-none absolute size-px overflow-hidden opacity-0">
        {neighbours.map((n, i) => (
          <Image key={`${i}-${n.src}`} src={n.src} alt="" fill sizes="100vw" quality={85} loading="eager" />
        ))}
      </div>
    </m.div>,
    document.body,
  );
}
