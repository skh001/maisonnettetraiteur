import Image from "next/image";
import { getHeroImage } from "@/lib/images";
import { HeroContent } from "./HeroContent";

export async function Hero() {
  const image = await getHeroImage();
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex h-[100svh] min-h-[620px] items-end overflow-hidden bg-charcoal text-ivory"
    >
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={80}
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          className="-z-20 animate-hero-zoom object-cover motion-reduce:animate-none"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(20_18_16/0.86)_0%,rgb(20_18_16/0.4)_48%,rgb(20_18_16/0.5)_100%)]"
      />
      <HeroContent />
    </section>
  );
}
