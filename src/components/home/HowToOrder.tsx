import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/icons";
import { WhatsAppButton } from "@/components/ui/WhatsApp";
import { products } from "@/lib/products";

/**
 * Dark slab that explains the enquiry flow. Three tall photo cards, set at
 * staggered heights, each carry one step. A line draws across behind the
 * step numbers as the row scrolls into view. Every step describes what the
 * site already does; there are no delivery or timing promises.
 */
const steps = [
  {
    slug: "golden-sitting-rabbit-figurine",
    title: "Choose a piece",
    body: "Browse the catalogue and open the piece you like. Each one has its own page with a photo and its price.",
  },
  {
    slug: "gold-sunburst-vase",
    title: "Send it on WhatsApp",
    body: "Tap Enquire on WhatsApp. The piece name and catalogue number are filled in for you.",
  },
  {
    slug: "golden-deer-figurine",
    title: "Confirm your order",
    body: "We reply on WhatsApp to confirm your piece and the next steps.",
  },
].map((s) => ({ ...s, product: products.find((p) => p.slug === s.slug) ?? products[0] }));

const lift = ["", "lg:mt-20", "lg:mt-10"];

export function HowToOrder() {
  return (
    <section
      aria-labelledby="order-heading"
      className="px-[clamp(0.5rem,1.2vw,1rem)] pb-[clamp(3rem,7vw,5.5rem)]"
    >
      <div className="relative isolate overflow-hidden rounded-[clamp(1.5rem,4vw,2.75rem)] bg-night py-[clamp(3.5rem,8vw,7rem)] text-cream">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 50% at 15% 0%, rgb(138 90 60 / .35) 0%, transparent 70%), radial-gradient(45% 50% at 100% 100%, rgb(229 211 194 / .1) 0%, transparent 70%)",
          }}
        />

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
          <Reveal className="reveal-feature relative mt-[clamp(3rem,7vw,5.5rem)]">
            {/* Connector line, drawn left to right on reveal (desktop only) */}
            <span
              aria-hidden
              className="order-line absolute inset-x-[8%] top-[42%] hidden h-px bg-gradient-to-r from-transparent via-cream/35 to-transparent lg:block"
            />

            {/* Mobile: swipe row with a peek of the next card. sm+: grid. */}
            <ol className="relative -mx-[clamp(1.125rem,4vw,2.75rem)] flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[clamp(1.125rem,4vw,2.75rem)] px-[clamp(1.125rem,4vw,2.75rem)] pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-12 sm:gap-x-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:gap-x-8 [&::-webkit-scrollbar]:hidden">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className={cn(
                    "group w-[82%] shrink-0 snap-start sm:w-auto",
                    lift[i],
                    i === 2 && "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:w-auto"
                  )}
                >
                  <div
                    className="reveal-media relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-white/5 shadow-lift"
                    style={{ "--d": `${i * 180}ms` } as React.CSSProperties}
                  >
                    <span className="reveal-media-img absolute inset-0 block">
                      <Image
                        src={step.product.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 90vw"
                        className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
                      />
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent"
                    />

                    <span className="absolute left-5 top-5 grid size-14 place-items-center rounded-full bg-cream font-display text-[1.5rem] text-navy shadow-card transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-110 sm:size-16 sm:text-[1.75rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-[clamp(1.25rem,2.5vw,1.75rem)]">
                      <h3 className="font-sans text-[1.25rem] font-semibold leading-snug text-cream sm:text-[1.375rem]">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-cream/85 sm:text-[1rem]">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
