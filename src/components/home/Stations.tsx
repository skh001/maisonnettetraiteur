import Image from "next/image";
import { stations } from "@/config/content";
import { getAmbianceImages, getStationImage } from "@/lib/images";
import { container, cn, pad } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, StaggerItem, StaggerList } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";

const INTRO =
  "Nos animations culinaires transforment un buffet en moment partagé. Chaque stand est tenu par notre équipe et préparé à la minute.";

export async function Stations({ title = "Des stands cuisinés devant vos invités" }: { title?: string }) {
  const items = await Promise.all(
    stations.map(async (s) => ({ ...s, image: await getStationImage(s.keywords, s.name) })),
  );

  // Tant que la plupart des stands n'ont pas leur photo, on les présente comme une carte de restaurant.
  const withPhoto = items.filter((s) => s.image).length;
  if (withPhoto < Math.ceil(items.length / 2)) {
    const [ambiance] = await getAmbianceImages("stations");
    return <StationsMenu title={title} items={items} ambiance={ambiance ?? null} />;
  }

  return (
    <section aria-labelledby="stations-title" className="py-20 md:py-32">
      <div className={container}>
        <SectionHeading id="stations-title" eyebrow="Animations culinaires" split title={title} intro={INTRO} />
      </div>

      <StaggerList
        label="Animations culinaires"
        tabIndex={0}
        className={cn(
          container,
          "no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:mt-20",
          "md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-16 md:overflow-visible lg:grid-cols-3",
        )}
      >
        {items.map((station) => (
          <StaggerItem key={station.slug} className="w-[72vw] max-w-sm shrink-0 snap-start sm:w-[46vw] md:w-auto md:max-w-none">
            <article className="group">
              <div className="arch relative aspect-[3/4] overflow-hidden bg-linen transition-transform duration-700 ease-luxe group-hover:-translate-y-2">
                {station.image ? (
                  <Image
                    src={station.image.src}
                    alt={station.image.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 72vw"
                    placeholder="blur"
                    blurDataURL={station.image.blurDataURL}
                    className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.06]"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_35%,var(--color-sand),var(--color-linen)_70%)] font-serif text-[9rem] font-light italic text-gold/60"
                  >
                    {station.name.charAt(0)}
                  </span>
                )}
              </div>
              <h3 className="mt-6 font-serif text-3xl font-light text-charcoal">{station.name}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-taupe">{station.description}</p>
            </article>
          </StaggerItem>
        ))}
      </StaggerList>
    </section>
  );
}

type Item = (typeof stations)[number] & { image: Awaited<ReturnType<typeof getStationImage>> };

/** Présentation « carte » : liste numérotée en deux colonnes, photo d'ambiance en arche. */
function StationsMenu({ title, items, ambiance }: { title: string; items: Item[]; ambiance: Item["image"] }) {
  return (
    <section aria-labelledby="stations-title" className="py-20 md:py-32">
      <div className={cn(container, "grid gap-14 lg:grid-cols-12 lg:gap-10")}>
        <div className="lg:col-span-7">
          <SectionHeading id="stations-title" eyebrow="Animations culinaires" title={title} intro={INTRO} />

          {ambiance && (
            <Reveal className="arch-sm relative mt-10 aspect-[4/3] overflow-hidden bg-sand shadow-luxe sm:aspect-[16/9] lg:hidden">
              <Image
                src={ambiance.src}
                alt={ambiance.alt}
                fill
                sizes="(min-width: 1024px) 0px, 100vw"
                placeholder="blur"
                blurDataURL={ambiance.blurDataURL}
                className="object-cover"
              />
            </Reveal>
          )}

          <StaggerList label="Animations culinaires" className="mt-12 grid border-t border-charcoal/12 sm:grid-cols-2 sm:gap-x-10 md:mt-16">
            {items.map((s, i) => (
              <StaggerItem key={s.slug} className="border-b border-charcoal/12">
                <article className="group flex gap-5 py-6">
                  <span className="pt-1 font-serif text-sm italic text-gold-deep">{pad(i + 1)}</span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-2xl font-light text-charcoal transition-colors duration-500 group-hover:text-gold-deep md:text-[1.7rem]">
                      {s.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-taupe">{s.description}</p>
                  </div>
                  {s.image && (
                    <span className="relative ml-auto size-14 shrink-0 overflow-hidden rounded-full bg-linen">
                      <Image src={s.image.src} alt="" fill sizes="56px" className="object-cover" />
                    </span>
                  )}
                </article>
              </StaggerItem>
            ))}
          </StaggerList>

          <Reveal className="mt-10">
            <TextLink href="/services" className="text-charcoal">
              Ajouter une animation à votre réception
            </TextLink>
          </Reveal>
        </div>

        {ambiance && (
          <Reveal delay={0.15} className="relative hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-28">
              <div className="relative isolate">
                {/* Arche dorée décalée derrière la photo. */}
                <span aria-hidden="true" className="arch absolute -right-4 top-4 -z-10 size-full border border-gold/50" />
                <div className="arch relative aspect-[3/5] overflow-hidden bg-sand shadow-luxe">
                  <Image
                    src={ambiance.src}
                    alt={ambiance.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 0px"
                    placeholder="blur"
                    blurDataURL={ambiance.blurDataURL}
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="mt-6 max-w-xs font-serif text-lg italic leading-snug text-taupe">
                Préparé à la minute, sous les yeux de vos invités.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
