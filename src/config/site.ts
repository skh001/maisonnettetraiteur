/**
 * Coordonnées et réglages globaux.
 * ⚠️ Remplacez les valeurs marquées TODO par les informations réelles.
 */
export const siteConfig = {
  name: "Maisonnette Traiteur",
  url: "https://maisonnette-traiteur.fr",
  locale: "fr_FR",
  title: "Maisonnette Traiteur — Traiteur événementiel et pâtisserie marocaine",
  description:
    "Traiteur haut de gamme pour mariages, fiançailles et réceptions : cuisine faite maison, produits frais, pâtisseries marocaines et animations culinaires sur mesure.",
  keywords: [
    "traiteur",
    "traiteur mariage",
    "traiteur marocain",
    "pâtisserie marocaine",
    "gâteaux marocains",
    "buffet",
    "cocktail dînatoire",
    "animation culinaire",
    "sfenj",
    "msemen",
    "baghrir",
  ],
  contact: {
    phone: "+33600000000", // TODO
    phoneDisplay: "06 00 00 00 00", // TODO
    /** Lien WhatsApp Business (message pré-rempli configuré dans l'application). */
    whatsapp: "https://wa.me/message/JDVNLZ26MRLFK1",
    email: "contact@maisonnette-traiteur.fr",
  },
  address: {
    // Laissez vide ce qui ne doit pas apparaître publiquement
    streetAddress: "54 Rue Pasteur",
    postalCode: "44340",
    addressLocality: "Bouguenais",
    addressRegion: "Pays de la Loire",
    addressCountry: "FR",
  },
  areaServed: "France",
  /** Ville affichée sur la carte « Nous nous déplaçons partout en France ». */
  base: { city: "Bouguenais", area: "Nantes", lon: -1.62, lat: 47.18 },
  mapsQuery: "Cuisine gâteaux maisonnette, 54 Rue Pasteur, 44340 Bouguenais",
  mapsUrl: "https://maps.app.goo.gl/zbBkzyoQRKd3NG5WA",
  hours: "Du lundi au samedi, de 9 h à 19 h", // TODO
  social: {
    tiktok: "https://www.tiktok.com/@cuisinegateauxmaisonette",
    instagram: "https://www.instagram.com/cuisine_gateaux_maisonnette",
    facebook: "https://www.facebook.com/share/18VyNYtMqn/",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
] as const;

export const contactLinks = {
  tel: `tel:${siteConfig.contact.phone}`,
  mail: `mailto:${siteConfig.contact.email}`,
  whatsapp: siteConfig.contact.whatsapp,
  maps: siteConfig.mapsUrl,
  mapsEmbed: `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapsQuery)}&output=embed`,
};
