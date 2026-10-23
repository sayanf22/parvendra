import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `Request a Quote: ${site.name}`,
  description: `Request a quote for gold and silver décor pieces. List the pieces and quantities you need, and ${site.name} replies on WhatsApp.`,
  path: "/request-a-quote",
  keywords: ["bulk gold decor quote India", "request quote decor pieces"],
});

const steps = [
  "Choose the pieces and quantities you need",
  "Send the request, which opens in WhatsApp",
  "We reply on WhatsApp with availability and your quote",
];

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Bulk enquiries"
        title="Request a Quote"
        description={`List the pieces and quantities you need. Your request opens in WhatsApp, and we reply there.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]}
      />

      <section id="quote-form" className="scroll-mt-[5.5rem] sm:scroll-mt-[6.5rem] lg:scroll-mt-[7.5rem] py-[clamp(2.5rem,6vw,4.5rem)]">
        <Container>
          <div className="grid gap-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-[1.55fr_1fr]">
            <div className="rounded-panel border border-line-soft bg-white p-[clamp(1.25rem,3vw,2.5rem)] shadow-soft">
              <QuoteForm />
            </div>

            <aside className="flex flex-col gap-5">
              <div className="rounded-panel bg-surface p-[clamp(1.25rem,2.5vw,1.75rem)]">
                <h2 className="font-sans text-[1.0625rem] font-semibold leading-snug text-navy">
                  What happens next
                </h2>
                <ul className="mt-4 space-y-3">
                  {steps.map((line) => (
                    <li key={line} className="flex gap-3 text-muted">
                      <CheckIcon className="mt-0.5 size-5 shrink-0 rounded-full bg-lime-soft p-1 text-navy" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-panel border border-line-soft bg-white p-[clamp(1.25rem,2.5vw,1.75rem)] shadow-soft">
                <h2 className="font-sans text-[1.0625rem] font-semibold leading-snug text-navy">
                  Prefer to talk?
                </h2>
                <ul className="mt-4 space-y-3.5">
                  <li>
                    <a
                      href={site.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center gap-3 text-muted transition-colors duration-300 hover:text-navy"
                    >
                      <WhatsAppIcon className="size-4 shrink-0 text-navy" />
                      WhatsApp {site.phone}
                    </a>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Request a Quote", path: "/request-a-quote" },
        ])}
      />
    </>
  );
}
