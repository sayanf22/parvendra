/**
 * Brand and contact details for Indian Invention Boy.
 *
 * Every enquiry channel on the site opens WhatsApp, so the enquiry number below
 * is the only contact detail the site needs. Change `whatsapp` here and every
 * button, form and structured-data entry follows.
 */
export const site = {
  /** Brand name, as written on the logo. */
  name: "Indian Invention Boy",
  tagline: "Gold & Silver Home Décor",
  description:
    "Indian Invention Boy offers gold and silver décor pieces: figurines, vases, flower stands and serving trays. Every piece is listed with its price in Indian Rupees, and enquiries are handled on WhatsApp.",
  /** TODO: set to the live domain before launch. Used for canonical URLs and the sitemap. */
  url: "http://localhost:3000",
  /** Enquiry number, digits only with country code. */
  whatsapp: "916396639864",
  whatsappHref: "https://wa.me/916396639864",
  /** Machine-readable form (JSON-LD only). Never render it in the UI. */
  phone: "+91 63966 39864",
  currency: "INR",
  currencySymbol: "₹",
  country: "IN",
  language: "en-IN",
} as const;

/** Social profiles. Empty until the client supplies real handles, so the footer shows none. */
export const social: { label: string; href: string }[] = [];

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Why Us", href: "/why-us" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Words that scroll across the home page band. Plain text only, no logos. */
export const marqueeItems = [
  "Golden Figurines",
  "Gold & Silver Finishes",
  "Vases & Flower Stands",
  "Silver Serving Trays",
  "Prices in Indian Rupees",
  "Enquire on WhatsApp",
] as const;
