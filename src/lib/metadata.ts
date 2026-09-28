import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: `${title} · ${siteConfig.name}`,
      description,
    },
    twitter: { card: "summary_large_image", title: `${title} · ${siteConfig.name}`, description },
  };
}
