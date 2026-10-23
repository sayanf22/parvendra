import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { WhatsAppIconLink } from "@/components/ui/WhatsApp";
import { navLinks, site } from "@/lib/site";
import { categories } from "@/lib/products";

/** Column heading, the same treatment across all columns. */
function ColumnTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-cream"
    >
      {children}
    </h2>
  );
}

/** Divider-separated link list. */
function LinkList({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <ul className="mt-5">
      {items.map((item) => (
        <li key={item.label} className="border-b border-white/8">
          {/* py-3 keeps the row at about 44px for touch. */}
          <Link
            href={item.href}
            className="block py-3 text-[0.8125rem] text-cream/60 transition-colors duration-300 hover:text-lime-soft"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteFooter() {
  const collectionLinks = categories
    .filter((category) => category.id !== "all")
    .map((category) => ({
      label: category.label,
      href: `/products?category=${category.id}#range`,
    }));

  return (
    <footer className="mt-auto">
      {/* Dark block, full-bleed with a large radius on all four corners */}
      <div className="relative isolate overflow-hidden rounded-[clamp(1.5rem,4vw,2.75rem)] bg-night pb-[clamp(2rem,4vw,3rem)] pt-[clamp(2.5rem,5vw,4rem)]">
        <Container>
          <div className="grid gap-[clamp(2rem,4vw,3rem)] sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
            {/* About */}
            <div>
              <Logo onDark />
              <p className="mt-5 max-w-[38ch] text-[0.8125rem] leading-relaxed text-cream/60">
                <span className="font-medium text-lime-soft">{site.name}</span>{" "}
                offers gold and silver décor pieces, with every price listed in
                Indian Rupees.
              </p>
            </div>

            {/* Quick links */}
            <nav aria-labelledby="footer-nav">
              <ColumnTitle id="footer-nav">Quick links</ColumnTitle>
              <LinkList
                items={[
                  ...navLinks,
                  { label: "Request a Quote", href: "/request-a-quote" },
                ]}
              />
            </nav>

            {/* Collections */}
            <nav aria-labelledby="footer-collections">
              <ColumnTitle id="footer-collections">Collections</ColumnTitle>
              <LinkList items={collectionLinks} />
            </nav>

            {/* Contact */}
            <div>
              <ColumnTitle>Enquire</ColumnTitle>
              <div className="mt-5 flex items-center gap-3">
                <WhatsAppIconLink tone="onDark" />
                <p className="text-[0.8125rem] leading-relaxed text-cream/60">
                  Enquiries open in WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex flex-col items-center justify-between gap-2 py-[clamp(1.5rem,3vw,2.25rem)] sm:flex-row">
          <p className="text-center text-[0.75rem] text-muted-soft">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-center text-[0.75rem] text-muted-soft">
            Made by <span className="font-semibold text-navy">Whycreatives</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
