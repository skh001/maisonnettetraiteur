# Maisonnette Traiteur — maisonnette-traiteur.fr

Site vitrine Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## 1. Ajouter les photos

Déposez vos photos (jpg, png, webp, avif) dans `public/images/` :

| Dossier | Rôle |
|---|---|
| `Entrées` | Galerie « Entrées » |
| `Main Courses` | Galerie « Nos plats » |
| `Desserts` | Galerie « Desserts » |
| `Buffets` | Galerie « Buffets » |
| `Moroccan Cakes` + `Moroccan Cake Trays` | Galerie « Gâteaux marocains » (les deux dossiers se suivent) |
| `Platters` | Galerie « Sélections salées » |
| `Animations` | Photos des stands |
| `Hero` *(optionnel)* | Grande photo d'accueil (la 1ʳᵉ du dossier) |
| `About` *(optionnel)* | Les 2 photos de la section « La maison » |
| `Showcase` *(optionnel)* | Le bandeau défilant ; sinon sélection automatique |
| `Stations` *(optionnel)* | Photos des stands |
| `Services` *(optionnel)* | Photos des cartes services (la 1ʳᵉ illustre aussi « Pour chaque occasion ») |
| `Sur mesure` *(optionnel)* | Les 3 photos verticales du bandeau « Sur mesure » |
| `Contact` *(optionnel)* | Photo de fond du bloc « Parlons de votre événement » (format paysage) |

Tant qu'un dossier optionnel est vide, une photo des galeries est choisie par mot-clé (`src/lib/images.ts`, `AMBIANCE`), et `coverFrom` dans `src/config/categories.ts` donne une couverture aux catégories encore vides. Les stands s'affichent en « carte » tant que moins de la moitié ont leur photo, puis en arches illustrées.

- **Catégories** (titres, textes, listes de plats) : `src/config/categories.ts`. Une catégorie sans photo reste visible sur la page Galerie (texte seul) mais est masquée de l'accueil.
- Les noms de dossiers ignorent casse et accents (`Entrées` = `entrees`).
- **Nouvelles photos** : déposez-les puis relancez `npm run build` (ou poussez sur Git : Vercel reconstruit tout seul). Next.js ne sert que les fichiers présents au moment du build.
- **Ordre** : tri par nom de fichier ; préfixez `01-`, `02-`… pour imposer un ordre.
- **Textes alternatifs (SEO)** : générés depuis le nom de fichier (`tajine-agneau.jpg` → « Tajine agneau, plats Maisonnette Traiteur »). Pour un texte précis, ajoutez un `_alts.json` dans le dossier : `{ "IMG_2031.jpg": "Pastilla au poulet et amandes" }`.
- **Stands** (Sfenj bar, Tiramisu bar…) : la photo est trouvée par mot-clé dans le nom de fichier, dans `Stations` puis `Animations` (`sfenj-bar.jpg`, `Harcha 2.jpg`…). Mots-clés dans `src/config/content.ts`. Sans photo, la carte affiche une arche typographique.
- **Services** : `mariage.jpg`, `bapteme.jpg`… dans `Services`, sinon une photo de la galerie.

Dimensions réelles et placeholders flous sont calculés au build avec `sharp` : aucun décalage de mise en page. Exportez vos photos en ~2500 px de large maximum ; Next.js génère les formats AVIF/WebP et les tailles adaptées.

## 2. À compléter avant la mise en ligne

- `src/config/site.ts` : téléphone, WhatsApp, e-mail, adresse, zone, horaires, réseaux sociaux (valeurs `TODO`).
- `src/config/content.ts` : **les avis clients sont des exemples**, remplacez-les par de vrais avis.
- Formulaire : copiez `.env.example` en `.env.local` et renseignez `RESEND_API_KEY` (resend.com, domaine vérifié). Sans clé : en développement la demande s'affiche dans la console ; en production le formulaire invite à appeler.

## 3. Architecture

```
src/
  app/            pages, métadonnées, sitemap, robots, image OpenGraph, action du formulaire
  components/
    layout/       navbar, footer, fond animé, en-tête de page, fournisseur d'animations
    home/         hero, bandeau infini, stands, à propos, galerie, avis, appel à l'action
    gallery/      masonry, lightbox, navigation par catégorie
    services/     cartes services, étapes
    contact/      formulaire, canaux, carte Google (chargée au clic, RGPD)
    ui/           boutons, icônes, apparitions, titres
  config/         coordonnées, catégories, contenus éditoriaux
  lib/            système d'images, schema.org, utilitaires
```

## Performance et accessibilité

- Pages 100 % statiques ; Framer Motion chargé en différé (`LazyMotion`).
- Fond animé et bandeau infini en CSS pur (transformations GPU uniquement).
- Hero en `priority`, aucune animation d'opacité sur la photo (LCP préservé).
- Carte Google chargée seulement au clic : aucun cookie tiers par défaut.
- `prefers-reduced-motion` respecté partout ; lightbox au clavier (← → Échap), focus piégé et restitué ; lien d'évitement ; contrastes AA.
- SEO : métadonnées par page, OpenGraph (photo du hero recadrée), JSON-LD `FoodEstablishment`, `Service`, `BreadcrumbList`, sitemap, robots.
