import { getCategoryImage } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { container, cn } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Contact et devis",
  description:
    "Demandez un devis pour votre mariage, vos fiançailles ou votre réception : téléphone, WhatsApp, e-mail ou formulaire en ligne.",
  path: "/contact",
});

export default async function ContactPage() {
  const hero = (await getCategoryImage("gateaux-marocains", 1)) ?? (await getCategoryImage("desserts", 1));

  return (
    <>
      <PageHero
        title="Parlons de votre réception"
        image={hero}
        intro="Racontez-nous votre projet : nous vous répondons avec une proposition de menu et un devis détaillé."
      />

      <section aria-label="Nous contacter" className="py-20 md:py-28">
        <div className={cn(container, "grid gap-16 lg:grid-cols-12 lg:gap-10")}>
          <Reveal className="lg:col-span-4">
            <h2 className="font-serif text-4xl font-light text-charcoal md:text-5xl">Nous joindre</h2>
            <p className="mt-4 mb-10 max-w-sm leading-relaxed text-taupe">
              Pour une date proche, le téléphone ou WhatsApp restent le plus rapide.
            </p>
            <ContactChannels />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <h2 className="mb-10 font-serif text-4xl font-light text-charcoal md:text-5xl">Demande de devis</h2>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section aria-label="Carte" className="pb-20 md:pb-28">
        <div className={container}>
          <div className="h-[420px] overflow-hidden md:h-[520px]">
            <MapEmbed />
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
