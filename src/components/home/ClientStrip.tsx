import type { CSSProperties } from "react";
import { marqueeItems } from "@/lib/site";

/**
 * Full-bleed band that scrolls the collection highlights as plain text. It
 * replaces the old client-logo marquee, so the page carries no third-party
 * logos or images.
 */
export function ClientStrip() {
  const track = [...marqueeItems, ...marqueeItems];

  return (
    <section
      aria-labelledby="collection-heading"
      className="relative isolate overflow-hidden rounded-[clamp(1.5rem,4vw,3rem)] bg-lime-soft py-[clamp(3.5rem,8vw,6rem)]"
    >
      <div className="mx-auto max-w-[82.5rem] px-[clamp(1.25rem,4vw,3rem)] text-center">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-navy/75 sm:text-[0.8125rem]">
          The collection
        </p>

        <h2
          id="collection-heading"
          className="mx-auto mt-3 max-w-[30ch] font-display text-[1.5rem] font-normal leading-[1.2] text-navy sm:mt-4 sm:text-[2rem] lg:text-[2.5rem]"
        >
          Figurines, vases and serving trays in gold and silver
        </h2>
      </div>

      <div className="edge-fade mt-[clamp(2.5rem,6vw,4.5rem)] overflow-hidden">
        <ul
          className="marquee-track items-center"
          style={
            {
              "--marquee-duration": "60s",
              "--marquee-duration-sm": "38s",
            } as CSSProperties
          }
        >
          {track.map((item, index) => (
            <li
              key={`${item}-${index}`}
              aria-hidden={index >= marqueeItems.length}
              className="flex shrink-0 items-center gap-[clamp(1.5rem,4vw,3.5rem)] px-[clamp(0.75rem,2vw,1.75rem)]"
            >
              <span className="whitespace-nowrap font-display text-[1.25rem] leading-none text-navy/85 sm:text-[1.875rem] lg:text-[2.375rem]">
                {item}
              </span>
              <span aria-hidden className="size-2 shrink-0 rounded-full bg-navy/35" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
