export type Station = {
  slug: string;
  name: string;
  /** Mots recherchés dans les noms de fichiers des dossiers Stations puis Animations. */
  keywords: string[];
  description: string;
};

export const stations: Station[] = [
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
    slug: "stand-marocain",
    name: "Stand marocain",
    keywords: ["stand-marocain", "moroccan-stand", "marocain", "moroccan"],
    description: "Thé à la menthe, douceurs et service traditionnel, comme à la maison.",
  },
  {
    slug: "msemen",
    name: "Msemen",
    keywords: ["msemen", "msmen"],
    description: "Crêpes feuilletées cuites sur la plaque, nature, au miel ou farcies.",
  },
  {
    slug: "baghrir",
    name: "Baghrir",
    keywords: ["baghrir"],
    description: "Crêpes mille trous, nappées de beurre fondu et de miel.",
  },
  {
    slug: "harcha",
    name: "Harcha",
    keywords: ["harcha"],
    description: "Galettes de semoule dorées au beurre, servies tièdes avec confiture ou fromage.",
  },
  {
    slug: "bar-a-cocktails",
    name: "Bar à cocktails",
    keywords: ["cocktail"],
    description: "Cocktails signature et jus pressés, préparés au verre pendant la réception.",
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
      "Du cocktail au dessert, un repas de noces construit avec vous, servi avec la même attention pour cinquante ou cinq cents invités.",
    highlights: ["Menu sur mesure", "Dégustation", "Service en salle"],
  },
  {
    slug: "fiancailles",
    title: "Fiançailles",
    keywords: ["fiancailles", "engagement"],
    fallback: { category: "gateaux-marocains", index: 0 },
    description: "Plateaux de gâteaux marocains, thé et petites bouchées pour une réception chaleureuse.",
    highlights: ["Plateaux composés", "Table du thé", "Décor coordonné"],
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
    fallback: { category: "selections-salees", index: 0 },
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
    fallback: { category: "selections-salees", index: 1 },
    description: "Pièces salées et sucrées, servies au plateau ou en buffet, pour recevoir debout.",
    highlights: ["Pièces cocktail", "Service au plateau", "Bar"],
  },
];

export const pillars = [
  {
    title: "La passion",
    text: "Cuisiner pour les autres est une affaire de famille. Chaque réception est préparée comme si elle était la nôtre.",
  },
  {
    title: "Le fait maison",
    text: "Pâtes, farces, sauces et pâtisseries sont préparées dans notre cuisine, sans produits industriels.",
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
  { icon: "rings", title: "Mariages", text: "Du cocktail au dessert, de 50 à 500 invités." },
  { icon: "briefcase", title: "Entreprises", text: "Séminaires, déjeuners et soirées clients." },
  { icon: "route", title: "Partout en France", text: "Nous venons à vous, sur devis." },
] as const;

/** Section « Sur mesure » : les formules que l'on combine selon l'événement. */
export const formats = [
  { title: "Repas servi à table", text: "Entrée, plat et dessert dressés à l'assiette, service en salle." },
  { title: "Buffets", text: "Buffet de bienvenue ou dînatoire, froid ou chaud, présenté avec soin." },
  { title: "Cocktail dînatoire", text: "Pièces salées et sucrées servies au plateau, pour recevoir debout." },
  { title: "Table du thé", text: "Gâteaux marocains, plateaux personnalisés et thé à la menthe." },
];

export const processSteps = [
  { title: "Premier échange", text: "Vous nous parlez de la date, du lieu, du nombre d'invités et de vos envies." },
  { title: "Proposition", text: "Nous composons un menu et un devis détaillé, ajustables autant que nécessaire." },
  { title: "Dégustation", text: "Pour les mariages et grandes réceptions, nous validons ensemble les recettes." },
  { title: "Le jour J", text: "Livraison, mise en place et service : vous profitez de vos invités." },
];

/**
 * ⚠️ Exemples de mise en page — remplacez-les par de vrais avis clients
 * (Google, Facebook…) avant la mise en ligne.
 */
export const testimonials = [
  {
    quote:
      "Nos invités parlent encore du buffet et des plateaux de gâteaux. Tout était beau, bon et servi à l'heure : nous n'avons rien eu à gérer.",
    author: "Samira et Youssef",
    event: "Mariage",
  },
  {
    quote:
      "Le sfenj bar a fait l'unanimité, petits et grands. Une équipe souriante et très professionnelle du début à la fin.",
    author: "Karim L.",
    event: "Anniversaire",
  },
  {
    quote:
      "Un cocktail pour 120 personnes, des pièces fines et généreuses, une présentation soignée. Nous referons appel à Maisonnette.",
    author: "Claire M.",
    event: "Soirée d'entreprise",
  },
  {
    quote: "Des gâteaux marocains comme ceux de ma grand-mère, et un plateau de fiançailles magnifique.",
    author: "Nadia B.",
    event: "Fiançailles",
  },
];
