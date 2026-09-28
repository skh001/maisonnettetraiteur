export type SiteImage = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
  alt: string;
  /** Nom de fichier normalisé, utilisé pour les recherches par mot-clé. */
  key: string;
};
