import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/config/content";
import type { SiteImage } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ServiceCard({ service, image, offset }: { service: Service; image: SiteImage | null; offset?: boolean }) {
  return (
    <article id={service.slug} aria-labelledby={`${service.slug}-titre`} className={cn("group scroll-mt-28", offset && "md:mt-24")}>
      <div className="relative aspect-[4/5] overflow-hidden bg-linen">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            placeholder="blur"
            blurDataURL={image.blurDataURL}
            className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.05]"
          />
        ) : (
          <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--color-sand),var(--color-linen)_70%)]" />
        )}
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <h3 id={`${service.slug}-titre`} className="font-serif text-4xl font-light text-charcoal md:text-5xl">
            {service.title}
          </h3>
          <p className="mt-4 max-w-md leading-relaxed text-taupe">{service.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Inclus">
            {service.highlights.map((h) => (
              <li key={h} className="rounded-full border border-charcoal/15 px-3.5 py-1.5 text-xs text-ink">
                {h}
              </li>
            ))}
          </ul>
        </div>
        <Link
          href={`/contact?evenement=${service.slug}`}
          className="inline-flex min-h-11 items-center self-start text-sm font-medium text-gold-deep underline decoration-gold/50 underline-offset-8 transition-colors hover:text-charcoal hover:decoration-charcoal"
        >
          Demander un devis
          <span className="sr-only"> pour : {service.title}</span>
        </Link>
      </div>
    </article>
  );
}
