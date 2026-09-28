import type { ComponentType, SVGProps } from "react";
import { contactLinks, siteConfig } from "@/config/site";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { SocialLinks } from "@/components/layout/SocialLinks";

type Channel = {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const channels: Channel[] = [
  { label: "Téléphone", value: siteConfig.contact.phoneDisplay, href: contactLinks.tel, Icon: PhoneIcon },
  { label: "WhatsApp", value: "Écrire un message", href: contactLinks.whatsapp, external: true, Icon: WhatsAppIcon },
  { label: "E-mail", value: siteConfig.contact.email, href: contactLinks.mail, Icon: MailIcon },
  {
    label: "Notre cuisine · déplacement partout en France",
    value: `${siteConfig.base.city} (${siteConfig.base.area})`,
    href: contactLinks.maps,
    external: true,
    Icon: PinIcon,
  },
];

export function ContactChannels() {
  return (
    <div>
      <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
        {channels.map(({ label, value, href, external, Icon }) => (
          <li key={label}>
            <a
              href={href}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className="group flex items-center gap-5 py-5"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-charcoal/15 text-gold-deep transition-colors duration-500 group-hover:border-gold-deep">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-taupe">{label}</span>
                <span className="block break-words font-serif text-2xl text-charcoal transition-colors group-hover:text-gold-deep">
                  {value}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-taupe">{siteConfig.hours}</p>
      <div className="mt-8">
        <p className="text-sm text-ink">Suivez nos dernières réceptions</p>
        <SocialLinks className="mt-4" />
      </div>
    </div>
  );
}
