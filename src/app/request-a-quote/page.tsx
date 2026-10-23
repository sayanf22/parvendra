import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { CheckIcon } from "@/components/icons";
import { WhatsAppIconLink } from "@/components/ui/WhatsApp";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `Request a Quote: ${site.name}`,
  description:
    "Request a quote for gold and silver décor pieces. List the pieces and quantities you need. Your request opens in WhatsApp.",
  path: "/request-a-quote",
  keywords: ["gold decor quote request", "request quote decor pieces"],
});

const steps = [
  "Choose the pieces and quantities you need",
  "Send the request, which opens in WhatsApp",
  "Press send in WhatsApp when you are ready",
];

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Quote request"
        title="Request a Quote"
        description="List the pieces and quantities you need. Your request opens in WhatsApp."
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
                  Prefer to chat?
                </h2>
                <div className="mt-4 flex items-center gap-3">
                  <WhatsAppIconLink tone="solid" />
                  <p className="text-muted">Open a WhatsApp chat instead of the form.</p>
                </div>
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
