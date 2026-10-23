import type { ComponentType, SVGProps } from "react";
import type { Feature } from "@/components/ui/FeatureCard";
import {
  CheckIcon,
  GlobeIcon,
  ShieldCheckIcon,
  SparkleIcon,
  UsersIcon,
  WhatsAppIcon,
} from "@/components/icons";

/**
 * Reasons to buy, shown as cards on the Why Us page. Each point is something the
 * catalogue or the enquiry flow already does. Nothing here is a sourcing or
 * delivery promise the client has not made.
 */
export const differenceFeatures: Feature[] = [
  {
    icon: CheckIcon,
    title: "Prices shown up front",
    body: "Every piece in the catalogue lists its price in Indian Rupees, so you know the cost before you enquire.",
    tone: "blue",
  },
  {
    icon: SparkleIcon,
    title: "Gold and silver finishes",
    body: "The collection pairs warm gold figurines and vases with silver serving trays for the table.",
    tone: "berry",
  },
  {
    icon: WhatsAppIcon,
    title: "Enquire on WhatsApp",
    body: "Ask about any piece in one message. Every enquiry opens in WhatsApp.",
    tone: "green",
  },
  {
    icon: ShieldCheckIcon,
    title: "Catalogue numbers",
    body: "Each piece has a catalogue number, so you can refer to it clearly when you place an order.",
    tone: "blue",
  },
];

export type Commitment = {
  tag: string;
  title: string;
  body: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone: "blue" | "green" | "berry" | "amber" | "teal";
  /** Card width. Mixed widths stop the row reading as a grid. */
  size: "sm" | "md" | "lg";
  /** Vertical stagger step (0 to 2). Held in data so both marquee copies match. */
  offset: 0 | 1 | 2;
};

/** Scrolling highlight row on the home page. */
export const commitments: Commitment[] = [
  {
    tag: "Figurines",
    title: "Three golden figurines",
    body: "A leopard, a sitting rabbit and a deer, each listed with its own price and catalogue number.",
    icon: SparkleIcon,
    tone: "amber",
    size: "lg",
    offset: 0,
  },
  {
    tag: "Vases & stands",
    title: "Vases and flower stands",
    body: "A gold pedestal flower stand and a gold sunburst vase.",
    icon: GlobeIcon,
    tone: "green",
    size: "sm",
    offset: 2,
  },
  {
    tag: "Serveware",
    title: "Silver serving trays",
    body: "Chevron-pattern silver trays for serving, priced in rupees.",
    icon: UsersIcon,
    tone: "blue",
    size: "md",
    offset: 1,
  },
  {
    tag: "Pricing",
    title: "Prices in rupees",
    body: "Each piece is priced in Indian Rupees (₹) on the product page and in the price list.",
    icon: CheckIcon,
    tone: "teal",
    size: "sm",
    offset: 0,
  },
  {
    tag: "Enquiries",
    title: "Enquire on WhatsApp",
    body: "Send the pieces you are interested in as one WhatsApp message.",
    icon: WhatsAppIcon,
    tone: "green",
    size: "md",
    offset: 2,
  },
  {
    tag: "Quotes",
    title: "Request a quote",
    body: "List the pieces and quantities you are interested in and send the request on WhatsApp.",
    icon: UsersIcon,
    tone: "berry",
    size: "sm",
    offset: 1,
  },
];

export type Proof = {
  /** Headline claim, set in the display serif. */
  title: string;
  note: string;
  href: string;
  cta: string;
  /** Bento footprint. `lg` takes the wider column. */
  size: "lg" | "sm";
};

/** Highlight cards under the commitment row. */
export const proofPoints: Proof[] = [
  {
    title: "Six pieces in the catalogue",
    note: "Figurines, vases, flower stands and serving trays, each with its price in rupees.",
    href: "/products",
    cta: "See the catalogue",
    size: "lg",
  },
  {
    title: "Three collections",
    note: "Figurines, vases & stands, and serving trays.",
    href: "/products",
    cta: "Browse",
    size: "sm",
  },
  {
    title: "Ask on WhatsApp",
    note: "Enquire about any piece in one message.",
    href: "/contact",
    cta: "Contact us",
    size: "sm",
  },
  {
    title: "Request a quote",
    note: "List the pieces and quantities, then send the request on WhatsApp.",
    href: "/request-a-quote",
    cta: "Request a quote",
    size: "lg",
  },
];
