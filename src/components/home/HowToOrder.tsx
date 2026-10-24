import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRightIcon, CheckIcon, SearchIcon, WhatsAppIcon } from "@/components/icons";
import { WhatsAppButton } from "@/components/ui/WhatsApp";

/**
 * Dark slab that explains the enquiry flow. Solid black, no gradients.
 * Three text cards at staggered heights carry one step each; the middle
 * step is set in cream so the WhatsApp step stands out. Every step
 * describes what the site already does: no delivery or timing promises.
 */
type Step = {
  title: string;
  body: string;
  detail: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  highlight?: boolean;
};

const steps: Step[] = [
  {
    title: "Choose a piece",
    body: "Browse the catalogue and open the piece you like. Each one has its own page with a photo and its price.",
    detail: "Figurines · Vases & Stands · Serving Trays",
    Icon: SearchIcon,
  },
  {
    title: "Send it on WhatsApp",
    body: "Tap Enquire on WhatsApp on any product page. Your message opens ready to send.",
    detail: "Piece name and catalogue number filled in",
    Icon: WhatsAppIcon,
    highlight: true,
  },
  {
    title: "Confirm your order",
    body: "We reply on WhatsApp to confirm your piece and the next steps.",
    detail: "Prices listed in Indian Rupees (₹)",
    Icon: CheckIcon,
  },
];

const lift = ["", "lg:mt-16", "lg:mt-8"];

export function HowToOrder() {
  return (
    <section
      aria-labelledby="order-heading"
      className="px-[clamp(0.5rem,1.2vw,1rem)] pb-[clamp(3rem,7vw,5.5rem)]"
    >
      <div className="relative overflow-hidden rounded-[clamp(1.5rem,4vw,2.75rem)] bg-night py-[clamp(3.5rem,8vw,7rem)] text-cream">
        <Container>
          {/* ── Header row ─────────────────────────────────────────── */}
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
            <Reveal>
              <Eyebrow tone="mint">How to order</Eyebrow>
              <h2
                id="order-heading"
                className="mt-5 max-w-[14ch] font-display text-[clamp(2.5rem,1.4rem+4.4vw,5.25rem)] leading-[1] tracking-[-0.025em] text-cream"
              >
                Three steps to your piece
              </h2>
            </Reveal>

            <Reveal delay={120} className="lg:pb-2">
              <p className="max-w-[42ch] text-[1.0625rem] leading-relaxed text-cream/80">
                Every enquiry goes through WhatsApp, so you can ask about any
                piece in one message.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <WhatsAppButton tone="onDark" size="lg">
                  Enquire on WhatsApp
                </WhatsAppButton>
                <Link
                  href="/products"
                  className="group inline-flex h-[3.25rem] items-center justify-center gap-2.5 rounded-pill border border-white/40 px-6 text-[0.9375rem] font-semibold text-cream transition-[background-color,border-color] duration-300 hover:border-white hover:bg-white/10"
                >
                  Browse products
                  <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* ── Steps ──────────────────────────────────────────────── */}
          <div className="relative mt-[clamp(3rem,7vw,5.5rem)]">
            {/* Connector line, drawn left to right on reveal (desktop only) */}
            <Reveal className="reveal-feature absolute inset-x-0 top-[38%] hidden lg:block">
              <span aria-hidden className="order-line block h-px w-full bg-cream/20" />
            </Reveal>

            <ol className="relative grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:items-start lg:gap-8">
              {steps.map((step, i) => (
                <Reveal
                  as="li"
                  key={step.title}
                  delay={i * 140}
                  className={cn(
                    lift[i],
                    i === 2 &&
                      "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:w-auto"
                  )}
                >
                  <article
                    className={cn(
                      "group flex h-full min-h-[19rem] flex-col rounded-[1.75rem] border p-[clamp(1.5rem,2.6vw,2.25rem)] transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1.5 lg:min-h-[23rem]",
                      step.highlight
                        ? "border-cream bg-cream text-navy"
                        : "border-white/12 bg-[#1a1a1d] text-cream hover:border-cream/35"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={cn(
                          "font-display text-[clamp(3.5rem,2.6rem+3vw,5.5rem)] leading-[0.9] tracking-[-0.03em]",
                          step.highlight ? "text-navy" : "text-cream"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "grid size-12 shrink-0 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:rotate-[-8deg] group-hover:scale-110",
                          step.highlight ? "bg-navy text-cream" : "bg-cream text-navy"
                        )}
                      >
                        <step.Icon className="size-5" aria-hidden />
                      </span>
                    </div>

                    <div className="mt-auto pt-10">
                      <h3 className={cn("font-sans text-[1.375rem] font-semibold leading-snug sm:text-[1.5rem]", step.highlight ? "text-navy" : "text-cream")}>
                        {step.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-3 text-[1rem] leading-relaxed",
                          step.highlight ? "text-navy/80" : "text-cream/80"
                        )}
                      >
                        {step.body}
                      </p>
                      <p
                        className={cn(
                          "mt-6 border-t pt-4 text-[0.8125rem] font-semibold uppercase tracking-[0.12em]",
                          step.highlight ? "border-navy/15 text-navy/75" : "border-white/12 text-cream/65"
                        )}
                      >
                        {step.detail}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}
