"use client";

import { m } from "framer-motion";
import { useState, type ReactNode } from "react";
import { EASE } from "@/lib/motion";

let isFirstRender = true;

/**
 * Transition entre les pages. Le tout premier affichage n'est pas animé :
 * le contenu (et la photo du hero) est visible immédiatement, ce qui préserve le LCP.
 */
export default function Template({ children }: { children: ReactNode }) {
  const [animate] = useState(() => {
    if (typeof window === "undefined") return false;
    const shouldAnimate = !isFirstRender;
    isFirstRender = false;
    return shouldAnimate;
  });

  return (
    <m.div
      initial={animate ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </m.div>
  );
}
