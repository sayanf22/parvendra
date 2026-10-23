import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { marqueeItems, marqueeItemsAlt } from "@/lib/site";
import { categories, products } from "@/lib/products";

const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
const say = (n: number) => words[n] ?? String(n);

/**
 * Full-bleed band with a short counted headline and two plain-text marquee rows
 * running in opposite directions. The counts come from the catalogue, so they
 * stay correct when products change.
 */
export function ClientStrip() {
  const pieceCount = products.length;
  const finishCount = new Set(products.map((p) => p.finish)).size;
  const collectionCount = categories.filter((c) => c.id !== "all").length;

  const rowA = [...marqueeItems, ...marqueeItems];
  const rowB = [...marqueeItemsAlt, ...marqueeItemsAlt];

  return (
    <section
      aria-labelledby="collection-heading"
      className="relative isolate mt-[clamp(1.5rem,4vw,3rem)] overflow-hidden rounded-[clamp(1.5rem,4vw,3rem)] bg-lime-soft py-[clamp(3.5rem,8vw,6rem)]"
    >
      <Reveal className="mx-auto max-w-[82.5rem] px-[clamp(1.25rem,4vw,3rem)] text-center">
        <span className="inline-flex items-center rounded-pill border border-navy/40 px-4 py-1.5 text-[0.75rem] font-medium text-navy sm:text-[0.8125rem]">
          The collection
        </span>

        <h2
          id="collection-heading"
          className="mx-auto mt-5 font-display text-[clamp(1.875rem,1.2rem+3vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-navy"
        >
          {say(pieceCount)} pieces. {say(finishCount)} finishes.
          <br />
          <em className="text-blue">{say(collectionCount)} collections.</em>
        </h2>
      </Reveal>

      <div className="edge-fade mt-[clamp(2.5rem,6vw,4rem)] overflow-hidden">
        <ul
          className="marquee-track items-center"
          style={
            {
              "--marquee-duration": "48s",
              "--marquee-duration-sm": "30s",
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
                    ? "whitespace-nowrap font-display text-[1.75rem] leading-none text-navy sm:text-[2.5rem] lg:text-[3.25rem]"
                    : "whitespace-nowrap font-display text-[1.75rem] italic leading-none text-blue sm:text-[2.5rem] lg:text-[3.25rem]"
                }
              >
                {item}
              </span>
              <span aria-hidden className="size-2 shrink-0 rotate-45 bg-navy/45 sm:size-2.5" />
            </li>
          ))}
        </ul>
      </div>

      <div className="edge-fade mt-[clamp(1rem,2.5vw,1.75rem)] overflow-hidden">
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
              <span className="whitespace-nowrap rounded-pill border border-navy/30 px-4 py-2 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-navy/80 sm:px-5 sm:py-2.5 sm:text-[0.8125rem]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
