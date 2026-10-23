"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { Field, inputClass, selectArrow, selectClass } from "@/components/ui/Field";
import { CheckIcon, CloseIcon } from "@/components/icons";
import { PriceTag } from "@/components/products/PriceTag";
import { WhatsAppSubmitButton } from "@/components/ui/WhatsApp";
import { enquiryLinks } from "@/lib/enquiry";
import { categories, products } from "@/lib/products";
import { site } from "@/lib/site";

const volumes = [
  "1 – 5 pieces",
  "6 – 20 pieces",
  "21 – 50 pieces",
  "More than 50 pieces",
];

const frequencies = ["One-time order", "Repeat order"];

const MESSAGE_ERROR = "Please add a message before sending.";

/** Numbered heading for each part of the quote form. */
function StepHeading({
  id,
  number,
  title,
  note,
  tag,
}: {
  id: string;
  number: number;
  title: string;
  note?: string;
  tag?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden
        className="grid size-7 shrink-0 place-items-center rounded-full bg-navy text-[0.75rem] font-semibold text-cream"
      >
        {number}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 id={id} className="font-sans text-[1rem] font-semibold leading-snug text-navy">
            {title}
          </h2>
          {tag && (
            <span className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted">
              {tag}
            </span>
          )}
        </div>
        {note && <p className="mt-0.5 text-[0.8125rem] text-muted">{note}</p>}
      </div>
    </div>
  );
}

/**
 * Quote form. Only the message is required. Everything else is optional, so a
 * buyer can send a quick request without friction. The request is handed to
 * WhatsApp, and nothing is sent until the visitor confirms in WhatsApp.
 */
export function QuoteForm() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [volume, setVolume] = useState("");
  const [frequency, setFrequency] = useState("");
  const [notes, setNotes] = useState("");
  const [showMessageError, setShowMessageError] = useState(false);

  // Pre-fill from URL ?products=... (e.g. from a product detail page CTA).
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const param = new URLSearchParams(window.location.search).get("products");
      if (!param) return;
      const items = param.split(",").map((s) => s.trim()).filter(Boolean);
      setSelectedProducts((prev) => Array.from(new Set([...prev, ...items])));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleProduct = (productName: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productName)
        ? prev.filter((item) => item !== productName)
        : [...prev, productName]
    );
    setShowMessageError(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDraft = () => {
    /* Only requirement: a message so the enquiry has substance. */
    if (!notes.trim()) {
      setShowMessageError(true);
      return null;
    }
    return enquiryLinks(`Quote request — ${site.name}`, {
      name,
      company,
      email,
      phone,
      city,
      products: selectedProducts.join(", "),
      volume,
      frequency,
      message: notes,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const draft = getDraft();
    if (draft) window.open(draft.whatsapp, "_blank", "noopener,noreferrer");
  };

  const messageError = showMessageError ? MESSAGE_ERROR : undefined;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      {/* ── Step 1: products (optional) ─────────────────────────────── */}
      <section
        aria-labelledby="quote-step-1"
        className="rounded-panel border border-line-soft bg-surface/50 p-4 sm:p-5"
      >
        <StepHeading
          id="quote-step-1"
          number={1}
          title="Choose pieces"
          note="Tap a piece to add it. Tap it again to remove it."
          tag="Optional"
        />

        <div className="mt-5">
          {/* Selected chips: thumbnail and price for catalogue pieces */}
          {selectedProducts.length > 0 ? (
            <div className="mb-4">
              <div className="mb-2.5 flex items-center justify-between gap-3">
                <p className="text-[0.75rem] font-semibold text-navy">
                  {selectedProducts.length} selected
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedProducts([])}
                  className="min-h-8 rounded-md px-1 text-[0.75rem] font-semibold text-muted underline-offset-4 transition-colors duration-300 hover:text-navy hover:underline"
                >
                  Clear all
                </button>
              </div>
              <ul className="flex flex-wrap gap-2 rounded-2xl border border-line-soft bg-white p-3 shadow-soft">
                {selectedProducts.map((pName, idx) => {
                  const matched = products.find((item) => item.name === pName);
                  return (
                    <li
                      key={`selected-${pName}-${idx}`}
                      className="flex max-w-full min-w-0 items-center gap-2 rounded-pill border border-line bg-white py-1 pl-1 pr-1 shadow-soft"
                    >
                      {matched && (
                        <span className={`relative size-8 shrink-0 overflow-hidden rounded-full ${matched.tint}`}>
                          <Image src={matched.image} alt="" fill sizes="32px" className="object-cover" />
                        </span>
                      )}
                      <span className="min-w-0 truncate text-[0.8125rem] font-medium text-navy">
                        {pName}
                      </span>
                      {matched && (
                        <PriceTag price={matched.priceLabel} size="xs" tone="dark" className="shrink-0" />
                      )}
                      <button
                        type="button"
                        onClick={() => toggleProduct(pName)}
                        aria-label={`Remove ${pName}`}
                        className="grid size-7 shrink-0 place-items-center rounded-full text-navy transition-colors duration-300 hover:bg-navy hover:text-cream"
                      >
                        <CloseIcon className="size-3.5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <p className="mb-4 rounded-2xl border border-dashed border-navy/15 bg-white/80 p-3 text-center text-[0.8125rem] text-muted">
              Tap products below to add them to your quote.
            </p>
          )}

          {/* Search */}
          <div className="mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search (e.g. Leopard, Vase, Tray…)"
              aria-label="Search products"
              className={inputClass()}
            />
          </div>

          {/* Category pills */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={`cat-${cat.id}`}
                type="button"
                aria-pressed={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-3 py-1 text-[0.75rem] font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-navy text-white shadow-sm"
                    : "bg-white text-muted hover:bg-line-soft hover:text-navy border border-line-soft"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid max-h-[16rem] gap-2 overflow-y-auto pr-1 no-scrollbar sm:grid-cols-2">
            {filteredProducts.map((product) => {
              const checked = selectedProducts.includes(product.name);
              return (
                <button
                  key={`prod-${product.slug}`}
                  type="button"
                  aria-pressed={checked}
                  onClick={() => toggleProduct(product.name)}
                  className={`flex items-center justify-between gap-3 rounded-2xl border p-2.5 text-left transition-[border-color,background-color,box-shadow] duration-300 ${
                    checked
                      ? "border-navy bg-white shadow-soft ring-1 ring-navy/10"
                      : "border-line-soft bg-white/90 hover:border-navy/30 hover:bg-white"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className={`relative size-10 shrink-0 overflow-hidden rounded-xl ${product.tint}`}>
                      <Image src={product.image} alt="" fill sizes="40px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[0.8125rem] font-medium text-navy">
                        {product.name}
                      </span>
                      <span className="block truncate text-[0.6875rem] text-muted">
                        {product.categoryLabel}
                      </span>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <PriceTag price={product.priceLabel} size="xs" tone="soft" />
                    <span
                      className={`grid size-5 place-items-center rounded-md border transition-colors ${
                        checked ? "border-navy bg-navy text-white" : "border-line bg-surface text-transparent"
                      }`}
                    >
                      <CheckIcon className="size-3" />
                    </span>
                  </span>
                </button>
              );
            })}
            {filteredProducts.length === 0 && (
              <div className="col-span-full py-4 text-center text-[0.8125rem] text-muted">
                No products found matching &ldquo;{searchQuery}&rdquo;.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Step 2: optional details ─────────────────────────────────── */}
      <section aria-labelledby="quote-step-2" className="flex flex-col gap-5">
        <StepHeading
          id="quote-step-2"
          number={2}
          title="Your details"
          note="Share whichever details you want us to have."
          tag="Optional"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="name">
            <input id="name" name="name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass()} placeholder="Your name" />
          </Field>

          <Field label="Business" htmlFor="company">
            <input id="company" name="company" type="text" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass()} placeholder="Business or event name" />
          </Field>

          <Field label="Email" htmlFor="email">
            <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass()} placeholder="you@example.com" />
          </Field>

          <Field label="Phone" htmlFor="phone">
            <input id="phone" name="phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass()} placeholder="Your phone number" />
          </Field>

          <Field label="City" htmlFor="city">
            <input id="city" name="city" type="text" autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass()} placeholder="Your city" />
          </Field>

          <Field label="Quantity" htmlFor="volume">
            <select id="volume" name="volume" value={volume} onChange={(e) => setVolume(e.target.value)} style={selectArrow} className={selectClass()}>
              <option value="">Number of pieces (optional)</option>
              {volumes.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>

          <Field label="Order type" htmlFor="frequency">
            <select id="frequency" name="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} style={selectArrow} className={selectClass()}>
              <option value="">Order type (optional)</option>
              {frequencies.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
        </div>
      </section>

      {/* ── Step 3: message (required) ───────────────────────────────── */}
      <section aria-labelledby="quote-step-3" className="flex flex-col gap-5">
        <StepHeading id="quote-step-3" number={3} title="Your message" />

        <Field
          label="Message"
          htmlFor="notes"
          required
          error={messageError}
          hint="Which pieces, how many, and any questions you have."
        >
          <textarea
            id="notes"
            name="notes"
            rows={4}
            required
            value={notes}
            onChange={(e) => { setNotes(e.target.value); setShowMessageError(false); }}
            aria-invalid={showMessageError || undefined}
            aria-describedby={showMessageError ? "notes-error" : undefined}
            className={`${inputClass(messageError)} resize-y`}
            placeholder="We are interested in 2 Golden Deer Figurines and 1 Gold Sunburst Vase."
          />
        </Field>
      </section>

      {/* ── Actions ──────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 rounded-2xl border border-line-soft bg-lime-mist p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <p className="text-[0.75rem] text-muted sm:max-w-[34ch]">
          Opens WhatsApp with your request filled in. Nothing is sent until you
          press send in WhatsApp.
        </p>
        <WhatsAppSubmitButton
          tone="solid"
          size="lg"
          className="w-full shrink-0 sm:w-auto"
        >
          Send Quote Request on WhatsApp
        </WhatsAppSubmitButton>
      </div>
    </form>
  );
}
