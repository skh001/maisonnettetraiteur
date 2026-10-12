import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "La Maisonnette",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#1f1d1b",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
