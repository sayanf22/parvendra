"use client";

import { useRef, type FormEvent } from "react";
import { Field, inputClass } from "@/components/ui/Field";
import { WhatsAppSubmitButton } from "@/components/ui/WhatsApp";
import { enquiryLinks } from "@/lib/enquiry";
import { site } from "@/lib/site";

function valuesFrom(form: HTMLFormElement) {
  const values: Record<string, string> = {};
  for (const [key, value] of new FormData(form)) {
    if (typeof value === "string") values[key] = value;
  }
  return values;
}

/**
 * Enquiry form. Only the message is required. The enquiry is handed to WhatsApp
 * with the details pre-filled, and nothing is sent until the visitor confirms
 * in WhatsApp.
 */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const openWhatsApp = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const message = form.querySelector<HTMLTextAreaElement>("#message");
    if (!message || !message.value.trim()) {
      message?.focus();
      return;
    }

    const draft = enquiryLinks(`Enquiry via ${site.name} website`, valuesFrom(form));
    window.open(draft.whatsapp, "_blank", "noopener,noreferrer");
  };

  return (
    <form ref={formRef} onSubmit={openWhatsApp} className="flex flex-col gap-7">
      <section aria-labelledby="contact-details" className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-3">
          <h3
            id="contact-details"
            className="font-sans text-eyebrow font-semibold uppercase text-blue"
          >
            Your details
          </h3>
          <span className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted">
            Optional
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="name">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className={inputClass()}
              placeholder="Your name"
            />
          </Field>

          <Field label="Business" htmlFor="company">
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              className={inputClass()}
              placeholder="Business or event name"
            />
          </Field>

          <Field label="Email" htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={inputClass()}
              placeholder="you@example.com"
            />
          </Field>

          <Field label="Phone" htmlFor="phone">
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass()}
              placeholder="Your phone number"
            />
          </Field>
        </div>
      </section>

      <Field
        label="Message"
        htmlFor="message"
        required
        hint="Which pieces you are interested in, and any questions you have."
      >
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={`${inputClass()} resize-y`}
          placeholder="I would like to enquire about the Golden Leopard Figurine (catalogue no. 1)."
        />
      </Field>

      <div className="flex flex-col gap-4 rounded-2xl border border-line-soft bg-lime-mist p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <p className="text-[0.75rem] text-muted sm:max-w-[34ch]">
          Opens WhatsApp with your enquiry filled in. Nothing is sent until you
          press send in WhatsApp.
        </p>
        <WhatsAppSubmitButton
          tone="solid"
          size="lg"
          className="w-full shrink-0 sm:w-auto"
        >
          Send Enquiry on WhatsApp
        </WhatsAppSubmitButton>
      </div>
    </form>
  );
}
