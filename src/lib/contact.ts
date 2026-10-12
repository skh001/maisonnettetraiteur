import { services } from "@/config/content";

/**
 * Formulaire de contact envoyé directement à Web3Forms depuis le navigateur.
 * La clé d'accès est publique par conception : elle désigne seulement la boîte de réception.
 */
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY = "9aea94f6-5de9-4afc-b014-a2bc92ed5925";

export const CONTACT_FIELDS = ["name", "phone", "email", "event", "date", "guests", "message", "consent"] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+\d][\d\s().-]{7,}$/;

export function readContactValues(data: FormData): ContactValues {
  return Object.fromEntries(
    CONTACT_FIELDS.map((f) => [f, String(data.get(f) ?? "").trim().slice(0, f === "message" ? 4000 : 200)]),
  ) as ContactValues;
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (values.name.length < 2) errors.name = "Indiquez votre nom.";
  if (!PHONE.test(values.phone)) errors.phone = "Indiquez un numéro de téléphone valide.";
  if (!EMAIL.test(values.email)) errors.email = "Indiquez une adresse e-mail valide, par exemple nom@exemple.fr.";
  if (!values.event) errors.event = "Choisissez le type d'événement.";
  if (values.guests && !(Number(values.guests) > 0)) errors.guests = "Indiquez un nombre d'invités positif.";
  if (values.message.length < 10) errors.message = "Décrivez votre projet en quelques mots.";
  if (values.consent !== "on") errors.consent = "Cochez cette case pour que nous puissions vous répondre.";
  return errors;
}

/** Envoie une demande déjà validée. Renvoie `true` seulement si Web3Forms confirme la réception. */
export async function submitContact(values: ContactValues, signal: AbortSignal): Promise<boolean> {
  const eventLabel = services.find((s) => s.slug === values.event)?.title ?? "Autre";

  const data = new FormData();
  data.append("access_key", WEB3FORMS_ACCESS_KEY);
  data.append("subject", `Demande de devis : ${eventLabel}, ${values.name}`);
  data.append("from_name", "Site Maisonnette Traiteur");
  data.append("name", values.name);
  data.append("phone", values.phone);
  data.append("email", values.email);
  data.append("event", eventLabel);
  data.append("date", values.date || "non précisée");
  data.append("guests", values.guests || "non précisé");
  data.append("message", values.message);
  data.append("botcheck", "");

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: data,
    signal,
  });
  const body: unknown = await res.json().catch(() => null);
  return res.ok && typeof body === "object" && body !== null && "success" in body && body.success === true;
}
