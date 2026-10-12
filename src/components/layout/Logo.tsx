import Image from "next/image";
import { cn } from "@/lib/utils";

/** Monogramme doré du logo (images/logo/emblem.png, fond transparent) + nom. */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/images/logo/emblem.png"
        alt=""
        width={48}
        height={40}
        quality={85}
        priority
        className="h-10 w-auto shrink-0"
      />
      <span className="flex flex-col leading-none">
        <span className="whitespace-nowrap font-serif text-[1.55rem] font-normal">La Maisonnette</span>
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
