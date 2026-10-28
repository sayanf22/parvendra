import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { ArrowRightIcon } from "@/components/icons";
import { PriceTag } from "@/components/products/PriceTag";
import { ProductPhoto } from "@/components/products/ProductPhoto";
import { WhatsAppButton } from "@/components/ui/WhatsApp";
import { QuoteCta } from "@/components/home/QuoteCta";
import { FaqSection, supplyFaqs } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { collections } from "@/lib/products";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `Collections: Figurines, Vases & Stands, Serving Trays`,
  description: `Browse the ${site.name} collections: golden figurines, gold vases and flower stands, and silver serving trays. Each piece is listed with its price in Indian Rupees.`,
  path: "/collections",
  keywords: [
    "gold figurines collection",
    "gold vase and flower stand",
    "silver serving trays",
  ],
});

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Collections"
        title="Browse by collection"
        description="Golden figurines, gold vases and flower stands, and silver serving trays. Open any piece to see it on its own page."
        crumbs={[{ label: "Home", href: "/" }, { label: "Collections" }]}
      >
        <nav aria-label="Jump to a collection">
          <ul className="flex flex-wrap gap-2">
            {collections.map((c) => (
              <li key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-navy/25 bg-white px-5 text-[0.9375rem] font-medium text-navy transition-colors duration-300 hover:border-navy hover:bg-cream-soft"
                >
                  {c.label}
                  <ArrowRightIcon className="size-4 rotate-90" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {collections.map((collection, ci) => {
        const [lead, ...rest] = collection.items;
        const flip = ci % 2 === 1;

        return (
          <section
            key={collection.id}
            id={collection.id}
            aria-labelledby={`${collection.id}-heading`}
            className={cn(
              "scroll-mt-[6rem] py-[clamp(3.5rem,8vw,6.5rem)] lg:scroll-mt-[7.5rem]",
              ci > 0 && "border-t border-line-soft"
            )}
          >
            <Container>
              <div
                className={cn(
                  "grid items-center gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-2",
                  flip && "lg:[&>*:first-child]:order-2"
                )}
              >
                {/* ── Photos ───────────────────────────────────────── */}
                <div className="relative">
                  {lead && (
                    <Reveal className="reveal-feature">
                      <Link
                        href={`/products/${lead.slug}`}
                        aria-label={`View ${lead.name}`}
                        className="group reveal-media relative block aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-lime-soft shadow-card"
                      >
                        <span className="reveal-media-img absolute inset-0 block">
                          <ProductPhoto
                            src={lead.image}
                            alt={lead.imageAlt}
                            priority={ci === 0}
                            sizes="(min-width: 1024px) 40vw, 92vw"
                            className="transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                          />
                        </span>
                        <span className="absolute left-5 top-5 rounded-pill bg-cream-soft px-4 py-1.5 font-display text-[1rem] text-navy shadow-soft">
                          {String(ci + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </Reveal>
                  )}

                  {rest.length > 0 && (
                    <div
                      className={cn(
                        "mt-4 grid gap-4",
                        rest.length === 1 ? "grid-cols-1 sm:w-1/2" : "grid-cols-2"
                      )}
                    >
                      {rest.map((p, i) => (
                        <Reveal key={p.slug} delay={120 + i * 120} className="reveal-zoom">
                          <Link
                            href={`/products/${p.slug}`}
                            aria-label={`View ${p.name}`}
                            className="group relative block aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-lime-soft shadow-soft"
                          >
                            <ProductPhoto
                              src={p.image}
                              alt=""
                              sizes="(min-width: 1024px) 20vw, 46vw"
                              className="transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
                            />
                          </Link>
                        </Reveal>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── Text and list ────────────────────────────────── */}
                <div>
                  <Reveal className="reveal-slide">
                    <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-blue">
                      Collection {String(ci + 1).padStart(2, "0")}
                    </p>
                    <h2
                      id={`${collection.id}-heading`}
                      className="mt-4 font-display text-[clamp(2.25rem,1.5rem+3vw,4rem)] leading-[1.04] tracking-[-0.02em] text-navy"
                    >
                      {collection.label}
                    </h2>
                    <p className="mt-5 max-w-[42ch] text-[1.0625rem] leading-relaxed text-ink">
                      {collection.summary}
                    </p>
                  </Reveal>

                  <ul className="mt-8 border-t border-line">
                    {collection.items.map((p, i) => (
                      <Reveal key={p.slug} as="li" delay={100 + i * 90} className="reveal-slide">
                        <Link
                          href={`/products/${p.slug}`}
                          className="group flex items-center gap-4 border-b border-line py-4 transition-colors duration-300 hover:bg-cream-soft sm:gap-5 sm:px-2"
                        >
                          <span className="relative size-16 shrink-0 overflow-hidden rounded-[0.875rem] bg-lime-soft sm:size-[4.5rem]">
                            <Image src={p.image} alt="" fill sizes="72px" className="object-cover" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-sans text-[1rem] font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-blue sm:text-[1.0625rem]">
                              {p.name}
                            </span>
                            <span className="mt-1 block text-[0.875rem] text-muted">
                              {p.finish} finish
                            </span>
                          </span>
                          <PriceTag price={p.priceLabel} size="sm" tone="dark" className="shrink-0" />
                          <ArrowRightIcon className="hidden size-4 shrink-0 text-navy transition-transform duration-300 group-hover:translate-x-1 sm:block" />
                        </Link>
                      </Reveal>
                    ))}
                  </ul>

                  <Reveal delay={260} className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/products?category=${collection.id}#range`}
                      className="group inline-flex min-h-12 items-center gap-3 rounded-pill bg-navy py-1.5 pl-6 pr-1.5 text-[0.9375rem] font-semibold text-cream shadow-btn transition-colors duration-300 hover:bg-navy-deep"
                    >
                      View in catalogue
                      <span className="grid size-9 place-items-center rounded-full bg-cream text-navy transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-rotate-45">
                        <ArrowRightIcon className="size-4" />
                      </span>
                    </Link>
                    <WhatsAppButton tone="outline" size="lg">
                      Ask on WhatsApp
                    </WhatsAppButton>
                  </Reveal>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      <div className="border-t border-line-soft">
        <FaqSection items={supplyFaqs} />
      </div>

      <QuoteCta />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Collections", path: "/collections" },
          ]),
          faqSchema(supplyFaqs),
        ]}
      />
    </>
  );
}
