"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/cn";
import { ArrowRightIcon } from "@/components/icons";
import { PriceTag } from "@/components/products/PriceTag";
import type { Product } from "@/lib/products";

const INTERVAL_MS = 3200;
const SLIDE_MS = 700;

/**
 * Looping carousel that advances one card at a time. One card shows on
 * phones (with a peek of the next), two from `sm` and three from `lg`.
 *
 * The list is rendered twice. Sliding past the last original card lands on
 * its identical copy, then the track snaps back to the start with the
 * transition off, so the loop has no visible jump.
 *
 * Auto-advance pauses on hover, keyboard focus, touch, a hidden tab and
 * `prefers-reduced-motion`. Arrows, dots and swipe always work.
 */
export function FeaturedCarousel({ products }: { products: Product[] }) {
  const count = products.length;
  const loop = [...products, ...products];

  const trackRef = useRef<HTMLUListElement | null>(null);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);
  const pausedRef = useRef(false);
  const dragRef = useRef<{ x: number; moved: boolean } | null>(null);

  /* Distance between card starts, read from layout so it matches every breakpoint. */
  const measure = useCallback(() => {
    const track = trackRef.current;
    const a = track?.children[0] as HTMLElement | undefined;
    const b = track?.children[1] as HTMLElement | undefined;
    if (a && b) setStep(b.offsetLeft - a.offsetLeft);
  }, []);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track || !("ResizeObserver" in window)) return;
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [measure]);

  const indexRef = useRef(0);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const next = useCallback(() => {
    setAnimate(true);
    setIndex((i) => i + 1);
  }, []);

  const prev = useCallback(() => {
    if (indexRef.current > 0) {
      setAnimate(true);
      setIndex((i) => i - 1);
      return;
    }
    /* At the very start: jump to the copy without animating, then slide back one. */
    setAnimate(false);
    setIndex(count);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimate(true);
        setIndex(count - 1);
      })
    );
  }, [count]);

  /* After landing on the copy of the first card, snap back to the original.
     Skipped while a no-animation jump (from `prev`) is in flight. */
  useEffect(() => {
    if (index < count || !animate) return;
    const t = window.setTimeout(() => {
      setAnimate(false);
      setIndex((i) => i - count);
    }, SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [index, count, animate]);

  /* Re-enable the transition two frames after a snap, so the snap itself never animates. */
  useEffect(() => {
    if (animate) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [animate]);

  /* Auto-advance. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current && !document.hidden) next();
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [next]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  /* Swipe: a horizontal drag of 40px moves one card. Clicks still open the card. */
  const onPointerDown = (e: ReactPointerEvent) => {
    dragRef.current = { x: e.clientX, moved: false };
    pause();
  };
  const onPointerUp = (e: ReactPointerEvent) => {
    const start = dragRef.current;
    resume();
    if (!start) return;
    const dx = e.clientX - start.x;
    if (Math.abs(dx) > 40) {
      start.moved = true;
      if (dx < 0) next();
      else prev();
    }
  };
  const onClickCapture = (e: React.MouseEvent) => {
    if (dragRef.current?.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
    dragRef.current = null;
  };

  const active = ((index % count) + count) % count;

  return (
    <div
      className="relative"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <div
        className="overflow-hidden px-1 py-2 -mx-1 touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={resume}
        onClickCapture={onClickCapture}
      >
        <ul
          ref={trackRef}
          aria-live="off"
          className="flex gap-[var(--gap)] [--gap:1rem] sm:[--gap:1.25rem] lg:[--gap:1.75rem]"
          style={{
            transform: `translate3d(${-index * step}px, 0, 0)`,
            transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)` : "none",
          }}
        >
          {loop.map((product, i) => {
            const isCopy = i >= count;
            /* Staggered heights: every card keeps its own offset, so the wave
               travels with the cards as the track slides. */
            const lift = ["", "sm:pt-10 lg:pt-16", "sm:pt-5 lg:pt-8"][i % 3];
            return (
              <li
                key={`${product.slug}-${i}`}
                aria-hidden={isCopy || undefined}
                className={cn(
                  "w-[84%] shrink-0 sm:w-[calc((100%-var(--gap))/2)] lg:w-[calc((100%-var(--gap)*2)/3)]",
                  lift
                )}
              >
                <Link
                  href={`/products/${product.slug}`}
                  tabIndex={isCopy ? -1 : undefined}
                  draggable={false}
                  className="group block select-none"
                >
                  {/* Wipes open when the carousel scrolls into view; first three stagger. */}
                  <div
                    className="reveal-media relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-lime-soft shadow-soft group-hover:shadow-lift"
                    style={{ "--d": `${Math.min(i, 3) * 140}ms` } as React.CSSProperties}
                  >
                    <span className="reveal-media-img absolute inset-0 block">
                      <Image
                        src={product.image}
                        alt={isCopy ? "" : product.imageAlt}
                        fill
                        draggable={false}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 84vw"
                        className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
                      />
                    </span>

                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep/55 via-navy-deep/10 to-transparent"
                    />

                    <span className="absolute left-4 top-4 rounded-pill bg-cream-soft px-3.5 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-navy shadow-soft">
                      {product.categoryLabel}
                    </span>

                    <span className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                      <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-cream drop-shadow-[0_1px_2px_rgb(0_0_0/0.4)]">
                        {product.finish} finish
                      </span>
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cream-soft text-navy shadow-card transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-rotate-45">
                        <ArrowRightIcon className="size-4" />
                      </span>
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 px-1">
                    <h3 className="min-w-0 font-sans text-[1.0625rem] font-semibold leading-snug text-navy transition-colors duration-300 group-hover:text-blue sm:text-[1.125rem]">
                      {product.name}
                    </h3>
                    <PriceTag price={product.priceLabel} size="sm" tone="dark" className="shrink-0" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Controls */}
      <div className="mt-7 flex items-center justify-between gap-6">
        <div className="flex items-center gap-2" role="group" aria-label="Choose a piece">
          {products.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => {
                setAnimate(true);
                setIndex(i);
              }}
              aria-label={`Show ${p.name}`}
              aria-current={i === active || undefined}
              className="grid h-11 place-items-center px-0.5"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-[width,background-color] duration-500 ease-[var(--ease-out-soft)]",
                  i === active ? "w-8 bg-navy" : "w-3 bg-navy/25 hover:bg-navy/50"
                )}
              />
            </button>
          ))}
        </div>

        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous piece"
            className="grid size-12 place-items-center rounded-full border border-navy/25 bg-white text-navy transition-[background-color,color,border-color] duration-300 hover:border-navy hover:bg-navy hover:text-cream"
          >
            <ArrowRightIcon className="size-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next piece"
            className="grid size-12 place-items-center rounded-full bg-navy text-cream transition-colors duration-300 hover:bg-navy-deep"
          >
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
