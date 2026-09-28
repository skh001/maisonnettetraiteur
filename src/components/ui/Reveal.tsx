"use client";

import { m, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Apparition douce au défilement, jouée une seule fois. */
export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

type ListProps = {
  children: ReactNode;
  className?: string;
  label?: string;
  tabIndex?: number;
};

/** Liste dont les éléments apparaissent en cascade. */
export function StaggerList({ children, className, label, tabIndex }: ListProps) {
  return (
    <m.ul
      className={className}
      aria-label={label}
      tabIndex={tabIndex}
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </m.ul>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.li className={className} variants={item}>
      {children}
    </m.li>
  );
}
