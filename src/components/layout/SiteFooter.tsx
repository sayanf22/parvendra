import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { WhatsAppButton } from "@/components/ui/WhatsApp";
import { ArrowRightIcon } from "@/components/icons";
import { navLinks, site } from "@/lib/site";
import { collections } from "@/lib/products";

/** Column heading, the same quiet sans treatment in every column. */
function ColumnTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-cream/65"
    >
      {children}
    </h2>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 py-1.5 text-[0.9375rem] text-cream/85 transition-colors duration-300 hover:text-cream"
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-lime-soft transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-x-100"
        />
      </span>
    </Link>
  );
}

export function SiteFooter() {
  const collectionLinks = collections.map((c) => ({
    label: c.label,
    href: `/collections#${c.id}`,
  }));

  const pageLinks = [...navLinks, { label: "Request a Quote", href: "/request-a-quote" }];

  return (
    <footer className="mt-auto px-[clamp(0.5rem,1.2vw,1rem)] pb-[clamp(0.5rem,1.2vw,1rem)]">
      <div className="relative isolate overflow-hidden rounded-[clamp(1.5rem,4vw,2.75rem)] bg-night text-cream">
        {/* Warm glow in the corner, echoing the hero palette */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(45% 60% at 100% 0%, rgb(138 90 60 / .28) 0%, transparent 70%), radial-gradient(40% 50% at 0% 100%, rgb(229 211 194 / .08) 0%, transparent 70%)",
          }}
        />

        <Container>
          {/* ── Top: brand statement and the enquiry action ─────────── */}
          <div className="flex flex-col gap-8 border-b border-white/10 py-[clamp(2.5rem,5vw,4rem)] lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-5">
              <Logo onDark />
              <div>
                <p className="font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] leading-[1.1] text-cream">
                  {site.name}
                </p>
                <p className="mt-1.5 text-[0.9375rem] text-cream/75">{site.tagline}</p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 lg:items-end">
              <WhatsAppButton tone="onDark" size="lg">
                Enquire on WhatsApp
              </WhatsAppButton>
              <p className="text-[0.8125rem] text-cream/70">
                Opens WhatsApp. Nothing is sent until you press send.
              </p>
            </div>
          </div>

          {/* ── Middle: links ───────────────────────────────────────── */}
          <div className="grid gap-10 py-[clamp(2.25rem,4.5vw,3.5rem)] sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
            <div className="max-w-[34ch]">
              <ColumnTitle>About</ColumnTitle>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-cream/80">
                Gold and silver décor pieces: figurines, vases, flower stands and
                serving trays, each listed with its price in Indian Rupees.
              </p>
              <Link
                href="/products"
                className="group mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-lime-soft"
              >
                Browse the catalogue
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <nav aria-labelledby="footer-nav">
              <ColumnTitle id="footer-nav">Pages</ColumnTitle>
              <ul className="mt-4 grid grid-cols-2 gap-x-6">
                {pageLinks.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-collections">
              <ColumnTitle id="footer-collections">Collections</ColumnTitle>
              <ul className="mt-4">
                {collectionLinks.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>

        {/* ── Oversized wordmark ──────────────────────────────────────── */}
        <p
          aria-hidden
          className="pointer-events-none select-none whitespace-nowrap px-[clamp(1rem,3vw,2.5rem)] text-center font-display text-[clamp(2.25rem,8.2vw,9.5rem)] leading-[1] pb-[0.12em] tracking-[-0.03em] text-cream/[0.1]"
        >
          {site.name}
        </p>

        {/* ── Bottom bar ──────────────────────────────────────────────── */}
        <Container>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-center sm:flex-row sm:text-left">
            <p className="text-[0.875rem] text-cream/70">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <p className="text-[0.875rem] text-cream/70">
              Made by{" "}
              <a
                href="https://whycreatives.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-cream underline decoration-cream/30 underline-offset-4 transition-colors duration-300 hover:decoration-cream"
              >
                whycreatives.in
              </a>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
