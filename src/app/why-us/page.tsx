import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ButtonLink } from "@/components/ui/Button";
import { QuoteCta } from "@/components/home/QuoteCta";
import { differenceFeatures } from "@/lib/features";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection, supplyFaqs } from "@/components/seo/FaqSection";
import { breadcrumbSchema, faqSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `Why Choose ${site.name}: Clear Prices and Simple Enquiries`,
  description: `Every ${site.name} piece is listed with its price in Indian Rupees and a catalogue number. Enquire about gold and silver décor on WhatsApp.`,
  path: "/why-us",
  keywords: ["why buy gold home decor online India", "decor with price in rupees"],
});

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        eyebrow={`The ${site.name} difference`}
        title="Clear prices, simple enquiries"
        description="Each piece has a price, a catalogue number and a finish. Ask about any of them on WhatsApp."
        crumbs={[{ label: "Home", href: "/" }, { label: "Why Us" }]}
      >
        <ButtonLink href="/products" variant="accent" size="lg" withArrow>
          View Products
        </ButtonLink>
      </PageHero>

      <section className="py-[clamp(2.5rem,6vw,4.5rem)]">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {differenceFeatures.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 80} className="h-full">
                <FeatureCard feature={feature} index={index} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FaqSection items={supplyFaqs} />

      <QuoteCta />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Why Us", path: "/why-us" },
          ]),
          faqSchema(supplyFaqs),
        ]}
      />
    </>
  );
}
