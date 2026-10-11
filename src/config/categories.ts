/**
 * Chaque catégorie correspond à un ou plusieurs dossiers de /public/images/gallery.
 * La correspondance ignore la casse, les accents et les espaces :
 * « Entrées », « entrees » ou « ENTREES » fonctionnent tous.
 * Les photos ajoutées dans ces dossiers apparaissent automatiquement
 * au prochain build ; une catégorie sans photo affiche « bientôt disponible ».
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
};

export const galleryCategories: GalleryCategory[] = [
  {
    slug: "entrees",
    folders: ["gallery/entrees"],
    title: "Les entrées",
    description: "Pastillas, briouates, salades composées et fruits de mer pour ouvrir la réception.",
    teaser: "Pastillas, briouates et salades pour ouvrir la réception.",
  },
  {
    slug: "plats",
    folders: ["gallery/plats-principaux"],
    title: "Les plats principaux",
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
    folders: ["gallery/desserts"],
    title: "Les desserts",
    description: "Verrines, entremets et douceurs de saison, dressés à la main.",
    teaser: "Verrines, entremets et douceurs de saison.",
  },
  {
    slug: "commandes-a-emporter",
    folders: ["gallery/commandes-a-emporter"],
    title: "Les commandes à emporter",
    description: "Entrées, plats et douceurs préparés sur commande dans notre cuisine, prêts à servir chez vous.",
    teaser: "Préparés sur commande, prêts à servir chez vous.",
  },
  {
    slug: "buffets",
    folders: ["gallery/buffets"],
    title: "Les buffets",
    description: "Des buffets généreux, dressés avec soin, pour recevoir en toute simplicité.",
    items: ["Buffet de bienvenue", "Buffet dînatoire"],
    teaser: "Buffet de bienvenue ou dînatoire, dressé avec soin.",
  },
  {
    slug: "animations",
    folders: ["gallery/animations"],
    title: "Les animations",
    description: "Stand beldi, sfenj, crêpes, sushi ou plancha : des stands préparés à la minute, devant vos invités.",
    teaser: "Des stands préparés à la minute, devant vos invités.",
  },
  {
    slug: "assise-de-the",
    folders: ["gallery/assise-de-the"],
    title: "L’assise de thé",
    description: "Thé à la menthe, gâteaux marocains et douceurs préparées avec soin, dans la tradition de l'accueil marocain.",
    teaser: "Thé à la menthe et douceurs, dans la tradition.",
  },
  {
    slug: "gateaux-marocains",
    folders: ["gallery/gateaux-marocains"],
    title: "Les gâteaux marocains",
    description: "Cornes de gazelle, briouates au miel, ghriba : les recettes de famille, façonnées une à une.",
    items: ["Vente au kilo", "Plateaux personnalisés"],
    teaser: "Recettes de famille, au kilo ou en plateaux personnalisés.",
  },
];
