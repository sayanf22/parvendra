import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

/**
 * Questions visitors ask before they enquire. Each answer uses only what the
 * catalogue or the enquiry flow already does. Delivery, stock and minimum
 * quantities are referred to WhatsApp until the client confirms them.
 */
export const supplyFaqs = [
  {
    question: "Are the prices in Indian Rupees?",
    answer: `Yes. Every piece is priced in Indian Rupees (₹), taken from the ${site.name} price list. Confirm the current price with us on WhatsApp before you order.`,
  },
  {
    question: "How do I place an order?",
    answer:
      "Open the piece you want, then send an enquiry on WhatsApp with its name or catalogue number. We reply on WhatsApp with availability and the next steps.",
  },
  {
    question: "Which finishes are available?",
    answer:
      "The collection includes gold and silver pieces. Each product page shows the finish of that piece.",
  },
  {
    question: "What do the catalogue numbers mean?",
    answer:
      "Each piece has a catalogue number from the price list, from 1 to 6. Quote the number when you enquire, so we can match your request to the right piece.",
  },
  {
    question: "Can I order more than one piece?",
    answer:
      "Yes. Use the quote form to list the pieces and quantities you need, and we will reply with a quote.",
  },
  {
    question: "Do you deliver to my city?",
    answer:
      "Please ask us on WhatsApp. Delivery areas and timings are confirmed for each order.",
  },
];

export function FaqSection({
  items = supplyFaqs,
  heading = "Questions buyers ask first",
}: {
  items?: { question: string; answer: string }[];
  heading?: string;
}) {
  return (
    <section
      aria-labelledby="faq-heading"
      className="py-[clamp(2.5rem,6vw,4.5rem)]"
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Before you order"
            title={<span id="faq-heading">{heading}</span>}
            description="Prices, ordering and catalogue numbers, explained."
          />
        </Reveal>

        <dl className="mt-[clamp(1.75rem,3.5vw,2.5rem)] grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-0 lg:grid-cols-2">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 60}>
              <div className="border-t border-line-soft py-[clamp(1.125rem,2vw,1.5rem)]">
                <dt className="flex gap-3 font-sans text-[1rem] font-semibold leading-snug text-navy">
                  <span
                    aria-hidden
                    className="mt-2 size-2 shrink-0 rounded-full bg-lime-soft"
                  />
                  {item.question}
                </dt>
                <dd className="mt-2.5 pl-5 text-[0.9375rem] leading-relaxed text-muted">
                  {item.answer}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
