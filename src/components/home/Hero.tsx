import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import { collections, products } from "@/lib/products";
import { site } from "@/lib/site";

/**
 * Home hero. Editorial three-column layout: an upright eyebrow and large serif
 * headline on the left, a framed composition of real catalogue photos in the
 * middle, and a narrow information column on the right, separated by hairlines.
 *
 * The hero shows no prices. Facts used here (collection names and counts) come
 * from `products.ts`; the headline is descriptive copy only.
 */

const at = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const bySlug = (slug: string) => products.find((p) => p.slug === slug) ?? products[0];
const main = bySlug("golden-deer-figurine");
const inset = bySlug("gold-pedestal-flower-stand");
const thumb = bySlug("golden-sitting-rabbit-figurine");


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
          <span aria-hidden className="hero-rule-x absolute inset-x-0 top-0 h-px bg-line" />

          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)_minmax(0,15rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,23rem)_minmax(0,17rem)]">
            {/* ── Left: eyebrow, headline, note ─────────────────────────
                A size container, so the headline scales to this column's
                width and can never run across the divider beside it. */}
            <div className="@container relative z-10 flex flex-col pb-10 pt-[clamp(2.25rem,6vw,4.5rem)] lg:pb-14 lg:pr-10">
              <Fade delay={60}>
                <span className="inline-flex items-center gap-2 rounded-pill border border-navy/30 bg-white/60 px-4 py-1.5 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-navy backdrop-blur-sm sm:text-[0.8125rem]">
                  <span aria-hidden className="size-1.5 rounded-full bg-blue" />
                  Gold &amp; silver décor
                </span>
              </Fade>

              <h1
                id="hero-heading"
                className="mt-[clamp(1.25rem,3vw,2rem)] font-display text-[clamp(2.5rem,15cqw,6rem)] leading-[1] tracking-[-0.025em] text-navy"
              >
                <span className="block">
                  <Word delay={220}>Shine</Word> <Word delay={300}>that</Word>{" "}
                  <Word delay={380}>feels</Word>
                </span>
                <span className="block">
                  <Word delay={480}>like</Word>{" "}
                  <span className="relative inline-block">
                    <Word delay={580}>
                      <span className="text-blue">home.</span>
                    </Word>
                    <span
                      aria-hidden
                      className="hero-underline absolute inset-x-[0.02em] -bottom-[0.02em] h-[0.05em] rounded-full bg-blue"
                      style={at(1000)}
                    />
                  </span>
                </span>
              </h1>

              <Fade delay={850} className="mt-[clamp(2rem,5vw,4rem)] lg:mt-auto lg:pt-14">
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
                      sizes="80px"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-110"
                    />
                  </Link>
                  <span aria-hidden className="hero-rule-y h-14 w-px shrink-0 bg-navy/25" style={at(950)} />
                  <p className="max-w-[26ch] text-[0.9375rem] leading-relaxed text-ink sm:text-[1rem]">
                    Décor pieces in warm gold and bright silver finishes.
                  </p>
                </div>
              </Fade>
            </div>

            {/* ── Centre: composition of catalogue photos ───────────────── */}
            <div className="relative pb-12 lg:px-6 lg:pb-14 lg:pt-[clamp(3rem,7vw,5.5rem)]">
              <span aria-hidden className="hero-rule-y absolute inset-y-0 left-0 hidden w-px bg-line lg:block" style={at(150)} />
              <span aria-hidden className="hero-rule-y absolute inset-y-0 right-0 hidden w-px bg-line lg:block" style={at(250)} />

              <div className="relative mx-auto w-full max-w-[24rem] lg:max-w-none">
                <div
                  className="hero-frame relative aspect-[3/4] w-full overflow-hidden rounded-[1.25rem] bg-lime-soft shadow-card"
                  style={at(320)}
                >
                  <Link
                    href={`/products/${main.slug}`}
                    className="group absolute inset-0 block"
                    aria-label={`View ${main.name}`}
                  >
                    <span className="hero-zoom absolute inset-0 block" style={at(420)}>
                      <Image
                        src={main.image}
                        alt={main.imageAlt}
                        fill
                        priority
                        sizes="(min-width: 1280px) 320px, (min-width: 1024px) 272px, 90vw"
                        className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
                      />
                    </span>
                  </Link>
                </div>

                {/* Inset second piece, kept inside the column so it never
                    crosses a divider. */}
                <Link
                  href={`/products/${inset.slug}`}
                  aria-label={`View ${inset.name}`}
                  className="hero-pop group absolute -bottom-6 right-4 block aspect-[3/4] w-[38%] overflow-hidden rounded-[1rem] border-[5px] border-cream-soft bg-lime-soft shadow-lift"
                  style={at(1050)}
                >
                  <Image
                    src={inset.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 120px, 34vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-110"
                  />
                </Link>

              </div>
            </div>

            {/* ── Right: information column ───────────────────────────── */}
            <div className="grid gap-9 pb-[clamp(2.5rem,6vw,4rem)] sm:grid-cols-2 lg:flex lg:flex-col lg:gap-0 lg:pb-14 lg:pl-7 lg:pt-[clamp(3rem,7vw,5.5rem)]">
              <Fade delay={680} className="lg:pb-8">
                <p className="max-w-[30ch] text-[0.9375rem] leading-relaxed text-ink">
                  Golden figurines, a sunburst vase, a pedestal flower stand
                  and silver serving trays.
                </p>
                <Link
                  href="/products"
                  className="group mt-5 inline-flex items-center gap-2 border-b border-navy pb-0.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-navy"
                >
                  View products
                  <ArrowRightIcon className="size-3.5 -rotate-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Fade>

              <Fade delay={800} className="lg:border-t lg:border-line lg:py-7">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted">
                  Collections
                </p>
                <ul className="mt-3">
                  {collections.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/collections#${c.id}`}
                        className="group flex min-h-11 items-center justify-between gap-4 border-b border-line py-2.5 text-[0.9375rem] font-medium text-navy transition-colors duration-300 hover:text-blue"
                      >
                        <span className="transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-1">
                          {c.label}
                        </span>
                        <ArrowRightIcon className="size-4 -rotate-45 text-blue transition-transform duration-300 group-hover:rotate-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Fade>

              {/* Paired circles: WhatsApp (outline) overlapping Shop (solid) */}
              <Fade delay={920} className="sm:col-span-2 lg:mt-auto lg:pt-8">
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

          <span aria-hidden className="hero-rule-x absolute inset-x-0 bottom-0 h-px bg-line" style={at(200)} />
        </div>
      </Container>
    </section>
  );
}
