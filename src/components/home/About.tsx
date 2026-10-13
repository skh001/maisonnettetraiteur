import Image from "next/image";
import { pillars } from "@/config/content";
import { getAboutImages } from "@/lib/images";
import { container, cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Ornament";

export async function About() {
  const [main, detail] = await getAboutImages();

  return (
    <section aria-labelledby="about-title" className="bg-linen-fade py-20 md:py-32">
      <div className={cn(container, "grid gap-14 lg:grid-cols-12 lg:gap-10")}>
        <Reveal className="relative lg:col-span-6">
          {main && (
            <div className="arch relative aspect-[4/5] w-[85%] overflow-hidden bg-sand shadow-luxe sm:w-[75%]">
              <Image
                src={main.src}
                alt={main.alt}
                fill
                sizes="(min-width: 1024px) 38vw, 80vw"
                placeholder="blur"
                blurDataURL={main.blurDataURL}
                className="object-cover"
              />
            </div>
          )}
          {detail && (
            <div className="absolute -bottom-8 right-0 aspect-square w-[46%] overflow-hidden border-[6px] border-ivory bg-sand shadow-luxe-lg sm:w-[40%]">
              <Image
                src={detail.src}
                alt={detail.alt}
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                placeholder="blur"
                blurDataURL={detail.blurDataURL}
                className="object-cover"
              />
            </div>
          )}
        </Reveal>

        <div className="lg:col-span-5 lg:col-start-8 lg:pt-10">
          <Reveal>
            <Eyebrow className="mb-5">Notre philosophie</Eyebrow>
            <h2 id="about-title" className="font-serif text-[2.5rem] font-light leading-[1.02] text-charcoal sm:text-5xl lg:text-6xl">
              Une cuisine de famille, servie comme à la maison.
            </h2>
          </Reveal>

          <dl className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className={cn("border-t border-charcoal/12 pt-5", i === 0 && "sm:col-span-2")}>
                <dt className="font-serif text-2xl text-charcoal">{p.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-taupe">{p.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
