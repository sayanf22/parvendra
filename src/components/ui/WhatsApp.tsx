import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { WhatsAppIcon } from "@/components/icons";
import { site } from "@/lib/site";

/**
 * Monochrome WhatsApp controls. Every WhatsApp entry point on the site uses
 * these, so the colour treatment lives in one place: brand brown with a cream
 * icon (solid), a brown outline (outline) and cream on the dark footer (onDark).
 *
 * Server-safe (no hooks), so both server and client components can import it.
 * Links always open in a new tab. The number itself is never rendered.
 */
type Tone = "solid" | "outline" | "onDark";
type Size = "md" | "lg";
type Shape = "pill" | "circle";

const shared =
  "group/btn relative inline-flex shrink-0 items-center justify-center overflow-hidden " +
  "font-semibold leading-none whitespace-nowrap " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-300 " +
  "ease-[var(--ease-out-soft)] hover:-translate-y-0.5 active:translate-y-0 " +
  "disabled:pointer-events-none disabled:opacity-55";

const tones: Record<Tone, string> = {
  solid:
    "bg-navy text-cream shadow-btn hover:bg-navy-deep hover:shadow-[0_14px_30px_-12px_rgb(31_20_15/0.7)]",
  outline:
    "border border-navy/25 bg-white text-navy hover:border-navy hover:bg-lime-mist",
  onDark: "bg-cream text-navy hover:bg-lime-soft",
};

const pillSizes: Record<Size, string> = {
  md: "h-12 px-5 gap-2 text-[0.875rem] rounded-pill",
  lg: "h-[3.25rem] px-6 gap-2.5 text-[0.9375rem] rounded-pill",
};

/** Both circles clear the 44px minimum tap target. */
const circleSizes: Record<Size, string> = {
  md: "size-11 lg:size-12 rounded-full",
  lg: "size-[3.25rem] rounded-full",
};

export function whatsappClass({
  tone = "solid",
  size = "lg",
  shape = "pill",
}: {
  tone?: Tone;
  size?: Size;
  shape?: Shape;
} = {}) {
  return cn(
    shared,
    tones[tone],
    shape === "circle" ? circleSizes[size] : pillSizes[size]
  );
}

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span aria-hidden className="sheen" />
      <WhatsAppIcon className="relative z-2 size-5 shrink-0 transition-transform duration-300 group-hover/btn:scale-110" />
      <span className="relative z-2">{children}</span>
    </>
  );
}

type ButtonProps = {
  tone?: Tone;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/** Labelled WhatsApp link, for example "Enquire on WhatsApp". */
export function WhatsAppButton({
  href = site.whatsappHref,
  tone = "solid",
  size = "lg",
  className,
  children,
}: ButtonProps & { href?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(whatsappClass({ tone, size }), className)}
    >
      <Inner>{children}</Inner>
    </a>
  );
}

/** Labelled submit button for forms that hand the message to WhatsApp. */
export function WhatsAppSubmitButton({
  tone = "solid",
  size = "lg",
  className,
  children,
}: ButtonProps) {
  return (
    <button type="submit" className={cn(whatsappClass({ tone, size }), className)}>
      <Inner>{children}</Inner>
    </button>
  );
}

/** Icon-only WhatsApp link. The label is its accessible name. */
export function WhatsAppIconLink({
  href = site.whatsappHref,
  tone = "solid",
  size = "md",
  label = "Chat on WhatsApp",
  className,
}: {
  href?: string;
  tone?: Tone;
  size?: Size;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(whatsappClass({ tone, size, shape: "circle" }), className)}
    >
      <WhatsAppIcon className="size-[1.2rem] transition-transform duration-300 group-hover/btn:scale-110 lg:size-[1.3rem]" />
    </a>
  );
}
