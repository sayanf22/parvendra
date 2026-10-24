import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  tone = "green",
  className,
}: {
  children: ReactNode;
  /** Green uses a lime marker with readable navy ink on light surfaces. */
  tone?: "green" | "blue" | "mint" | "light";
  className?: string;
}) {
  const tones = {
    green:
      "inline-flex items-center gap-2 text-navy before:size-1.5 before:shrink-0 before:rounded-full before:bg-blue",
    blue: "text-blue",
    /** Light accent stays clearly visible against the near-black slab. */
    mint: "inline-flex items-center gap-2 text-lime-soft before:size-1.5 before:shrink-0 before:rounded-full before:bg-lime-soft",
    light: "text-white/80",
  } as const;

  return (
    <p
      className={cn(
        "text-[0.75rem] font-semibold uppercase leading-[1.4] tracking-[0.16em] sm:text-[0.8125rem]",
        tones[tone],
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  eyebrowTone = "green",
  title,
  description,
  align = "left",
  className,
  children,
}: {
  eyebrow?: string;
  eyebrowTone?: "green" | "blue" | "mint" | "light";
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        centered && "items-center text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
      <h2 className="text-h2 max-w-[24ch]">{title}</h2>
      {description && (
        <p
          className={cn(
            "text-lead max-w-[48ch] text-muted",
            centered && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
