import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { WhatsAppIconLink } from "@/components/ui/WhatsApp";
import { SparkleIcon, CheckIcon, UsersIcon } from "@/components/icons";

/** Collection chips, shown above the call to action. */
const chips = [
  { icon: SparkleIcon, label: "Figurines" },
  { icon: CheckIcon, label: "Vases & Stands" },
  { icon: UsersIcon, label: "Serving Trays" },
];

export function QuoteCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="pb-[clamp(3rem,7vw,5.5rem)]"
    >
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-panel bg-lime-mist px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(2.5rem,6vw,4rem)]">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(58% 68% at 50% 0%, rgb(211 180 150 / .3) 0%, transparent 66%), radial-gradient(46% 60% at 90% 104%, rgb(211 180 150 / .25) 0%, transparent 70%)",
            }}
          />

          <div className="mx-auto flex max-w-[46rem] flex-col items-center text-center">
            <ul className="flex flex-wrap justify-center gap-2">
              {chips.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <span className="inline-flex items-center gap-2 rounded-pill border border-lime-soft bg-white/75 px-3.5 py-2 text-[0.75rem] font-medium text-navy backdrop-blur-sm sm:text-[0.8125rem]">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-lime-soft text-navy">
                      <Icon className="size-[0.85rem]" />
                    </span>
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <Eyebrow className="mt-[clamp(1.5rem,3vw,2rem)]">
              Place an order
            </Eyebrow>

            <h2 id="cta-heading" className="mt-3 max-w-[24ch] text-h2">
              Find the piece for your home
            </h2>

            <p className="text-lead mt-4 max-w-[50ch] text-muted">
              Tell us which pieces you are interested in and how many. Your
              enquiry opens in WhatsApp with the details filled in.
            </p>

            <div className="mt-[clamp(1.75rem,3vw,2.25rem)] flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <ButtonLink
                href="/request-a-quote"
                variant="accent"
                size="lg"
                withArrow
              >
                Request a Quote
              </ButtonLink>

              <WhatsAppIconLink tone="outline" size="lg" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
