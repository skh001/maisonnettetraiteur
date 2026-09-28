import { contactLinks, siteConfig } from "@/config/site";
import { container } from "@/lib/utils";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PinIcon } from "@/components/ui/Icons";

/**
 * Carte de France dessinée en SVG à partir de coordonnées réelles (longitude, latitude),
 * projetées en équirectangulaire corrigée à la latitude moyenne : légère, nette, sans tuiles.
 */
type Point = [lon: number, lat: number];

const LON0 = -5.2;
const LAT0 = 51.3;
const KX = Math.cos((46.5 * Math.PI) / 180);
const S = 44;
const WIDTH = 454;
const HEIGHT = 444;

const project = ([lon, lat]: Point) => [(lon - LON0) * KX * S, (LAT0 - lat) * S] as const;
const toPath = (pts: Point[]) => `M${pts.map((p) => project(p).map((n) => n.toFixed(1)).join(" ")).join("L")}Z`;

const MAINLAND: Point[] = [
  [2.54, 51.09], [2.9, 50.7], [3.16, 50.78], [3.3, 50.52], [3.66, 50.45], [4.02, 50.35], [4.23, 49.96],
  [4.83, 50.17], [4.87, 49.79], [5.47, 49.5], [5.82, 49.55], [6.36, 49.46], [6.73, 49.16], [7.05, 49.12],
  [7.45, 49.17], [8.23, 48.97], [7.8, 48.58], [7.57, 48.12], [7.59, 47.58], [7.0, 47.5], [6.94, 47.29],
  [6.45, 46.97], [6.1, 46.6], [6.12, 46.26], [6.3, 46.26], [6.55, 46.4], [6.8, 46.39], [6.87, 46.05],
  [7.03, 45.93], [6.8, 45.72], [7.0, 45.64], [7.12, 45.3], [6.63, 45.12], [6.72, 44.93], [6.95, 44.63],
  [6.85, 44.5], [6.94, 44.3], [7.3, 44.15], [7.67, 44.15], [7.53, 43.78], [7.42, 43.75], [7.27, 43.69],
  [7.13, 43.56], [6.93, 43.52], [6.75, 43.42], [6.65, 43.26], [6.5, 43.15], [6.2, 43.1], [6.03, 43.05],
  [5.93, 43.1], [5.6, 43.16], [5.37, 43.21], [5.3, 43.35], [5.03, 43.33], [4.85, 43.43], [4.6, 43.35],
  [4.23, 43.46], [3.9, 43.52], [3.6, 43.38], [3.3, 43.25], [3.06, 43.05], [3.03, 42.8], [3.04, 42.55],
  [3.17, 42.44], [2.9, 42.42], [2.65, 42.35], [2.3, 42.42], [1.97, 42.38], [1.73, 42.5], [1.45, 42.6],
  [1.0, 42.72], [0.7, 42.85], [0.3, 42.69], [-0.05, 42.78], [-0.4, 42.8], [-0.75, 42.95], [-1.3, 43.08],
  [-1.45, 43.27], [-1.79, 43.37], [-1.56, 43.48], [-1.44, 43.75], [-1.33, 44.2], [-1.25, 44.55],
  [-1.26, 44.63], [-1.2, 45.0], [-1.25, 45.3], [-1.07, 45.57], [-1.0, 45.75], [-1.15, 46.0], [-1.2, 46.2],
  [-1.55, 46.4], [-1.8, 46.5], [-2.05, 46.8], [-2.17, 46.98], [-2.03, 47.1], [-2.2, 47.28], [-2.5, 47.28],
  [-2.9, 47.55], [-3.12, 47.48], [-3.35, 47.7], [-3.95, 47.85], [-4.37, 47.8], [-4.45, 47.98],
  [-4.73, 48.04], [-4.33, 48.09], [-4.62, 48.25], [-4.78, 48.33], [-4.77, 48.52], [-4.6, 48.62],
  [-4.0, 48.72], [-3.55, 48.82], [-3.0, 48.83], [-2.75, 48.57], [-2.3, 48.67], [-2.0, 48.65],
  [-1.55, 48.63], [-1.58, 48.85], [-1.6, 49.2], [-1.85, 49.52], [-1.95, 49.72], [-1.62, 49.65],
  [-1.26, 49.69], [-1.25, 49.45], [-1.1, 49.36], [-0.6, 49.34], [-0.2, 49.29], [0.1, 49.42], [0.1, 49.5],
  [0.2, 49.7], [0.6, 49.86], [1.1, 49.94], [1.45, 50.1], [1.63, 50.25], [1.58, 50.52], [1.6, 50.8],
  [1.8, 50.97], [2.1, 51.02],
];

const CORSICA: Point[] = [
  [9.4, 43.02], [9.45, 42.7], [9.55, 42.6], [9.55, 42.1], [9.4, 41.7], [9.23, 41.37], [8.8, 41.55],
  [8.6, 41.9], [8.6, 42.3], [8.75, 42.57], [9.25, 42.72], [9.35, 43.0],
];

type City = { name: string; at: Point; side: "left" | "right" };

const CITIES: City[] = [
  { name: "Lille", at: [3.06, 50.63], side: "right" },
  { name: "Paris", at: [2.35, 48.86], side: "right" },
  { name: "Strasbourg", at: [7.75, 48.58], side: "left" },
  { name: "Lyon", at: [4.84, 45.76], side: "right" },
  { name: "Bordeaux", at: [-0.58, 44.84], side: "right" },
  { name: "Toulouse", at: [1.44, 43.6], side: "left" },
  { name: "Marseille", at: [5.37, 43.3], side: "left" },
  { name: "Nice", at: [7.27, 43.7], side: "right" },
];

const SERVICES = ["Mariages", "Réceptions", "Événements privés", "Entreprises"];

const [BX, BY] = project([siteConfig.base.lon, siteConfig.base.lat]);

/** Trajet courbe depuis notre base vers une ville. */
function route([x, y]: readonly [number, number]) {
  const mx = (BX + x) / 2;
  const my = (BY + y) / 2;
  const dx = x - BX;
  const dy = y - BY;
  const bend = 0.16;
  return `M${BX.toFixed(1)} ${BY.toFixed(1)}Q${(mx + dy * bend).toFixed(1)} ${(my - dx * bend).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
}

function FranceMap() {
  const baseLabel = `${siteConfig.base.city} · ${siteConfig.base.area}`;
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-labelledby="travel-map-title"
      className="h-auto w-full overflow-visible"
    >
      <title id="travel-map-title">
        {`Carte de France : depuis ${baseLabel}, nous nous déplaçons notamment à ${CITIES.map((c) => c.name).join(", ")}.`}
      </title>
      <defs>
        <pattern id="travel-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="0.9" fill="var(--color-gold)" opacity="0.35" />
        </pattern>
        <linearGradient id="travel-land" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-ivory)" />
          <stop offset="1" stopColor="var(--color-sand)" />
        </linearGradient>
      </defs>

      <g strokeLinejoin="round">
        <path d={toPath(MAINLAND)} fill="url(#travel-land)" stroke="var(--color-gold)" strokeWidth="1.2" />
        <path d={toPath(MAINLAND)} fill="url(#travel-dots)" />
        <path d={toPath(CORSICA)} fill="url(#travel-land)" stroke="var(--color-gold)" strokeWidth="1.2" />
      </g>

      <g fill="none" stroke="var(--color-gold-deep)" strokeWidth="0.9" strokeDasharray="2 5" strokeLinecap="round" opacity="0.45">
        {CITIES.map((c) => (
          <path key={c.name} d={route(project(c.at))} />
        ))}
      </g>

      <g className="font-serif" fontSize="14" fill="var(--color-ink)">
        {CITIES.map((c) => {
          const [x, y] = project(c.at);
          const left = c.side === "left";
          return (
            <g key={c.name}>
              <circle cx={x} cy={y} r="6" fill="var(--color-gold)" opacity="0.18" />
              <circle cx={x} cy={y} r="2.6" fill="var(--color-gold-deep)" />
              <text x={left ? x - 10 : x + 10} y={y + 4.5} textAnchor={left ? "end" : "start"}>
                {c.name}
              </text>
            </g>
          );
        })}
      </g>

      <a href={contactLinks.maps} target="_blank" rel="noopener noreferrer" aria-label={`Notre maison à ${baseLabel} — ouvrir dans Google Maps`}>
        <circle
          cx={BX}
          cy={BY}
          r="9"
          fill="var(--color-gold)"
          opacity="0.35"
          className="origin-center animate-ping [transform-box:fill-box] motion-reduce:animate-none"
          style={{ animationDuration: "2.4s" }}
        />
        <circle cx={BX} cy={BY} r="10" fill="var(--color-ivory)" stroke="var(--color-gold)" strokeWidth="1.2" />
        <circle cx={BX} cy={BY} r="4.5" fill="var(--color-charcoal)" />
        <text x={BX + 16} y={BY - 5} fontSize="9.5" letterSpacing="2.2" fill="var(--color-gold-deep)" fontWeight="500">
          NOTRE MAISON
        </text>
        <text x={BX + 16} y={BY + 13} fontSize="16" className="font-serif" fill="var(--color-charcoal)">
          {baseLabel}
        </text>
      </a>
    </svg>
  );
}

export function Travel() {
  return (
    <section id="deplacements" aria-labelledby="travel-title" className="bg-linen-fade scroll-mt-24 py-24 md:py-36">
      <div className={container}>
        <SectionHeading
          id="travel-title"
          eyebrow="Zone d'intervention"
          split
          title="Nous nous déplaçons partout en France"
          intro="Déplacement possible partout en France selon l'événement, sur devis."
        />

        <div className="mt-14 grid items-center gap-12 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="mx-auto w-full max-w-xl lg:col-span-7 lg:max-w-none lg:pr-10">
            <FranceMap />
            <a
              href={contactLinks.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 text-sm text-taupe transition-colors hover:text-gold-deep"
            >
              <PinIcon className="size-5 text-gold-deep" />
              <span>
                Notre cuisine :{" "}
                <span className="text-ink transition-colors group-hover:text-gold-deep">
                  {siteConfig.address.streetAddress}, {siteConfig.address.postalCode} {siteConfig.address.addressLocality}
                </span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="arch-sm relative border border-gold/35 bg-ivory px-7 pb-10 pt-16 text-center shadow-luxe sm:px-12">
              <p className="text-xs uppercase tracking-[0.3em] text-gold-deep">Nos prestations</p>
              <h3 className="mt-4 font-serif text-3xl font-light text-charcoal md:text-4xl">
                Où que soit votre réception
              </h3>
              <ul className="mx-auto mt-8 max-w-xs divide-y divide-charcoal/10 border-y border-charcoal/10 text-left">
                {SERVICES.map((s) => (
                  <li key={s} className="flex items-center gap-4 py-3.5 font-serif text-xl text-charcoal md:text-2xl">
                    <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-gold" />
                    {s}
                  </li>
                ))}
                <li className="flex items-center gap-4 py-3.5 font-serif text-xl italic text-gold-deep md:text-2xl">
                  <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 border border-gold-deep" />
                  Déplacement sur devis
                </li>
              </ul>
              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <ButtonLink href="/contact" variant="gold" className="w-full sm:w-auto">
                  Demander un devis
                </ButtonLink>
                <a
                  href={contactLinks.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses("outline-dark", "w-full sm:w-auto")}
                >
                  <PinIcon className="size-4" />
                  Google Maps
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
