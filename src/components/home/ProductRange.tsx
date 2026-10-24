import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/icons";
import { PriceTag } from "@/components/products/PriceTag";
import { products, type Product } from "@/lib/products";

/**
 * Home page feature: one large piece from each collection. The three are
 * picked by slug so the hero (deer, flower stand, rabbit) and this section
 * show different pieces.
 */
const FEATURED = [
  "golden-leopard-figurine",
  "gold-sunburst-vase",
  "silver-chevron-serving-trays",
];

const featured = FEATURED.map((slug) => products.find((p) => p.slug === slug)).filter(
  (p): p is Product => Boolean(p)
);

function FeatureCard({ product, index }: { product: Product; index: number }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block focus-visible:outline-offset-4"
    >
      {/* The media wipes open when its Reveal parent becomes visible. */}
      <div className="reveal-media relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-lime-soft shadow-soft transition-shadow duration-700 ease-[var(--ease-out-soft)] group-hover:shadow-lift">
        <span className="reveal-media-img absolute inset-0 block">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 90vw"
            className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
          />
        </span>

        {/* Gentle shade from the bottom so the hover pill reads on any photo */}
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/45 via-navy-deep/10 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-100"
        />

        <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-cream-soft/90 font-display text-[0.9375rem] text-navy shadow-soft backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="absolute right-4 top-4 rounded-pill bg-cream-soft/90 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-navy shadow-soft backdrop-blur-sm">
          {product.categoryLabel}
        </span>

        {/* Slides up on hover and focus */}
        <span className="absolute inset-x-4 bottom-4 flex translate-y-3 items-center justify-between gap-3 rounded-pill bg-cream-soft py-2 pl-5 pr-2 text-[0.8125rem] font-semibold text-navy opacity-0 shadow-card transition-[opacity,translate] duration-500 ease-[var(--ease-out-soft)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          View piece
          <span className="grid size-9 place-items-center rounded-full bg-navy text-cream">
            <ArrowRightIcon className="size-4 transition-transform duration-500 group-hover:translate-x-0.5" />
          </span>
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-sans text-[1.0625rem] font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-blue sm:text-[1.1875rem]">
            {product.name}
          </h3>
          <p className="mt-1 text-[0.875rem] text-muted">
            {product.finish} finish
          </p>
        </div>
        <PriceTag price={product.priceLabel} size="sm" tone="dark" className="mt-0.5 shrink-0" />
      </div>
    </Link>
  );
}

export function ProductRange() {
  return (
    <section
      id="range"
      aria-labelledby="range-heading"
      className="pb-[clamp(4rem,9vw,7rem)] pt-[clamp(3.5rem,8vw,6.5rem)]"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <div>
              <Eyebrow>The catalogue</Eyebrow>
              <h2
                id="range-heading"
                className="mt-4 font-display text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] leading-[1.02] tracking-[-0.02em] text-navy"
              >
                Featured pieces
              </h2>
              <p className="mt-4 max-w-[40ch] text-[1rem] leading-relaxed text-muted">
                One piece from each collection.
              </p>
            </div>

            <Link
              href="/products"
              className="group inline-flex shrink-0 items-center gap-3 self-start rounded-pill border border-navy/25 bg-white py-2 pl-5 pr-2 text-[0.875rem] font-semibold text-navy transition-[border-color,box-shadow] duration-300 hover:border-navy hover:shadow-soft sm:self-auto"
            >
              View all {products.length} pieces
              <span className="grid size-9 place-items-center rounded-full bg-navy text-cream transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:rotate-[-45deg]">
                <ArrowRightIcon className="size-4" />
              </span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-[clamp(2.25rem,5vw,4rem)] grid gap-x-[clamp(1.25rem,2.5vw,2.25rem)] gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, index) => (
            <Reveal
              key={product.slug}
              delay={index * 140}
              className={cn(
                "reveal-feature",
                /* Staggered heights read as a composed row, not a grid. */
                index === 1 && "lg:mt-16",
                index === 2 && "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:mt-8 lg:w-auto"
              )}
            >
              <FeatureCard product={product} index={index} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
