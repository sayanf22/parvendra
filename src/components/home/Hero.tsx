import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { PriceTag } from "@/components/products/PriceTag";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

/**
 * Home hero. Editorial three-column layout: a script eyebrow and large serif
 * headline on the left, a tall framed piece in the middle, and a narrow
 * information column on the right, separated by hairline rules.
 *
 * Every fact shown here comes from the catalogue (`products.ts`): piece names,
 * prices, collection count. The headline and eyebrow are descriptive copy only.
 */

const at = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const featured = products.find((p) => p.slug === "golden-deer-figurine") ?? products[0];
const thumb = products.find((p) => p.slug === "golden-sitting-rabbit-figurine") ?? products[1];
const lowest = products.reduce((min, p) => (p.price < min.price ? p : min), products[0]);
const collectionCount = new Set(products.map((p) => p.category)).size;

/** One headline word, revealed by sliding up out of a clipping mask. */
function Word({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="hero-word">
      <span className="hero-word-inner" style={at(delay)}>
        {children}
      </span>
    </span>
  );
}

function Fade({
  delay,
  className,
  children,
}: {
  delay: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("hero-item", className)} style={at(delay)}>
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-cream-soft"
    >
      <div aria-hidden className="hero-wash absolute inset-0 -z-10 opacity-70" />

      <Container>
        <div className="relative">
          {/* Top hairline */}
          <span aria-hidden className="hero-rule-x absolute inset-x-0 top-0 h-px bg-line" />

          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)_minmax(0,15rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,23rem)_minmax(0,17rem)]">
            {/* ── Left: eyebrow, headline, note ───────────────────────── */}
            <div className="relative z-10 flex flex-col pb-10 pt-[clamp(2.25rem,6vw,4.5rem)] lg:pb-14 lg:pr-8">
              {/* Padding gives the script's overhanging strokes room inside the
                  clip-path wipe; the negative margin keeps the alignment. */}
              <p
                className="hero-write -mx-[0.3em] -my-[0.2em] self-start px-[0.3em] py-[0.2em] font-script text-[clamp(2.25rem,1.6rem+2.2vw,3.5rem)] leading-none text-navy"
                style={at(80)}
              >
                Golden accents
              </p>

              <h1
                id="hero-heading"
                className="mt-[clamp(0.75rem,2vw,1.5rem)] font-display text-[clamp(2.6rem,0.6rem+5.4vw,6rem)] leading-[0.98] tracking-[-0.025em] text-navy [text-wrap:normal] lg:w-max"
              >
                <span className="block">
                  <Word delay={260}>Shine</Word> <Word delay={340}>that</Word>{" "}
                  <Word delay={420}>feels</Word>
                </span>
                <span className="block">
                  <Word delay={520}>like</Word>{" "}
                  <span className="relative inline-block">
                    <Word delay={620}>
                      <span className="text-blue">home.</span>
                    </Word>
                    <span
                      aria-hidden
                      className="hero-underline absolute inset-x-[0.02em] -bottom-[0.04em] h-[0.055em] rounded-full bg-blue"
                      style={at(1050)}
                    />
                  </span>
                </span>
              </h1>

              <Fade delay={900} className="mt-[clamp(2rem,5vw,4.5rem)] lg:mt-auto lg:pt-14">
                <div className="flex items-center gap-5">
                  <Link
                    href={`/products/${thumb.slug}`}
                    className="group relative block aspect-[3/4] w-[4.25rem] shrink-0 overflow-hidden rounded-[0.75rem] bg-lime-soft shadow-soft sm:w-[5rem]"
                    aria-label={`View ${thumb.name}`}
                  >
                    <Image
                      src={thumb.image}
                      alt=""
                      fill
                      sizes="88px"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-110"
                    />
                  </Link>
                  <span aria-hidden className="hero-rule-y h-14 w-px shrink-0 bg-navy/25" style={at(1000)} />
                  <p className="max-w-[24ch] text-[0.9375rem] leading-relaxed text-ink sm:text-[1rem]">
                    Figurines, vases and serving trays in gold and silver finishes.
                  </p>
                </div>
              </Fade>
            </div>

            {/* ── Centre: framed featured piece ───────────────────────── */}
            <div className="relative pb-10 lg:px-5 lg:pb-14 lg:pt-[clamp(3rem,7vw,5.5rem)] xl:px-6">
              <span aria-hidden className="hero-rule-y absolute inset-y-0 left-0 hidden w-px bg-line lg:block" style={at(150)} />
              <span aria-hidden className="hero-rule-y absolute inset-y-0 right-0 hidden w-px bg-line lg:block" style={at(250)} />

              <div
                className="hero-frame relative mx-auto aspect-[3/4] w-full max-w-[24rem] overflow-hidden rounded-[1.25rem] bg-lime-soft shadow-card lg:max-w-none"
                style={at(350)}
              >
                <Link
                  href={`/products/${featured.slug}`}
                  className="group absolute inset-0 block"
                  aria-label={`View ${featured.name}, ${featured.priceLabel}`}
                >
                  <span className="hero-zoom absolute inset-0 block" style={at(450)}>
                    <Image
                      src={featured.image}
                      alt={featured.imageAlt}
                      fill
                      priority
                      sizes="(min-width: 1280px) 340px, (min-width: 1024px) 290px, 90vw"
                      className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
                    />
                  </span>
                  {/* Darken the lower edge slightly so the caption pill always reads */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep/35 to-transparent"
                  />
                </Link>

                <span
                  aria-hidden
                  className="hero-pop absolute left-4 top-4 rounded-pill bg-cream-soft/90 px-3 py-1 font-display text-[0.875rem] tracking-[0.02em] text-navy shadow-soft backdrop-blur-sm"
                  style={at(1050)}
                >
                  No. {String(featured.ref).padStart(2, "0")}
                </span>

                <div
                  className="hero-pop pointer-events-none absolute bottom-4 left-1/2 flex w-max max-w-[90%] -translate-x-1/2 items-center gap-2.5 rounded-pill bg-white/92 py-1.5 pl-4 pr-1.5 shadow-soft backdrop-blur-sm"
                  style={at(1150)}
                >
                  <span className="truncate text-[0.75rem] font-medium text-navy sm:text-[0.8125rem]">
                    {featured.name}
                  </span>
                  <PriceTag price={featured.priceLabel} size="xs" />
                </div>
              </div>
            </div>

            {/* ── Right: information column ───────────────────────────── */}
            <div className="grid gap-8 pb-[clamp(2.5rem,6vw,4rem)] sm:grid-cols-2 lg:flex lg:flex-col lg:gap-0 lg:pb-14 lg:pl-7 lg:pt-[clamp(3rem,7vw,5.5rem)]">
              <Fade delay={700} className="lg:pb-8">
                <p className="max-w-[30ch] text-[0.9375rem] leading-relaxed text-ink">
                  {products.length} pieces across {collectionCount} collections,
                  each listed with its price and catalogue number.
                </p>
                <Link
                  href="/products"
                  className="group mt-5 inline-flex items-center gap-2 border-b border-navy pb-0.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-navy"
                >
                  View products
                  <ArrowRightIcon className="size-3.5 -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Fade>

              <Fade delay={820} className="lg:border-t lg:border-line lg:py-8">
                <p className="text-[1rem] font-semibold text-navy">Prices from</p>
                <p className="mt-1.5 flex items-baseline gap-2.5">
                  <span className="font-display text-[2.75rem] leading-none tracking-[-0.02em] text-blue">
                    {lowest.priceLabel}
                  </span>
                </p>
                <p className="mt-1.5 text-[0.875rem] text-muted">
                  {lowest.name}
                </p>
              </Fade>

              {/* Paired circles: WhatsApp (outline) overlapping Shop (solid) */}
              <Fade delay={950} className="sm:col-span-2 lg:mt-auto lg:border-t lg:border-line lg:pt-8">
                <div className="flex items-center">
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="hero-pop group grid size-[5.75rem] shrink-0 place-items-center rounded-full border border-navy/70 bg-cream-soft text-navy transition-colors duration-300 hover:bg-white xl:size-[6.5rem]"
                    style={at(1050)}
                  >
                    <WhatsAppIcon className="size-6 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:rotate-[-12deg] group-hover:scale-110" />
                  </a>
                  <Link
                    href="/products"
                    className="hero-pop group relative -ml-4 grid size-[5.75rem] shrink-0 place-items-center rounded-full bg-navy text-center text-[0.75rem] font-semibold uppercase leading-[1.25] tracking-[0.1em] text-cream shadow-btn transition-[transform,background-color] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:bg-navy-deep xl:size-[6.5rem]"
                    style={at(1180)}
                  >
                    <span>
                      Let&rsquo;s
                      <br />
                      shop
                    </span>
                  </Link>
                </div>
              </Fade>
            </div>
          </div>

          {/* Bottom hairline */}
          <span aria-hidden className="hero-rule-x absolute inset-x-0 bottom-0 h-px bg-line" style={at(200)} />
        </div>
      </Container>
    </section>
  );
}
