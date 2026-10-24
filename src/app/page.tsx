import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ClientStrip } from "@/components/home/ClientStrip";
import { ProductRange } from "@/components/home/ProductRange";
import { TrustPanel } from "@/components/home/TrustPanel";
import { QuoteCta } from "@/components/home/QuoteCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Gold & Silver Home Décor with Prices in Rupees`,
  description: `${site.name} offers gold and silver figurines, vases, flower stands and serving trays. Every piece is listed with its price in Indian Rupees, and you can enquire on WhatsApp.`,
  path: "/",
  keywords: [
    "gold figurines India",
    "gold vase price in rupees",
    "silver serving trays India",
    "gold flower stand India",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientStrip />
      <ProductRange />
      <TrustPanel />
      <QuoteCta />

      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }])} />
    </>
  );
}
