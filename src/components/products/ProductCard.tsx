import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArrowRightIcon } from "@/components/icons";
import { PriceTag } from "@/components/products/PriceTag";
import type { Product } from "@/lib/products";

export function ProductCard({
  product,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 22rem, 46vw",
}: {
  product: Product;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <article
      className={cn(
        "card-surface group h-full [--card-glow:#d3b49633] [--card-ring-mid:#d3b49680] [--card-ring:#d3b496]",
        className
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-[inherit]"
      >
        {/* ── Product photo ─────────────────────────────────────────── */}
        <div
          className={cn(
            "relative aspect-square overflow-hidden",
            product.tint
          )}
        >
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover object-center transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.05] group-focus-within:scale-[1.05]"
          />

          <PriceTag
            price={product.priceLabel}
            size="sm"
            tone="dark"
            className="absolute right-2 top-2 z-2 sm:right-3 sm:top-3"
          />
        </div>

        {/* The accent line draws in for pointer and keyboard interaction. */}
        <span aria-hidden className="relative block h-px w-full bg-line-soft">
          <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#d3b496] via-[#d3b496] to-transparent transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-x-100 group-focus-within:scale-x-100" />
        </span>

        {/* ── Meta ──────────────────────────────────────────────────── */}
        <div className="flex flex-1 flex-col items-center px-[clamp(0.75rem,1.5vw,1.25rem)] py-[clamp(0.8125rem,1.5vw,1.125rem)] text-center">
          <h3 className="font-sans text-[0.875rem] font-semibold leading-snug tracking-[-0.01em] text-navy sm:text-[0.9375rem]">
            {product.name}
          </h3>
          <p className="mt-1 text-[0.6875rem] leading-snug text-muted sm:text-[0.75rem]">
            {product.finish} · {product.categoryLabel}
          </p>
        </div>

        <span className="flex items-center justify-center gap-1.5 border-t border-line-soft px-3 py-[0.6875rem] text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-navy transition-colors duration-500 ease-[var(--ease-out-soft)] group-hover:bg-[#d3b496] group-focus-within:bg-[#d3b496] sm:text-[0.6875rem]">
          View product
          <ArrowRightIcon
            aria-hidden
            className="size-3.5 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-1 group-focus-within:translate-x-1"
          />
        </span>
      </Link>
    </article>
  );
}
