import type { Metadata } from "next";
import { site, social } from "@/lib/site";
import type { Product } from "@/lib/products";

/**
 * Metadata and JSON-LD helpers for Indian Invention Boy.
 *
 * Structured data must match what the page shows. Every price in `offers` is
 * printed on the matching product page.
 */

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;

/** Canonical absolute URL for a route. */
export function canonical(path: string) {
  return path === "/" ? `${site.url}/` : `${site.url}${path}`;
}

const defaultKeywords = [
  "Indian Invention Boy",
  "gold figurines India",
  "gold home decor India",
  "silver serving trays India",
  "gold flower stand price",
  "gold sunburst vase India",
  "decorative figurines with price in rupees",
];

export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = canonical(path);

  const mergedKeywords = keywords
    ? Array.from(new Set([...keywords, ...defaultKeywords]))
    : defaultKeywords;

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} · ${site.name}`,
      description,
      url,
      locale: "en_IN",
    },
    twitter: {
      card: "summary",
      title: `${title} · ${site.name}`,
      description,
    },
  };
}

/** Organization entity for the whole site. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    alternateName: [site.name.toUpperCase()],
    description: site.description,
    url: site.url,
    logo: `${site.url}/logo.webp`,
    telephone: site.phone,
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: site.phone,
        url: site.whatsappHref,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: social.map((profile) => profile.href),
    knowsAbout: [
      "gold figurines",
      "gold vases and flower stands",
      "silver serving trays",
      "home decor",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: site.language,
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

/**
 * Product entity with a single INR offer. The price is the same figure printed
 * on the product page, so the structured data matches the visible content.
 * `availability` is left out until the client confirms stock status.
 */
export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.blurb,
    image: `${site.url}${product.image}`,
    category: product.categoryLabel,
    brand: { "@type": "Brand", name: site.name },
    url: canonical(`/products/${product.slug}`),
    offers: {
      "@type": "Offer",
      url: canonical(`/products/${product.slug}`),
      price: product.price,
      priceCurrency: site.currency,
    },
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };
}

export function itemListSchema(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} product catalogue`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: canonical(`/products/${product.slug}`),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
