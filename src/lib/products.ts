/**
 * The Indian Invention Boy catalogue.
 *
 * Source: `docs/product-price-catalog.pdf` ("Product Price List", prices in
 * Indian Rupees). Names, prices and catalogue numbers are copied exactly from
 * that list. Photos are extracted from the same PDF into `public/products`.
 *
 * Collections are grouped from the product names only. Add product descriptions,
 * stock status and pack details when the client supplies them.
 */
export type ProductCategory = "figurines" | "vases-stands" | "serveware";

export type Product = {
  slug: string;
  /** Catalogue number from the price list. */
  ref: number;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  /** Price in whole rupees. */
  price: number;
  /** Display price, for example "₹2,500". */
  priceLabel: string;
  finish: "Gold" | "Silver";
  image: string;
  imageAlt: string;
  /** Neutral card background behind the photo. */
  tint: string;
  blurb: string;
  specs: { label: string; value: string }[];
  handling: string[];
};

export type CategoryInfo = {
  id: "all" | ProductCategory;
  label: string;
};

export const categories: CategoryInfo[] = [
  { id: "all", label: "All Products" },
  { id: "figurines", label: "Figurines" },
  { id: "vases-stands", label: "Vases & Stands" },
  { id: "serveware", label: "Serving Trays" },
];

const CATEGORY_LABEL: Record<ProductCategory, string> = {
  figurines: "Figurines",
  "vases-stands": "Vases & Stands",
  serveware: "Serving Trays",
};

type Seed = {
  slug: string;
  ref: number;
  name: string;
  category: ProductCategory;
  price: number;
  priceLabel: string;
  finish: "Gold" | "Silver";
};

const seeds: Seed[] = [
  {
    slug: "golden-leopard-figurine",
    ref: 1,
    name: "Golden Leopard Figurine",
    category: "figurines",
    price: 2500,
    priceLabel: "₹2,500",
    finish: "Gold",
  },
  {
    slug: "gold-pedestal-flower-stand",
    ref: 2,
    name: "Gold Pedestal Flower Stand",
    category: "vases-stands",
    price: 1000,
    priceLabel: "₹1,000",
    finish: "Gold",
  },
  {
    slug: "golden-sitting-rabbit-figurine",
    ref: 3,
    name: "Golden Sitting Rabbit Figurine",
    category: "figurines",
    price: 1700,
    priceLabel: "₹1,700",
    finish: "Gold",
  },
  {
    slug: "gold-sunburst-vase",
    ref: 4,
    name: "Gold Sunburst Vase",
    category: "vases-stands",
    price: 2700,
    priceLabel: "₹2,700",
    finish: "Gold",
  },
  {
    slug: "silver-chevron-serving-trays",
    ref: 5,
    name: "Silver Chevron Serving Trays",
    category: "serveware",
    price: 2200,
    priceLabel: "₹2,200",
    finish: "Silver",
  },
  {
    slug: "golden-deer-figurine",
    ref: 6,
    name: "Golden Deer Figurine",
    category: "figurines",
    price: 1900,
    priceLabel: "₹1,900",
    finish: "Gold",
  },
];

function define({ slug, ref, name, category, price, priceLabel, finish }: Seed): Product {
  const categoryLabel = CATEGORY_LABEL[category];

  return {
    slug,
    ref,
    name,
    category,
    categoryLabel,
    price,
    priceLabel,
    finish,
    image: `/products/${slug}.webp`,
    imageAlt: `${name} from the ${categoryLabel} collection`,
    tint: "bg-surface",
    blurb: `${name}, priced at ${priceLabel}. Enquire on WhatsApp.`,
    specs: [
      { label: "Price", value: priceLabel },
      { label: "Finish", value: finish },
      { label: "Collection", value: categoryLabel },
      { label: "Catalogue no.", value: String(ref) },
    ],
    handling: [
      "Prices are listed in Indian Rupees (₹), as shown in the price list.",
      "Send an enquiry on WhatsApp with the piece name or catalogue number.",
    ],
  };
}

export const products: Product[] = seeds.map(define);

/** Same-collection pieces first, then the rest of the catalogue. */
export function relatedProducts(product: Product, count = 4): Product[] {
  const others = products.filter((item) => item.slug !== product.slug);
  const sameCollection = others.filter((item) => item.category === product.category);
  const rest = others.filter((item) => item.category !== product.category);
  return [...sameCollection, ...rest].slice(0, count);
}
