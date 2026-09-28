import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageHero title="Page introuvable" intro="Cette page n'existe pas ou a été déplacée.">
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="gold">
          Retour à l&apos;accueil
        </ButtonLink>
        <ButtonLink href="/galerie" variant="outline-light">
          Voir la galerie
        </ButtonLink>
      </div>
    </PageHero>
  );
}
