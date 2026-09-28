"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { slug: string; title: string };

/** Navigation collante entre les galeries ; suit la section visible. */
export function CategoryNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.slug);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.slug))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const list = listRef.current;
    const chip = list?.querySelector<HTMLElement>(`[data-slug="${active}"]`);
    if (list && chip) {
      list.scrollTo({ left: chip.offsetLeft - list.clientWidth / 2 + chip.clientWidth / 2, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav
      aria-label="Catégories de la galerie"
      className="sticky top-18 z-30 border-b border-charcoal/10 bg-ivory/90 backdrop-blur-md md:top-20"
    >
      <ul ref={listRef} className="no-scrollbar mx-auto flex max-w-[1440px] gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-16">
        {items.map((item) => (
          <li key={item.slug} data-slug={item.slug} className="shrink-0">
            <a
              href={`#${item.slug}`}
              aria-current={active === item.slug ? "true" : undefined}
              className={cn(
                "block rounded-full px-4 py-2 text-sm transition-colors duration-500 ease-luxe",
                active === item.slug ? "bg-charcoal text-ivory" : "text-taupe hover:text-charcoal",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
