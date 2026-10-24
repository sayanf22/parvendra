import type { CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SparkleIcon } from "@/components/icons";
import { marqueeItems, marqueeItemsAlt } from "@/lib/site";

/**
 * Full-bleed collection band: a short headline above two marquee rows running
 * in opposite directions. There are no edge masks, so text stays fully visible
 * until it reaches the band's rounded edge. All type is upright and solid.
 */
export function ClientStrip() {
  const rowA = [...marqueeItems, ...marqueeItems];
  const rowB = [...marqueeItemsAlt, ...marqueeItemsAlt];

  return (
    <section
      aria-labelledby="collection-heading"
      className="relative isolate mt-[clamp(1.5rem,4vw,3rem)] overflow-hidden rounded-[clamp(1.5rem,4vw,3rem)] bg-lime-soft py-[clamp(3rem,7vw,5.5rem)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 70% at 50% -10%, rgb(255 255 255 / .5) 0%, transparent 70%)",
        }}
      />

      <Reveal className="mx-auto max-w-[82.5rem] px-[clamp(1.25rem,4vw,3rem)] text-center">
        <span className="inline-flex items-center gap-2 rounded-pill bg-navy px-4 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-cream sm:text-[0.8125rem]">
          The collection
        </span>

        <h2
          id="collection-heading"
          className="mx-auto mt-5 max-w-[22ch] font-display text-[clamp(2rem,1.3rem+3vw,3.75rem)] leading-[1.08] tracking-[-0.02em] text-navy"
        >
          Gold and silver for every corner of your home
        </h2>
      </Reveal>

      <div className="mt-[clamp(2.25rem,5vw,3.5rem)] overflow-hidden">
        <ul
          className="marquee-track items-center"
          style={
            {
              "--marquee-duration": "50s",
              "--marquee-duration-sm": "30s",
            } as CSSProperties
          }
        >
          {rowA.map((item, index) => (
            <li
              key={`a-${item}-${index}`}
              aria-hidden={index >= marqueeItems.length}
              className="flex shrink-0 items-center gap-[clamp(1.25rem,3vw,2.5rem)] px-[clamp(0.625rem,1.5vw,1.25rem)] py-1"
            >
              <span
                className={
                  index % 2 === 0
                    ? "whitespace-nowrap font-display text-[2rem] leading-[1.15] text-navy sm:text-[2.75rem] lg:text-[3.5rem]"
                    : "whitespace-nowrap font-display text-[2rem] leading-[1.15] text-blue sm:text-[2.75rem] lg:text-[3.5rem]"
                }
              >
                {item}
              </span>
              <SparkleIcon aria-hidden className="size-5 shrink-0 text-navy sm:size-6" />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[clamp(1.25rem,3vw,1.75rem)] overflow-hidden">
        <ul
          className="marquee-track marquee-reverse items-center"
          style={
            {
              "--marquee-duration": "38s",
              "--marquee-duration-sm": "24s",
            } as CSSProperties
          }
        >
          {rowB.map((item, index) => (
            <li
              key={`b-${item}-${index}`}
              aria-hidden={index >= marqueeItemsAlt.length}
              className="flex shrink-0 items-center px-[0.375rem] py-1 sm:px-[0.5rem]"
            >
              <span className="whitespace-nowrap rounded-pill border border-navy/45 bg-cream-soft px-5 py-2.5 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-navy shadow-[0_1px_0_rgb(50_33_26/0.06)] sm:px-6 sm:py-3 sm:text-[0.875rem]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
