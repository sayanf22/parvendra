import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SparkleIcon } from "@/components/icons";
import { marqueeItems, marqueeItemsAlt } from "@/lib/site";
import { categories, products } from "@/lib/products";

const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const say = (n: number) => words[n] ?? String(n);

/**
 * Full-bleed collection band. A counted headline (numbers come from the
 * catalogue) sits above two marquee rows running in opposite directions:
 * large serif words that alternate dark and warm brown, then small pills.
 * All type is upright; the site uses no italics.
 */
export function ClientStrip() {
  const pieceCount = products.length;
  const finishCount = new Set(products.map((p) => p.finish)).size;
  const collectionCount = categories.filter((c) => c.id !== "all").length;

  const stats = [
    { value: say(pieceCount), label: "pieces" },
    { value: say(finishCount), label: "finishes" },
    { value: say(collectionCount), label: "collections" },
  ];

  const rowA = [...marqueeItems, ...marqueeItems];
  const rowB = [...marqueeItemsAlt, ...marqueeItemsAlt];

  return (
    <section
      aria-labelledby="collection-heading"
      className="relative isolate mt-[clamp(1.5rem,4vw,3rem)] overflow-hidden rounded-[clamp(1.5rem,4vw,3rem)] bg-lime-soft py-[clamp(3.5rem,8vw,6rem)]"
    >
      {/* Soft light from the top so the flat beige has depth */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 70% at 50% -10%, rgb(255 255 255 / .55) 0%, transparent 70%)",
        }}
      />

      <Reveal className="mx-auto max-w-[82.5rem] px-[clamp(1.25rem,4vw,3rem)] text-center">
        <span className="inline-flex items-center gap-2 rounded-pill border border-navy/35 bg-white/40 px-4 py-1.5 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-navy sm:text-[0.8125rem]">
          <span aria-hidden className="size-1.5 rounded-full bg-blue" />
          The collection
        </span>

        <h2 id="collection-heading" className="sr-only">
          {stats.map((s) => `${s.value} ${s.label}`).join(", ")}
        </h2>

        <p
          aria-hidden
          className="mx-auto mt-6 max-w-[56rem] font-display text-[clamp(1.875rem,1.2rem+3vw,3.75rem)] leading-[1.15] tracking-[-0.02em] text-navy"
        >
          {stats.map((s, i) => (
            <span key={s.label} className="inline-block whitespace-nowrap">
              {i > 0 && " "}
              <span className="text-blue">{s.value}</span> {s.label}.
            </span>
          ))}
        </p>
      </Reveal>

      <div className="edge-fade mt-[clamp(2.5rem,6vw,4rem)] overflow-hidden">
        <ul
          className="marquee-track items-center"
          style={
            {
              "--marquee-duration": "52s",
              "--marquee-duration-sm": "32s",
            } as CSSProperties
          }
        >
          {rowA.map((item, index) => (
            <li
              key={`a-${item}-${index}`}
              aria-hidden={index >= marqueeItems.length}
              className="flex shrink-0 items-center gap-[clamp(1.25rem,3vw,2.75rem)] px-[clamp(0.625rem,1.5vw,1.375rem)]"
            >
              <span
                className={
                  index % 2 === 0
                    ? "whitespace-nowrap font-display text-[2rem] leading-none tracking-[-0.01em] text-navy sm:text-[2.75rem] lg:text-[3.5rem]"
                    : "whitespace-nowrap font-display text-[2rem] leading-none tracking-[-0.01em] text-blue sm:text-[2.75rem] lg:text-[3.5rem]"
                }
              >
                {item}
              </span>
              <SparkleIcon aria-hidden className="size-5 shrink-0 text-blue sm:size-6" />
            </li>
          ))}
        </ul>
      </div>

      <div className="edge-fade mt-[clamp(1.25rem,3vw,2rem)] overflow-hidden">
        <ul
          className="marquee-track marquee-reverse items-center"
          style={
            {
              "--marquee-duration": "40s",
              "--marquee-duration-sm": "26s",
            } as CSSProperties
          }
        >
          {rowB.map((item, index) => (
            <li
              key={`b-${item}-${index}`}
              aria-hidden={index >= marqueeItemsAlt.length}
              className="flex shrink-0 items-center px-[0.4rem] sm:px-[0.6rem]"
            >
              <span className="whitespace-nowrap rounded-pill border border-navy/30 bg-white/35 px-4 py-2 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-navy/85 transition-colors duration-300 hover:bg-white/70 sm:px-5 sm:py-2.5 sm:text-[0.8125rem]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
