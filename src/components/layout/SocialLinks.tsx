import { contactLinks, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/Icons";

const items = [
  { href: siteConfig.social.tiktok, label: "TikTok", Icon: TikTokIcon },
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: contactLinks.whatsapp, label: "WhatsApp", Icon: WhatsAppIcon },
];

export function SocialLinks({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {items.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.name} sur ${label}`}
            className={cn(
              "grid size-11 place-items-center rounded-full border transition-colors duration-500 ease-luxe",
              tone === "light"
                ? "border-ivory/20 text-ivory/80 hover:border-gold-soft hover:text-gold-soft"
                : "border-charcoal/15 text-charcoal hover:border-gold-deep hover:text-gold-deep",
            )}
          >
            <Icon className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}
