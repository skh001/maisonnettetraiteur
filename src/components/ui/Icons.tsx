import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15M14 6.5 19.5 12 14 17.5" />
  </Base>
);
export const ChevronLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="M15 5 8 12l7 7" />
  </Base>
);
export const ChevronRight = (p: IconProps) => (
  <Base {...p}>
    <path d="m9 5 7 7-7 7" />
  </Base>
);
export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);
export const ExpandIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 4h6v6M10 20H4v-6M20 4l-6.5 6.5M4 20l6.5-6.5" />
  </Base>
);
export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z" />
  </Base>
);
export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </Base>
);
export const PinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Base>
);
export const WhatsAppIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 20.5 5.3 16.3A8.5 8.5 0 1 1 8 19.2Z" />
    <path d="M9.2 8.3c.3-.6.8-.6 1-.1l.6 1.4c.1.3 0 .6-.2.8l-.4.4a5.6 5.6 0 0 0 3 3l.4-.4c.2-.2.5-.3.8-.2l1.4.6c.5.2.5.7-.1 1-1 .6-2.4.6-4.3-1.1-1.9-1.8-2.4-3.8-2.2-5.4Z" />
  </Base>
);
export const InstagramIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </Base>
);
export const FacebookIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14.5 8H16V4.8h-2.2C11.4 4.8 10 6.3 10 8.7V11H8v3h2v6.5h3.2V14h2.3l.5-3h-2.8V9.2c0-.8.4-1.2 1.3-1.2Z" />
  </Base>
);
export const LeafIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 19c0-8.2 5-13.2 14-14-.8 9-5.8 14-14 14Z" />
    <path d="M5 19 13.5 10.5" />
  </Base>
);
export const ChefHatIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 14.5V19.5h10v-5" />
    <path d="M7 14.5a4 4 0 0 1-1.1-7.8A4.6 4.6 0 0 1 12 4a4.6 4.6 0 0 1 6.1 2.7A4 4 0 0 1 17 14.5Z" />
    <path d="M7 17h10" />
  </Base>
);
export const MenuCardIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
    <path d="M9 8.5h6M9 12h6M9 15.5h3.5" />
  </Base>
);
export const RingsIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="9" cy="14.5" r="5" />
    <circle cx="15" cy="14.5" r="5" />
    <path d="m9 7.2 1.3-2.2h1.4L13 7.2 11 9Z" />
  </Base>
);
export const BriefcaseIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="7.5" width="17" height="12" rx="1.5" />
    <path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17" />
  </Base>
);
export const RouteIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="6" cy="18" r="2" />
    <path d="M8 18h7.5a3 3 0 0 0 0-6h-7a3 3 0 0 1 0-6H17" />
    <path d="M16 3.5 18.5 6 16 8.5" />
  </Base>
);
export const TikTokIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M14 3.5v11.2a3.8 3.8 0 1 1-3.8-3.8" />
    <path d="M14 3.5c.4 2.6 2.2 4.4 5 4.6" />
  </Base>
);
