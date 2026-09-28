"use server";

import { services } from "@/config/content";
import { siteConfig } from "@/config/site";

const FIELDS = ["name", "phone", "email", "event", "date", "guests", "message", "consent"] as const;
type Field = (typeof FIELDS)[number];

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
  /** Change à chaque envoi pour remonter le formulaire avec les valeurs saisies. */
  attempt: number;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+\d][\d\s().-]{7,}$/;

export async function sendContactRequest(prev: ContactState, formData: FormData): Promise<ContactState> {
  const attempt = prev.attempt + 1;
  const successMessage =
    "Merci ! Nous revenons vers vous rapidement pour parler de votre événement. Pour une date proche, n'hésitez pas à nous appeler.";

  // Champ piège rempli : robot, on simule un succès sans rien envoyer.
  if (formData.get("website")) return { status: "success", message: successMessage, attempt };

  const values = Object.fromEntries(
    FIELDS.map((f) => [f, String(formData.get(f) ?? "").trim().slice(0, f === "message" ? 4000 : 200)]),
  ) as Record<Field, string>;

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2) errors.name = "Indiquez votre nom.";
  if (!PHONE.test(values.phone)) errors.phone = "Indiquez un numéro de téléphone valide.";
  if (!EMAIL.test(values.email)) errors.email = "Indiquez une adresse e-mail valide, par exemple nom@exemple.fr.";
  if (!values.event) errors.event = "Choisissez le type d'événement.";
  if (values.guests && !(Number(values.guests) > 0)) errors.guests = "Indiquez un nombre d'invités positif.";
  if (values.message.length < 10) errors.message = "Décrivez votre projet en quelques mots.";
  if (values.consent !== "on") errors.consent = "Cochez cette case pour que nous puissions vous répondre.";

  if (Object.keys(errors).length) {
    return { status: "error", message: "Certains champs sont à compléter.", errors, values, attempt };
  }

  const eventLabel = services.find((s) => s.slug === values.event)?.title ?? "Autre";
  const text = [
    `Nom : ${values.name}`,
    `Téléphone : ${values.phone}`,
    `E-mail : ${values.email}`,
    `Événement : ${eventLabel}`,
    `Date : ${values.date || "non précisée"}`,
    `Invités : ${values.guests || "non précisé"}`,
    "",
    values.message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] RESEND_API_KEY absente, demande reçue :\n" + text);
      return { status: "success", message: successMessage, attempt };
    }
    return {
      status: "error",
      message: `L'envoi en ligne est momentanément indisponible. Appelez-nous au ${siteConfig.contact.phoneDisplay} ou écrivez-nous sur WhatsApp.`,
      values,
      attempt,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? `${siteConfig.name} <onboarding@resend.dev>`,
        to: [process.env.CONTACT_TO_EMAIL ?? siteConfig.contact.email],
        reply_to: values.email,
        subject: `Demande de devis : ${eventLabel}, ${values.name}`,
        text,
      }),
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
    return { status: "success", message: successMessage, attempt };
  } catch (error) {
    console.error("[contact]", error);
    return {
      status: "error",
      message: `La demande n'a pas pu être envoyée. Réessayez dans un instant ou appelez-nous au ${siteConfig.contact.phoneDisplay}.`,
      values,
      attempt,
    };
  }
}
