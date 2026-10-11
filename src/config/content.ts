export type Station = {
  slug: string;
  name: string;
  /** Mots recherchés dans les noms de fichiers du dossier images/stands, puis images/gallery/animations. */
  keywords: string[];
  description: string;
};

export const stations: Station[] = [
  {
    slug: "stand-beldi",
    name: "Stand Beldi",
    keywords: ["beldi"],
    description: "Msemen, baghrir et harcha préparés comme à la maison, cuits sur place et servis chauds, au miel et au beurre.",
  },
  {
    slug: "sfenj-bar",
    name: "Sfenj bar",
    keywords: ["sfenj"],
    description: "Beignets marocains frits à la minute, servis chauds au sucre ou au miel.",
  },
  {
    slug: "tiramisu-bar",
    name: "Tiramisu bar",
    keywords: ["tiramisu"],
    description: "Tiramisu monté devant vos invités, avec parfums et garnitures au choix.",
  },
  {
    slug: "crepes",
    name: "Crêpes",
    keywords: ["crepe"],
    description: "Crêpes fines préparées à la demande, garnitures gourmandes et fruits frais.",
  },
  {
    slug: "pancakes",
    name: "Pancakes",
    keywords: ["pancake"],
    description: "Pancakes moelleux, sirop, fruits rouges et chantilly maison.",
  },
  {
    slug: "bar-a-cocktails",
    name: "Bar à cocktails",
    keywords: ["cocktail"],
    description: "Cocktails signature et jus pressés, préparés au verre pendant la réception.",
  },
  {
    slug: "sushi",
    name: "Sushi",
    keywords: ["sushi"],
    description: "Makis et sushis roulés sur place, avec des produits frais choisis pour votre date.",
  },
  {
    slug: "plancha",
    name: "Plancha",
    keywords: ["plancha"],
    description: "Viandes, poissons et légumes saisis à la plancha, servis à la minute devant vos invités.",
  },
];

export type Service = {
  slug: string;
  title: string;
  keywords: string[];
  /** Catégorie de la galerie utilisée si aucune photo dédiée n'existe dans /images/Services. */
  fallback: { category: string; index: number };
  description: string;
  highlights: string[];
};

export const services: Service[] = [
  {
    slug: "mariage",
    title: "Mariages",
    keywords: ["mariage", "wedding"],
    fallback: { category: "gateaux-marocains", index: 1 },
    description:
      "Du cocktail au dessert, un repas de noces construit avec vous, préparé avec soin et adapté au nombre de vos invités.",
    highlights: ["Menu sur mesure", "Validation de la prestation", "Service en salle"],
  },
  {
    slug: "fiancailles",
    title: "Fiançailles",
    keywords: ["fiancailles", "engagement"],
    fallback: { category: "gateaux-marocains", index: 0 },
    description: "Plateaux de gâteaux marocains, thé et petites bouchées pour une réception chaleureuse.",
    highlights: ["Plateaux composés", "L’assise de thé", "Décor coordonné"],
  },
  {
    slug: "anniversaire",
    title: "Anniversaires",
    keywords: ["anniversaire", "birthday"],
    fallback: { category: "desserts", index: 0 },
    description: "Buffets gourmands et animations sucrées pour fêter chaque âge, en famille ou entre amis.",
    highlights: ["Animations sucrées", "Buffet", "Gâteau sur commande"],
  },
  {
    slug: "entreprise",
    title: "Événements d'entreprise",
    keywords: ["entreprise", "corporate", "seminaire"],
    fallback: { category: "commandes-a-emporter", index: 0 },
    description: "Petits-déjeuners, déjeuners de travail, séminaires et soirées clients, livrés à l'heure.",
    highlights: ["Plateaux repas", "Cocktail", "Facturation entreprise"],
  },
  {
    slug: "evenement-prive",
    title: "Événements privés",
    keywords: ["prive", "private"],
    fallback: { category: "plats", index: 0 },
    description: "Dîner à domicile, repas de famille ou réception intime : une cuisine de fête chez vous.",
    highlights: ["À domicile", "Petits comités", "Menu libre"],
  },
  {
    slug: "bapteme",
    title: "Baptêmes",
    keywords: ["bapteme", "baptism", "aqiqa"],
    fallback: { category: "desserts", index: 1 },
    description: "Une table douce et soignée pour accueillir le nouveau venu avec toute la famille.",
    highlights: ["Buffet sucré-salé", "Dragées", "Service"],
  },
  {
    slug: "buffet",
    title: "Buffets",
    keywords: ["buffet"],
    fallback: { category: "entrees", index: 0 },
    description: "Des buffets froids ou chauds, généreux et dressés avec soin, prêts à servir.",
    highlights: ["Froid ou chaud", "Mise en place", "Vaisselle"],
  },
  {
    slug: "cocktail",
    title: "Cocktails dînatoires",
    keywords: ["cocktail"],
    fallback: { category: "buffets", index: 1 },
    description: "Pièces salées et sucrées, servies au plateau ou en buffet, pour recevoir debout.",
    highlights: ["Pièces cocktail", "Service au plateau", "Bar"],
  },
];

/** Section « Notre histoire » de l'accueil : un paragraphe par entrée. */
export const story = [
  "La cuisine a toujours été une passion pour moi.",
  "En 2019, j’ai commencé petit à petit à partager mes créations et à prendre mes premières commandes.",
  "Les encouragements, le bouche-à-oreille et la confiance de mes clients m’ont permis d’aller toujours plus loin.",
  "Le nom « La Maisonnette » n’a pas été choisi au hasard.",
  "Il vient du « fait maison », qui est depuis le début au cœur de ma cuisine.",
  "D’une passion est née une véritable activité de traiteur événementiel, construite pas à pas, avec beaucoup de travail, de cœur et toujours cet esprit fait maison qui fait l’identité de La Maisonnette.",
];

export const pillars = [
  {
    title: "La passion",
    text: "Cuisiner pour les autres est une affaire de famille. Chaque réception est préparée avec soin, comme si elle était la nôtre.",
  },
  {
    title: "Le fait maison",
    text: "Une cuisine artisanale : pâtes, farces, sauces et pâtisseries sont préparées à la main, sans produits industriels.",
  },
  {
    title: "Des produits frais",
    text: "Légumes de saison, viandes choisies, amandes et miel de qualité : tout est acheté pour votre date.",
  },
  {
    title: "Un service personnalisé",
    text: "Un seul interlocuteur, du premier appel jusqu'au dernier plateau servi.",
  },
  {
    title: "Le sens du détail",
    text: "Dressage, vaisselle, fleurs et horaires : rien n'est laissé au hasard le jour J.",
  },
];

/** « Pourquoi Maisonnette » : les engagements affichés sous le hero. Icônes dans components/home/Promises. */
export const promises = [
  { icon: "leaf", title: "Produits frais", text: "De saison, achetés pour votre date." },
  { icon: "chef", title: "Fait maison", text: "Sans produits industriels, tout vient de notre cuisine." },
  { icon: "menu", title: "Menus personnalisés", text: "Composés avec vous, ajustables jusqu'au bout." },
  { icon: "rings", title: "Mariages", text: "Du cocktail au dessert, adaptés à chaque réception." },
  { icon: "briefcase", title: "Entreprises", text: "Séminaires, déjeuners et soirées clients." },
  { icon: "route", title: "Partout en France", text: "Nous venons à vous, sur devis." },
] as const;

/** Section « Sur mesure » : les formules que l'on combine selon l'événement. */
export const formats = [
  { title: "Repas servi à table", text: "Entrée, plat et dessert, avec mise en place et service selon la formule choisie." },
  { title: "Buffets", text: "Buffet de bienvenue ou dînatoire, froid ou chaud, présenté avec soin." },
  { title: "Cocktail dînatoire", text: "Pièces salées et sucrées servies au plateau, pour recevoir debout." },
  { title: "L’assise de thé", text: "Gâteaux marocains, plateaux personnalisés et thé à la menthe." },
];

export const processSteps = [
  { title: "Premier échange", text: "Vous nous parlez de la date, du lieu, du nombre d'invités et de vos envies." },
  { title: "Proposition", text: "Nous composons un menu et un devis détaillé, ajustables autant que nécessaire." },
  { title: "Validation de la prestation", text: "Menu, quantités et déroulé : nous validons ensemble chaque détail de votre réception." },
  { title: "Le jour J", text: "Livraison, mise en place et service : vous profitez de vos invités." },
];
