/**
 * Chaque catégorie correspond à un ou plusieurs dossiers de /public/images.
 * La correspondance ignore la casse, les accents et les espaces :
 * « Entrées », « entrees » ou « ENTREES » fonctionnent tous.
 * Les photos ajoutées dans ces dossiers apparaissent automatiquement
 * au prochain build.
 */
export type GalleryCategory = {
  slug: string;
  folders: string[];
  title: string;
  description: string;
  /** Spécialités ou formules mises en avant sous la description. */
  items?: string[];
  /** Phrase de conclusion, affichée en italique. */
  note?: string;
  /** Accroche courte des cartes de l'accueil. */
  teaser: string;
  /**
   * Couverture de secours tant que le dossier est vide : première photo d'un autre dossier
   * dont le nom de fichier contient ce mot-clé (elle doit représenter la catégorie).
   */
  coverFrom?: { folder: string; keyword: string };
};

export const galleryCategories: GalleryCategory[] = [
  {
    slug: "entrees",
    folders: ["Entrées"],
    title: "Entrées",
    description: "Pastillas, briouates, salades composées et fruits de mer pour ouvrir la réception.",
    teaser: "Pastillas, briouates et salades pour ouvrir la réception.",
  },
  {
    slug: "plats",
    folders: ["Main Courses"],
    title: "Nos plats",
    description: "Une cuisine généreuse et raffinée :",
    items: [
      "Poulet aux olives et ses accompagnements",
      "Bœuf",
      "Veau aux pruneaux et abricots caramélisés",
      "Agneau",
      "Méchoui",
      "Souris d'agneau",
      "Couscous",
      "Légumes rôtis…",
    ],
    note: "Des compositions sur mesure selon vos envies et votre événement.",
    teaser: "Tajines, méchoui, couscous : une cuisine généreuse et raffinée.",
  },
  {
    slug: "desserts",
    folders: ["Desserts"],
    title: "Desserts",
    description: "Verrines, entremets et douceurs de saison, dressés à la main.",
    teaser: "Verrines, entremets et douceurs de saison.",
  },
  {
    slug: "buffets",
    folders: ["Buffets"],
    title: "Buffets",
    description: "Des buffets généreux, dressés avec soin, pour recevoir en toute simplicité.",
    items: ["Buffet de bienvenue", "Buffet dînatoire"],
    teaser: "Buffet de bienvenue ou dînatoire, dressé avec soin.",
    coverFrom: { folder: "Entrées", keyword: "grand-buffet" },
  },
  {
    slug: "gateaux-marocains",
    folders: ["Moroccan Cakes", "Moroccan Cake Trays"],
    title: "Gâteaux marocains",
    description: "Cornes de gazelle, briouates au miel, ghriba : les recettes de famille, façonnées une à une.",
    items: ["Vente au kilo", "Plateaux personnalisés"],
    teaser: "Recettes de famille, au kilo ou en plateaux personnalisés.",
  },
  {
    slug: "selections-salees",
    folders: ["Platters"],
    title: "Sélections salées",
    description: "Des pièces salées à partager, pensées pour le cocktail comme pour le buffet.",
    items: ["Plateaux salés", "Personnalisation selon votre événement"],
    teaser: "Plateaux salés à partager, composés pour votre événement.",
    coverFrom: { folder: "Entrées", keyword: "plateau-fruits-de-mer" },
  },
];
