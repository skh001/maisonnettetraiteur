import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Surtitre de section : petites capitales dorées précédées d'un filet. */
export function Eyebrow({
  children,
  tone = "light",
  center = false,
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  center?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.32em]",
        tone === "dark" ? "text-gold-soft" : "text-gold-deep",
        center && "justify-center",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      {children}
      {center && <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />}
    </p>
  );
}

/** Filet orné (trait, losange, trait) pour séparer deux sections de même fond. */
export function Ornament({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex items-center justify-center gap-4 text-gold", className)}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-current sm:w-28" />
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d="M12 3 21 12 12 21 3 12Z" />
        <path d="M12 8.5 15.5 12 12 15.5 8.5 12Z" fill="currentColor" stroke="none" opacity="0.55" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-current sm:w-28" />
    </div>
  );
}
