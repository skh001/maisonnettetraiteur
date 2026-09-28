import { Hero } from "@/components/home/Hero";
import { Promises } from "@/components/home/Promises";
import { Showcase } from "@/components/home/Showcase";
import { Stations } from "@/components/home/Stations";
import { About } from "@/components/home/About";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { SurMesure } from "@/components/home/SurMesure";
import { Process } from "@/components/services/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { Travel } from "@/components/home/Travel";
import { ContactCta } from "@/components/home/ContactCta";

/**
 * Rythme de la page : sombre (hero) → clair → lin → clair → sombre (sur mesure) → clair → lin
 * → sombre (avis) → lin → sombre (contact). Les mises en page alternent image à gauche / à droite.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Promises />
      <Showcase />
      <About />
      <GalleryTeaser />
      <ServicesIndex />
      <SurMesure />
      <Stations />
      <Process />
      <Testimonials />
      <Travel />
      <ContactCta />
    </>
  );
}
