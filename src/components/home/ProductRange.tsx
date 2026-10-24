import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/icons";
import { FeaturedCarousel } from "@/components/products/FeaturedCarousel";
import { products, type Product } from "@/lib/products";

/**
 * Home page feature. Three large cards are visible on desktop and the
 * carousel advances one piece at a time through the catalogue, looping.
 * The order alternates collections so neighbouring cards differ.
 */
const ORDER = [
  "golden-leopard-figurine",
  "gold-sunburst-vase",
  "silver-chevron-serving-trays",
  "golden-deer-figurine",
  "gold-pedestal-flower-stand",
  "golden-sitting-rabbit-figurine",
];

const ordered = ORDER.map((slug) => products.find((p) => p.slug === slug)).filter(
  (p): p is Product => Boolean(p)
);

export function ProductRange() {
  return (
    <section
      id="range"
      aria-labelledby="range-heading"
      className="overflow-hidden pb-[clamp(4rem,9vw,7rem)] pt-[clamp(3.5rem,8vw,6.5rem)]"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <div>
              <Eyebrow>The catalogue</Eyebrow>
              <h2
                id="range-heading"
                className="mt-4 font-display text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] leading-[1.04] tracking-[-0.02em] text-navy"
              >
                Featured pieces
              </h2>
              <p className="mt-4 max-w-[40ch] text-[1rem] leading-relaxed text-muted sm:text-[1.0625rem]">
                Golden figurines, vases and silver serving trays, each with its
                own product page.
              </p>
            </div>

            <Link
              href="/products"
              className="group inline-flex min-h-12 shrink-0 items-center gap-3 self-start rounded-pill border border-navy/25 bg-white py-1.5 pl-5 pr-1.5 text-[0.9375rem] font-semibold text-navy transition-[border-color,box-shadow] duration-300 hover:border-navy hover:shadow-soft sm:self-auto"
            >
              View all pieces
              <span className="grid size-9 place-items-center rounded-full bg-navy text-cream transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-rotate-45">
                <ArrowRightIcon className="size-4" />
              </span>
            </Link>
          </div>
        </Reveal>

        <Reveal className="reveal-feature mt-[clamp(2.25rem,5vw,3.5rem)]">
          <FeaturedCarousel products={ordered} />
        </Reveal>
      </Container>
    </section>
  );
}
