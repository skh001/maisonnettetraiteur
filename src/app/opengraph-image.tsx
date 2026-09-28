import { ImageResponse } from "next/og";
import sharp from "sharp";
import path from "node:path";
import { getHeroImage } from "@/lib/images";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

/** Image de partage : la photo du hero recadrée, sinon une carte à la marque. */
export default async function OpengraphImage() {
  const hero = await getHeroImage();
  if (hero) {
    const file = path.join(process.cwd(), "public", decodeURIComponent(hero.src));
    const buffer = await sharp(file)
      .rotate()
      .resize(size.width, size.height, { fit: "cover" })
      .modulate({ brightness: 0.92 })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    return new Response(new Uint8Array(buffer), { headers: { "Content-Type": contentType } });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "#1f1d1b",
          color: "#faf7f2",
        }}
      >
        <div style={{ fontSize: 88, lineHeight: 1 }}>Maisonnette Traiteur</div>
        <div style={{ fontSize: 34, marginTop: 24, color: "#dcc79e" }}>L&apos;art de recevoir, fait maison.</div>
      </div>
    ),
    size,
  );
}
