"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { ProductCard } from "@/components/products/ProductCard";
import { categories, products, type ProductCategory } from "@/lib/products";

type TabId = "all" | ProductCategory;

function isTabId(value: string | null): value is TabId {
  return !!value && categories.some((category) => category.id === value);
}

/**
 * Collection tabs. Tab state is local rather than `useSearchParams`, so the full
 * grid is server rendered. `?category=` is synced from the URL on mount and kept
 * in history, so deep links and back/forward still work.
 */
export function ProductFilter() {
  const [active, setActive] = useState<TabId>("all");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const sync = () => {
      const value = new URLSearchParams(window.location.search).get("category");
      setActive(isTabId(value) ? value : "all");
    };

    /* Deferred past the current React commit, so setActive never fires during
       the render that mounts this component. */
    const timer = setTimeout(sync, 0);
    window.addEventListener("popstate", sync);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  const select = (id: TabId) => {
    if (id === active) return;
    setActive(id);
    const url = id === "all" ? "/products#range" : `/products?category=${id}#range`;
    window.history.pushState({ category: id }, "", url);
  };

  // Roving arrow-key navigation between tabs.
  const onKeyDown = (event: KeyboardEvent) => {
    const order = categories.map((category) => category.id);
    const index = order.indexOf(active);
    let next = index;

    if (event.key === "ArrowRight") next = (index + 1) % order.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + order.length) % order.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = order.length - 1;
    else return;

    event.preventDefault();
    const id = order[next];
    select(id);
    tabRefs.current[id]?.focus();
  };

  const visible =
    active === "all"
      ? products
      : products.filter((product) => product.category === active);

  return (
    <>
      <div className="flex flex-col gap-3 sm:gap-4">
        <div
          role="tablist"
          aria-label="Filter products by collection"
          onKeyDown={onKeyDown}
          className="no-scrollbar flex gap-2 overflow-x-auto sm:flex-wrap sm:gap-2.5"
        >
          {categories.map((category) => {
            const selected = category.id === active;
            return (
              <button
                key={category.id}
                ref={(node) => {
                  tabRefs.current[category.id] = node;
                }}
                type="button"
                role="tab"
                id={`tab-${category.id}`}
                aria-selected={selected}
                aria-controls="product-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(category.id)}
                className={cn(
                  "shrink-0 rounded-pill border px-4 py-2.5 text-[0.8125rem] font-semibold transition-[border-color,background-color,color] duration-300 sm:text-[0.875rem]",
                  selected
                    ? "border-navy bg-navy text-white"
                    : "border-line bg-white text-navy hover:border-navy/40"
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <p
          key={`count-${active}`}
          className="product-count-enter text-[0.8125rem] tabular-nums text-muted-soft sm:text-right"
          aria-live="polite"
        >
          {visible.length} {visible.length === 1 ? "piece" : "pieces"}
        </p>
      </div>

      <div
        role="tabpanel"
        id="product-panel"
        aria-labelledby={`tab-${active}`}
        className="mt-[clamp(1.5rem,3vw,2.25rem)]"
      >
        <div
          key={`grid-${active}`}
          className="grid grid-cols-2 gap-[clamp(0.75rem,1.6vw,1.25rem)] lg:grid-cols-3 xl:grid-cols-3"
        >
          {visible.map((product, index) => (
            <div
              key={product.slug}
              className="product-grid-item h-full"
              style={{ "--product-index": Math.min(index, 12) } as CSSProperties}
            >
              <ProductCard
                product={product}
                priority={index < 2}
                sizes="(min-width: 1280px) 22rem, (min-width: 1024px) 30vw, 46vw"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
