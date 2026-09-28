import { cn } from "@/lib/utils";

/** Monogramme en arche (la porte de la « maisonnette ») + nom. */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg viewBox="0 0 28 34" className="h-8 w-auto shrink-0" aria-hidden="true" fill="none">
        <path
          d="M2 33V14C2 7.4 7.4 2 14 2s12 5.4 12 12v19"
          stroke={tone === "light" ? "var(--color-gold-soft)" : "var(--color-gold-deep)"}
          strokeWidth="1.3"
        />
        <path d="M8 33V16a6 6 0 0 1 12 0v17" stroke="currentColor" strokeWidth="1.1" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.55rem] font-normal">Maisonnette</span>
        <span
          className={cn(
            "mt-1 font-serif text-sm italic",
            tone === "light" ? "text-gold-soft" : "text-gold-deep",
          )}
        >
          traiteur
        </span>
      </span>
    </span>
  );
}
