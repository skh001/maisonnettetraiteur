export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const pad = (n: number) => String(n).padStart(2, "0");

/** Conteneur de mise en page commun. */
export const container = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16";
