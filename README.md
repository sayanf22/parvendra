# Indian Invention Boy

Website for **Indian Invention Boy**, a gold and silver home décor collection. Every piece is listed with its price in Indian Rupees, and enquiries open WhatsApp.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4, with the palette set in `src/app/globals.css` (`@theme`)
- `next/font`: Newsreader for headings, Geist for UI and body

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
```

## Content

| What | Where |
| ---- | ----- |
| Brand name, tagline, WhatsApp enquiry number, site URL | `src/lib/site.ts` |
| Products, prices, catalogue numbers, photos | `src/lib/products.ts`, `public/products/` |
| Home page highlight band | `marqueeItems` in `src/lib/site.ts` |
| Collections page sections | `collections` in `src/lib/products.ts` |
| FAQ answers | `src/components/seo/FaqSection.tsx` |
| Page metadata and structured data | `src/lib/seo.ts` |
| WhatsApp message builder | `src/lib/enquiry.ts` |
| WhatsApp buttons and icon links (monochrome) | `src/components/ui/WhatsApp.tsx` |

The enquiry number is +91 63966 39864 (`whatsapp` in `src/lib/site.ts`). The UI never shows the number. Every WhatsApp entry point is an icon or labelled button that opens `site.whatsappHref`. `site.phone` is used only in JSON-LD (`src/lib/seo.ts`). `public/llms.txt` and `public/llms-full.txt` contain the number as text and must be edited by hand if it changes.

## Content rules

The site states only these facts, all taken from the client's price list:

- product names, prices in ₹ (exactly as `priceLabel`), finish (Gold or Silver), collection and catalogue number
- the counts: 6 pieces in 3 collections
- that enquiries go via WhatsApp

Do not add any other claim (materials, dimensions, stock, delivery, reply times, offers, reviews, certifications, warranties or returns) without the client's confirmation.

## Brand assets

- `public/logo.webp`: the logo used on the site and in the web manifest. Its background is transparent.
- `src/app/icon.png`, `src/app/apple-icon.png`, `src/app/favicon.ico`: favicons generated from the logo. Next.js serves these automatically.
- `brand/indian-invention-boy-logo.png`: the original full-size logo, kept for re-exporting.
- `docs/product-price-catalog.pdf`: the source price list. The names, prices and catalogue numbers in `products.ts` come from it.

Colours come from the logo: brown (`#32211a`), cream and beige accents, and near-black. Token names such as `navy`, `blue` and `lime-soft` are kept for compatibility, but their values are now brown and beige.

## Before launch

- Set `url` in `src/lib/site.ts` to the live domain. It is currently `http://localhost:3000`.
- Add delivery areas, stock status and product descriptions or dimensions. None of these are in the price list.
- Add social profile links to `social` in `src/lib/site.ts` if the client has them.

## Deployment (Cloudflare Workers)

The OpenNext adapter and Wrangler are pinned so CI does not auto-migrate the repository during each deployment. In Cloudflare Workers Builds, use:

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`
- **Root directory:** the repository root

For a local one-command deployment, use `npm run deploy`. The Worker and its `WORKER_SELF_REFERENCE` service binding are both named `parvendra`. These names must remain identical. Generated `.open-next` and `.wrangler` output is ignored.
