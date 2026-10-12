import { siteConfig } from "@/config/site";
import { services } from "@/config/content";

const BUSINESS_ID = `${siteConfig.url}/#traiteur`;

export function businessSchema() {
  const { address, contact, social } = siteConfig;
  const hasAddress = Object.entries(address).some(([k, v]) => k !== "addressCountry" && v);
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": BUSINESS_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    image: `${siteConfig.url}/opengraph-image`,
    logo: `${siteConfig.url}/images/logo/logo.png`,
    telephone: contact.phone,
    email: contact.email,
    priceRange: "€€€",
    servesCuisine: ["Marocaine", "Française", "Pâtisserie orientale"],
    areaServed: siteConfig.areaServed,
    ...(hasAddress && { address: { "@type": "PostalAddress", ...address } }),
    sameAs: Object.values(social),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations traiteur",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.description },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "fr-FR",
    publisher: { "@id": BUSINESS_ID },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        serviceType: "Traiteur",
        provider: { "@id": BUSINESS_ID },
        areaServed: siteConfig.areaServed,
      },
    })),
  };
}
