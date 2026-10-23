import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProductFilter } from "@/components/products/ProductFilter";
import { QuoteCta } from "@/components/home/QuoteCta";
import { Container } from "@/components/ui/Container";
import { products } from "@/lib/products";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, itemListSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `Products: ${products.length} Gold & Silver Pieces with Prices`,
  description: `Browse ${products.length} ${site.name} pieces: golden figurines, gold vases and flower stands, and silver serving trays. Every price is in Indian Rupees.`,
  path: "/products",
  keywords: [
    "gold figurines price India",
    "gold sunburst vase price",
    "silver chevron serving trays price",
    "golden deer figurine price",
  ],
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="The collection"
        title="Every piece in the catalogue"
        description={`${products.length} pieces in figurines, vases and stands, and serving trays. Each price is in Indian Rupees.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <section
        id="range"
        aria-label="Product catalogue"
        className="scroll-mt-[5.5rem] sm:scroll-mt-[6.5rem] lg:scroll-mt-[7.5rem] py-[clamp(2.5rem,6vw,4.5rem)]"
      >
        <Container>
          <ProductFilter />
        </Container>
      </section>

      <QuoteCta />

      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
          ]),
          itemListSchema(products),
        ]}
      />
    </>
  );
}
