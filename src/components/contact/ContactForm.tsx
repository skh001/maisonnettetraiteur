"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { services } from "@/config/content";
import {
  readContactValues,
  submitContact,
  validateContact,
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
  type ContactErrors,
  type ContactField,
} from "@/lib/contact";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: ContactErrors;
};

const SUCCESS_MESSAGE =
  "Merci ! Nous revenons vers vous rapidement pour parler de votre événement. Pour une date proche, n'hésitez pas à nous appeler.";
const ERROR_MESSAGE = "Une erreur est survenue. Veuillez réessayer.";
const INVALID_MESSAGE = "Certains champs sont à compléter.";

const fieldClass =
  "mt-2 block w-full border-0 border-b border-charcoal/20 bg-transparent px-0 py-3 text-base text-charcoal placeholder:text-taupe/60 transition-colors focus:border-gold-deep focus:outline-none focus:ring-0 aria-[invalid=true]:border-red-700";

function Field({
  name,
  label,
  error,
  className,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-sm text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-erreur`} className="mt-2 text-sm text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button type="submit" disabled={pending} className={buttonClasses("gold", "w-full disabled:opacity-60 sm:w-auto")}>
      {pending ? "Envoi en cours…" : "Envoyer ma demande"}
    </button>
  );
}

export function ContactForm() {
  const [state, setState] = useState<ContactState>({ status: "idle" });
  const [pending, setPending] = useState(false);
  const eventRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const errors = state.errors ?? {};

  // Pré-sélection depuis les pages services : /contact?evenement=mariage
  useEffect(() => {
    const preset = new URLSearchParams(window.location.search).get("evenement");
    if (preset && eventRef.current && services.some((s) => s.slug === preset)) {
      eventRef.current.value = preset;
    }
  }, []);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  // Annule un envoi en cours si la page est quittée.
  useEffect(() => () => requestRef.current?.abort(), []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestRef.current) return; // Un envoi est déjà en cours.
    const form = event.currentTarget;
    const data = new FormData(form);

    // Champ piège rempli : robot, on simule un succès sans rien envoyer.
    if (data.get("website") || data.get("botcheck")) {
      form.reset();
      setState({ status: "success", message: SUCCESS_MESSAGE });
      return;
    }

    const values = readContactValues(data);
    const fieldErrors = validateContact(values);
    if (Object.keys(fieldErrors).length) {
      setState({ status: "error", message: INVALID_MESSAGE, errors: fieldErrors });
      return;
    }

    const request = new AbortController();
    requestRef.current = request;
    setPending(true);
    try {
      const sent = await submitContact(values, request.signal);
      if (sent) form.reset();
      setState(sent ? { status: "success", message: SUCCESS_MESSAGE } : { status: "error", message: ERROR_MESSAGE });
    } catch {
      if (!request.signal.aborted) setState({ status: "error", message: ERROR_MESSAGE });
    } finally {
      if (!request.signal.aborted) setPending(false);
      requestRef.current = null;
    }
  }

  const describe = (name: ContactField) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-erreur` : undefined,
  });

  if (state.status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-gold/40 bg-linen/60 p-8 md:p-12">
        <h2 className="font-serif text-4xl font-light text-charcoal">Demande envoyée</h2>
        <p className="mt-4 max-w-md leading-relaxed text-taupe">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={WEB3FORMS_ENDPOINT} method="POST" onSubmit={handleSubmit} noValidate className="grid gap-8 sm:grid-cols-2">
      <div
        ref={statusRef}
        tabIndex={-1}
        role="alert"
        className={cn("sm:col-span-2", state.status === "error" ? "border-l-2 border-red-800 pl-4 text-sm text-red-900" : "sr-only")}
      >
        {state.status === "error" ? state.message : ""}
      </div>

      <Field name="name" label="Nom et prénom" error={errors.name}>
        <input id="name" name="name" autoComplete="name" required className={fieldClass} {...describe("name")} />
      </Field>
      <Field name="phone" label="Téléphone" error={errors.phone}>
        <input id="phone" name="phone" type="tel" autoComplete="tel" required className={fieldClass} {...describe("phone")} />
      </Field>
      <Field name="email" label="E-mail" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" required className={fieldClass} {...describe("email")} />
      </Field>
      <Field name="event" label="Type d'événement" error={errors.event}>
        <select id="event" name="event" ref={eventRef} required defaultValue="" className={fieldClass} {...describe("event")}>
          <option value="" disabled>
            Choisir…
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title}
            </option>
          ))}
          <option value="autre">Autre</option>
        </select>
      </Field>
      <Field name="date" label="Date de l'événement" error={errors.date}>
        <input id="date" name="date" type="date" className={fieldClass} {...describe("date")} />
      </Field>
      <Field name="guests" label="Nombre d'invités" error={errors.guests}>
        <input id="guests" name="guests" type="number" inputMode="numeric" min={1} className={fieldClass} {...describe("guests")} />
      </Field>
      <Field name="message" label="Votre projet" error={errors.message} className="sm:col-span-2">
        <textarea
          id="message"
          name="message"
          rows={5}
          required
         
          placeholder="Lieu, formule souhaitée (buffet, repas servi, cocktail), animations, contraintes alimentaires…"
          className={cn(fieldClass, "resize-y")}
          {...describe("message")}
        />
      </Field>

      {/* Anti-spam, invisible pour les humains : champ piège + case « botcheck » de Web3Forms. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Site web</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        <input type="checkbox" name="botcheck" tabIndex={-1} className="hidden" />
        {/* Envoi sans JavaScript : le navigateur poste directement à Web3Forms. */}
        <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-taupe">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 size-4 shrink-0 accent-gold-deep"
            {...describe("consent")}
          />
          <span>
            J&apos;accepte que mes informations soient utilisées uniquement pour répondre à ma demande. Elles ne sont
            ni cédées ni utilisées à des fins commerciales.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-erreur" className="mt-2 text-sm text-red-800">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="sm:col-span-2">
        <SubmitButton pending={pending} />
      </div>
    </form>
  );
}
