import Link from "next/link";
import { ProductPhoto } from "@/components/products/ProductPhoto";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { WhatsAppIconLink } from "@/components/ui/WhatsApp";
import { collections, products } from "@/lib/products";

/**
 * Closing call to action. A two-column panel: copy and actions on one side,
 * a layered arrangement of three catalogue photos on the other. Photos zoom
 * in one after another as the panel scrolls into view, then drift gently.
 */
const collage = ["silver-chevron-serving-trays", "golden-leopard-figurine", "gold-pedestal-flower-stand"]
  .map((slug) => products.find((p) => p.slug === slug))
  .filter((p) => p !== undefined);

export function QuoteCta() {
  return (
    <section aria-labelledby="cta-heading" className="pb-[clamp(3rem,7vw,5.5rem)]">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[clamp(1.5rem,4vw,2.5rem)] bg-lime-soft">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(60% 80% at 0% 0%, rgb(255 255 255 / .55) 0%, transparent 70%)",
            }}
          />

          <div className="grid items-center gap-10 px-[clamp(1.5rem,5vw,4.5rem)] py-[clamp(2.75rem,6vw,5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            {/* ── Copy ─────────────────────────────────────────────── */}
            <div>
              <Reveal>
                <Eyebrow>Place an order</Eyebrow>
                <h2
                  id="cta-heading"
                  className="mt-5 max-w-[15ch] font-display text-[clamp(2.25rem,1.4rem+3.2vw,4rem)] leading-[1.05] tracking-[-0.02em] text-navy"
                >
                  Find the piece for your home
                </h2>
                <p className="mt-5 max-w-[44ch] text-[1rem] leading-relaxed text-ink sm:text-[1.0625rem]">
                  Tell us which pieces you would like and how many. Your request
                  opens in WhatsApp with the details filled in.
                </p>
              </Reveal>

              <Reveal delay={100}>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {collections.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/collections#${c.id}`}
                        className="inline-flex min-h-10 items-center rounded-pill border border-navy/30 bg-cream-soft/70 px-4 text-[0.875rem] font-medium text-navy transition-colors duration-300 hover:border-navy hover:bg-cream-soft"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={180} className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink href="/request-a-quote" variant="primary" size="lg" withArrow>
                  Request a Quote
                </ButtonLink>
                <WhatsAppIconLink tone="outline" size="lg" />
              </Reveal>
              <p className="mt-4 text-[0.8125rem] text-muted">
                Opens in WhatsApp. Nothing is sent until you press send.
              </p>
            </div>

            {/* ── Photo collage ────────────────────────────────────── */}
            <div aria-hidden className="relative mx-auto aspect-[5/4] w-full max-w-[34rem]">
              {collage.map((p, i) => {
                const place = [
                  "left-0 top-[8%] w-[46%] rotate-[-5deg]",
                  "left-[27%] top-0 z-10 w-[48%]",
                  "right-0 top-[14%] w-[44%] rotate-[5deg]",
                ][i];
                return (
                  <Reveal
                    key={p.slug}
                    delay={160 + i * 140}
                    className={`reveal-zoom absolute ${place}`}
                  >
                    <div
                      className="float-gentle relative aspect-[3/4] overflow-hidden rounded-[1.25rem] border-[5px] border-cream-soft bg-cream-soft shadow-lift"
                      style={{ animationDelay: `${i * 1.2}s` }}
                    >
                      <ProductPhoto
                        src={p.image}
                        alt=""
                        sizes="(min-width: 1024px) 16rem, 44vw"
                      />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
