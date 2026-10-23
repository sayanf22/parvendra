"use client";

import { useRef, type FormEvent } from "react";
import { Field, inputClass } from "@/components/ui/Field";
import { WhatsAppIcon } from "@/components/icons";
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
    <form ref={formRef} onSubmit={openWhatsApp} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className={inputClass()}
            placeholder="Your name"
          />
        </Field>

        <Field label="Business (optional)" htmlFor="company">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClass()}
            placeholder="Business or event name"
          />
        </Field>

        <Field label="Email (optional)" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass()}
            placeholder="you@example.com"
          />
        </Field>

        <Field label="Phone (optional)" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass()}
            placeholder="+91 00000 00000"
          />
        </Field>
      </div>

      <Field
        label="Your message"
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
          placeholder="I would like to know the availability of the Golden Leopard Figurine."
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex h-[3.25rem] w-full items-center justify-center gap-2.5 rounded-pill bg-[#25d366] px-6 text-[0.9375rem] font-semibold text-white shadow-[0_4px_16px_rgba(37,211,102,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#20bd5a] sm:w-auto"
        >
          <WhatsAppIcon className="size-5" />
          Send Enquiry on WhatsApp
        </button>
      </div>

      <p className="text-[0.75rem] text-muted-soft">
        Opens WhatsApp with your enquiry filled in. Nothing is sent until you
        press send in WhatsApp.
      </p>
    </form>
  );
}
