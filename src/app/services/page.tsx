import { services } from "@/config/content";
import { getCategoryImage, getServiceImage } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, servicesSchema } from "@/lib/schema";
import { container, cn } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Process } from "@/components/services/Process";
import { Stations } from "@/components/home/Stations";
import { ContactCta } from "@/components/home/ContactCta";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Mariages, fiançailles, anniversaires, baptêmes, événements d'entreprise, buffets et cocktails dînatoires : un traiteur fait maison pour chaque réception.",
  path: "/services",
});

export default async function ServicesPage() {
  const [hero, items] = await Promise.all([
    getCategoryImage("plats", 1),
    Promise.all(services.map(async (s) => ({ service: s, image: await getServiceImage(s.keywords, s.fallback) }))),
  ]);

  return (
    <>
      <PageHero
        title="Nos services"
        image={hero}
        intro="Du dîner intime au grand mariage, nous adaptons le menu, le service et les animations à chaque réception, selon vos besoins."
      />

      <section aria-label="Prestations" className="py-20 md:py-32">
        <div className={cn(container, "grid gap-x-10 gap-y-20 md:grid-cols-2 lg:gap-x-20")}>
          {items.map(({ service, image }, i) => (
            <ServiceCard key={service.slug} service={service} image={image} offset={i % 2 === 1} />
          ))}
        </div>
      </section>

      <Process />
      <Stations title="Ajoutez une animation à votre réception" />
      <ContactCta />

      <JsonLd
        data={[
          servicesSchema(),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
    </>
  );
}
