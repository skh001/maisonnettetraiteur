import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "gold" | "light" | "outline-light" | "outline-dark";

const variants: Record<ButtonVariant, string> = {
  gold: "bg-gold text-charcoal hover:bg-gold-soft",
  light: "bg-ivory text-charcoal hover:bg-linen",
  "outline-light": "border border-ivory/45 text-ivory hover:border-ivory hover:bg-ivory hover:text-charcoal",
  "outline-dark": "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
};

export function buttonClasses(variant: ButtonVariant = "gold", className?: string) {
  return cn(
    "inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 text-sm font-medium tracking-wide",
    "transition-colors duration-500 ease-luxe",
    variants[variant],
    className,
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: ButtonVariant };

export function ButtonLink({ variant, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}

/** Lien texte souligné ; le trait se retire au survol. */
export function TextLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-2 pb-1 text-sm font-medium",
        "bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-bottom bg-no-repeat",
        "transition-[background-size] duration-500 ease-luxe hover:bg-[length:0%_1px]",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
