import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteCta } from "@/components/home/QuoteCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { categories, products } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `About ${site.name} — Gold & Silver Home Décor`,
  description: `${site.name} offers gold and silver décor pieces, including figurines, vases, flower stands and serving trays. Every piece is listed with its price in Indian Rupees.`,
  path: "/about",
  keywords: ["about Indian Invention Boy", "gold home decor collection India"],
});

const steps = [
  {
    title: "Choose a piece",
    body: "Browse the collection and open the product you like. Each page shows its price and catalogue number.",
  },
  {
    title: "Send an enquiry",
    body: "Send the piece name or catalogue number on WhatsApp.",
  },
  {
    title: "Continue on WhatsApp",
    body: "Your message opens in WhatsApp. Nothing is sent until you press send.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={site.name}
        title="About Indian Invention Boy"
        description="Indian Invention Boy brings together gold and silver décor pieces for the home. Every price is listed in Indian Rupees, and enquiries are handled on WhatsApp."
        crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      />

      {/* Collections, counted from the price list */}
      <section className="py-[clamp(2.5rem,6vw,4.5rem)]">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The collection"
              title={<span>{products.length} pieces in three collections</span>}
              description="Figurines, vases and stands, and serving trays, in gold and silver finishes."
            />
          </Reveal>

          <div className="mt-[clamp(1.75rem,3.5vw,2.5rem)] grid gap-5 sm:grid-cols-3">
            {categories
              .filter((category) => category.id !== "all")
              .map((category, index) => {
                const items = products.filter((p) => p.category === category.id);
                return (
                  <Reveal key={category.id} delay={index * 80}>
                    <div className="h-full rounded-card border border-line-soft bg-white p-[clamp(1.25rem,2.5vw,1.75rem)] shadow-soft">
                      <h2 className="font-sans text-[1.0625rem] font-semibold text-navy">
                        {category.label}
                      </h2>
                      <p className="mt-1 text-[0.8125rem] text-muted-soft">
                        {items.length} {items.length === 1 ? "piece" : "pieces"}
                      </p>
                      <ul className="mt-4 space-y-2.5">
                        {items.map((item) => (
                          <li key={item.slug} className="flex justify-between gap-4 text-[0.9375rem] text-muted">
                            <span>{item.name}</span>
                            <span className="shrink-0 font-medium text-navy">{item.priceLabel}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
          </div>
        </Container>
      </section>

      {/* How ordering works */}
      <section className="pb-[clamp(2.5rem,6vw,4.5rem)]">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How to order" title={<span>Three simple steps</span>} />
          </Reveal>

          <ol className="mt-[clamp(1.75rem,3.5vw,2.5rem)] grid gap-5 sm:grid-cols-3">
            {steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 80} as="li">
                <div className="h-full rounded-card bg-surface p-[clamp(1.25rem,2.5vw,1.75rem)]">
                  <span className="grid size-9 place-items-center rounded-full bg-lime-soft text-[0.875rem] font-semibold text-navy">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-sans text-[1rem] font-semibold text-navy">{step.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <QuoteCta />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />
    </>
  );
}
