import Link from "next/link";
import { ProductPhoto } from "@/components/products/ProductPhoto";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, CheckIcon, SparkleIcon, WhatsAppIcon } from "@/components/icons";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

/**
 * Trust panel. Editorial, centred layout on a cream slab with faint grid
 * rules. Every trust point is a fact the site already shows: each piece
 * has a printed price in rupees and a catalogue number, the price range
 * comes straight from the price list, and the WhatsApp message is drafted
 * for the visitor before anything is sent. No years, counts or promises.
 */
const byPrice = [...products].sort((a, b) => a.price - b.price);
const lowest = byPrice[0];
const highest = byPrice[byPrice.length - 1];

const left = products.find((p) => p.slug === "golden-sitting-rabbit-figurine") ?? products[0];
const right = products.find((p) => p.slug === "gold-sunburst-vase") ?? products[1];

const checks = [
  "Price shown on every piece",
  "Catalogue number on every piece",
  "Message ready before you send",
];

function Photo({
  product,
  block,
  shift,
  delay,
}: {
  product: (typeof products)[number];
  block: string;
  shift: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className="reveal-feature relative">
      {/* Colour block set behind the photo, offset like a mount */}
      <span aria-hidden className={`absolute inset-0 rounded-[1.5rem] ${block} ${shift}`} />
      <Link
        href={`/products/${product.slug}`}
        className="group relative block"
        aria-label={`${product.name}, ${product.priceLabel}`}
      >
        <span className="reveal-media relative block aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-surface">
          <span className="reveal-media-img absolute inset-0 block">
            <ProductPhoto
              src={product.image}
              alt={product.imageAlt}
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
            />
          </span>
        </span>
      </Link>
    </Reveal>
  );
}

export function TrustPanel() {
  return (
    <section
      aria-labelledby="trust-heading"
      className="px-[clamp(0.5rem,1.2vw,1rem)] pb-[clamp(3rem,7vw,5.5rem)]"
    >
      <div className="relative isolate overflow-hidden rounded-[clamp(1.5rem,4vw,2.75rem)] border border-navy/[0.06] bg-cream py-[clamp(3.5rem,8vw,6.5rem)]">
        {/* Faint editorial grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute inset-x-0 top-[clamp(1.75rem,3.5vw,2.75rem)] h-px bg-navy/[0.07]" />
          <span className="absolute inset-x-0 bottom-[clamp(1.75rem,3.5vw,2.75rem)] h-px bg-navy/[0.07]" />
        </div>

        <Container>
          <div className="grid grid-cols-2 items-start gap-x-4 gap-y-12 sm:gap-x-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-10">
            {/* ── Heading ─────────────────────────────────────────── */}
            <Reveal className="col-span-2 text-center lg:col-span-3">
              <span className="inline-flex items-center rounded-pill border border-navy/70 px-4 py-1.5 text-[0.8125rem] font-semibold text-navy">
                Priced in the open
              </span>
              <h2
                id="trust-heading"
                className="mx-auto mt-6 max-w-[17ch] font-display text-[clamp(2.375rem,1.3rem+3.6vw,4.5rem)] leading-[1.02] tracking-[-0.025em] text-navy"
              >
                Pieces that shine, prices in plain sight
              </h2>
            </Reveal>

            {/* ── Centre column ───────────────────────────────────── */}
            <div className="col-span-2 flex flex-col items-center text-center lg:col-span-1 lg:col-start-2 lg:row-start-2">
              <Reveal delay={100} className="flex items-center">
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Enquire on WhatsApp"
                  className="grid size-[5rem] place-items-center rounded-full border border-navy/70 bg-cream-soft text-navy transition-colors duration-300 hover:bg-white sm:size-[5.5rem]"
                >
                  <WhatsAppIcon className="size-6" aria-hidden />
                </a>
                <Link
                  href="/products"
                  className="-ml-3 grid size-[5rem] place-items-center rounded-full bg-navy text-center text-[0.75rem] font-semibold uppercase leading-[1.25] tracking-[0.1em] text-cream shadow-btn transition-[transform,background-color] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:bg-navy-deep sm:size-[5.5rem]"
                >
                  <span>
                    See
                    <br />
                    prices
                  </span>
                </Link>
              </Reveal>

              {/* Price range, drawn in place of a founding-year line */}
              <Reveal delay={180} className="mt-10 w-full max-w-[26rem]">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-blue">
                  Price range
                </p>
                <div className="mt-3 flex items-center gap-4">
                  <span className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-none text-blue">
                    {lowest.priceLabel}
                  </span>
                  <span
                    aria-hidden
                    className="order-line h-px flex-1 bg-navy/40"
                    style={{ transformOrigin: "50% 50%" }}
                  />
                  <span className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-none text-blue">
                    {highest.priceLabel}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <p className="mx-auto mt-8 max-w-[40ch] text-[1rem] leading-relaxed text-ink sm:text-[1.0625rem]">
                  Every piece is listed with its price in Indian Rupees and its
                  own catalogue number, so you know exactly what you are asking
                  about before you send a message.
                </p>
                <ul className="mx-auto mt-7 flex w-fit flex-col items-start gap-3 text-left">
                  {checks.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[0.875rem] font-medium text-navy">
                      <span className="grid size-5 place-items-center rounded-full bg-navy text-cream">
                        <CheckIcon className="size-3" aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* ── Left: photo + direct enquiry note ───────────────── */}
            <div className="lg:col-start-1 lg:row-start-2">
              <Photo
                product={left}
                block="bg-blue"
                shift="-translate-x-2 translate-y-2 sm:-translate-x-3 sm:translate-y-3"
                delay={120}
              />
              <Reveal delay={260} className="mt-7 flex items-center gap-4">
                <div>
                  <p className="text-[1.125rem] font-semibold leading-tight text-navy">Gold &amp; Silver</p>
                  <p className="mt-1 text-[0.875rem] leading-snug text-muted">
                    Finishes across
                    <br className="hidden sm:inline" /> the range
                  </p>
                </div>
                <span
                  aria-hidden
                  className="hidden size-12 shrink-0 place-items-center rounded-[0.875rem] border border-navy/20 bg-white text-blue sm:grid"
                >
                  <SparkleIcon className="size-5" />
                </span>
              </Reveal>
            </div>

            {/* ── Right: collections link + photo ─────────────────── */}
            <div className="mt-10 lg:col-start-3 lg:row-start-2 lg:mt-0">
              <Reveal delay={160}>
                <Link
                  href="/collections"
                  className="group mb-7 flex items-center gap-3 lg:justify-end"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-navy/60 text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-cream">
                    <ArrowRightIcon className="size-4" aria-hidden />
                  </span>
                  <span className="text-[0.875rem] font-semibold leading-snug text-navy underline decoration-navy/40 underline-offset-4 group-hover:decoration-navy sm:text-[0.9375rem]">
                    Discover
                    <br />
                    our collections
                  </span>
                </Link>
              </Reveal>
              <Photo
                product={right}
                block="bg-lime-soft"
                shift="translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3"
                delay={220}
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
