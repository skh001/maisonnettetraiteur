"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { services } from "@/config/content";
import { sendContactRequest, type ContactState } from "@/app/contact/actions";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle", attempt: 0 };

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

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={buttonClasses("gold", "w-full disabled:opacity-60 sm:w-auto")}>
      {pending ? "Envoi en cours…" : "Envoyer ma demande"}
    </button>
  );
}

export function ContactForm() {
  const [state, action] = useActionState(sendContactRequest, initialState);
  const eventRef = useRef<HTMLSelectElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const values = state.values ?? {};
  const errors = state.errors ?? {};

  // Pré-sélection depuis les pages services : /contact?evenement=mariage
  useEffect(() => {
    const preset = new URLSearchParams(window.location.search).get("evenement");
    if (preset && eventRef.current && !values.event && services.some((s) => s.slug === preset)) {
      eventRef.current.value = preset;
    }
  }, [values.event]);

  useEffect(() => {
    if (state.status !== "idle") statusRef.current?.focus();
  }, [state]);

  const describe = (name: keyof NonNullable<ContactState["errors"]>) => ({
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
    <form key={state.attempt} action={action} noValidate className="grid gap-8 sm:grid-cols-2">
      <div
        ref={statusRef}
        tabIndex={-1}
        role="alert"
        className={cn("sm:col-span-2", state.status === "error" ? "border-l-2 border-red-800 pl-4 text-sm text-red-900" : "sr-only")}
      >
        {state.status === "error" ? state.message : ""}
      </div>

      <Field name="name" label="Nom et prénom" error={errors.name}>
        <input id="name" name="name" autoComplete="name" required defaultValue={values.name} className={fieldClass} {...describe("name")} />
      </Field>
      <Field name="phone" label="Téléphone" error={errors.phone}>
        <input id="phone" name="phone" type="tel" autoComplete="tel" required defaultValue={values.phone} className={fieldClass} {...describe("phone")} />
      </Field>
      <Field name="email" label="E-mail" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" required defaultValue={values.email} className={fieldClass} {...describe("email")} />
      </Field>
      <Field name="event" label="Type d'événement" error={errors.event}>
        <select id="event" name="event" ref={eventRef} required defaultValue={values.event ?? ""} className={fieldClass} {...describe("event")}>
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
        <input id="date" name="date" type="date" defaultValue={values.date} className={fieldClass} {...describe("date")} />
      </Field>
      <Field name="guests" label="Nombre d'invités" error={errors.guests}>
        <input id="guests" name="guests" type="number" inputMode="numeric" min={1} defaultValue={values.guests} className={fieldClass} {...describe("guests")} />
      </Field>
      <Field name="message" label="Votre projet" error={errors.message} className="sm:col-span-2">
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          defaultValue={values.message}
          placeholder="Lieu, formule souhaitée (buffet, repas servi, cocktail), animations, contraintes alimentaires…"
          className={cn(fieldClass, "resize-y")}
          {...describe("message")}
        />
      </Field>

      {/* Champ piège anti-spam, invisible pour les humains. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Site web</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-taupe">
          <input
            type="checkbox"
            name="consent"
            required
            defaultChecked={values.consent === "on"}
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
        <SubmitButton />
      </div>
    </form>
  );
}
