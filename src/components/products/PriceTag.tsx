import { cn } from "@/lib/cn";

/**
 * Swing-tag price label in the logo palette. It prints `price` exactly as
 * given (the `priceLabel` string), with no prefix, suffix, tax note or
 * strikethrough.
 *
 * Server-safe (no hooks), so server cards and the client search panel can
 * both render it. The `lg` size is always dark and ignores `tone`.
 */
type PriceTagProps = {
  price: string;
  size?: "xs" | "sm" | "lg";
  tone?: "dark" | "soft" | "light";
  className?: string;
};

const tones = {
  dark: "bg-navy text-cream ring-1 ring-inset ring-lime-soft/35 shadow-[0_6px_16px_-8px_rgb(31_20_15/0.55)]",
  soft: "bg-lime-soft text-navy",
  light: "bg-white text-navy ring-1 ring-inset ring-navy/12",
};

const sizes = {
  xs: "h-5 gap-1 px-2 text-[0.6875rem]",
  sm: "h-6 gap-1.5 px-2.5 text-[0.75rem] sm:h-7 sm:px-3 sm:text-[0.8125rem]",
};

export function PriceTag({ price, size = "sm", tone = "dark", className }: PriceTagProps) {
  if (size === "lg") {
    return (
      <span
        className={cn(
          "price-tag inline-flex items-baseline gap-3 rounded-2xl bg-navy px-5 py-3.5 text-cream shadow-btn ring-1 ring-inset ring-lime-soft/30",
          className
        )}
      >
        <span className="text-eyebrow font-semibold uppercase text-lime-soft">Price</span>
        <span className="font-display text-[clamp(1.75rem,1.4rem+1.2vw,2.375rem)] leading-none">
          {price}
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "price-tag inline-flex items-center rounded-pill font-semibold leading-none tabular-nums tracking-[0.01em]",
        tones[tone],
        sizes[size],
        className
      )}
    >
      {/* A small punched-hole dot, decorative only. */}
      <span aria-hidden className="size-1 shrink-0 rounded-full bg-current opacity-55 sm:size-1.5" />
      <span className="sr-only">Price: </span>
      {price}
    </span>
  );
}
