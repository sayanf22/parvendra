import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { CheckIcon, SparkleIcon, WhatsAppIcon } from "@/components/icons";
import { site } from "@/lib/site";

const highlights = [
  {
    icon: SparkleIcon,
    title: "Gold & Silver",
    note: "Warm finishes",
    ring: "bg-lime-soft text-navy",
  },
  {
    icon: CheckIcon,
    title: "Prices in ₹",
    note: "Shown up front",
    ring: "bg-blue-soft text-blue",
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    note: "Quick enquiries",
    ring: "bg-lime-soft text-navy",
  },
];

const at = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function HeroItem({
  delay,
  className,
  children,
}: {
  delay: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`hero-item ${className ?? ""}`} style={at(delay)}>
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Ambient wash, pure CSS so it scales to any viewport */}
      <div aria-hidden className="hero-wash absolute inset-0 -z-10" />

      <Container>
        <div className="pb-[clamp(2.5rem,5vw,5rem)] pt-[clamp(2rem,5.5vw,4.5rem)]">
          <div className="max-w-[40rem]">
            <HeroItem delay={0}>
              <Eyebrow>{site.tagline}</Eyebrow>
            </HeroItem>

            <HeroItem delay={90} className="mt-3.5 sm:mt-5">
              <h1 id="hero-heading" className="text-h1 [text-wrap:normal]">
                Golden Pieces
                <br />
                for Every{" "}
                <span className="box-decoration-clone rounded-[0.2em] bg-lime-soft px-[0.12em] text-navy">
                  Home.
                </span>
              </h1>
            </HeroItem>

            <HeroItem delay={170} className="mt-4 sm:mt-6">
              <p className="text-lead max-w-[38ch] text-muted sm:max-w-[42ch]">
                Figurines, vases, flower stands and serving trays. Every piece
                shows its price in rupees, and you can enquire on WhatsApp.
              </p>
            </HeroItem>

            <HeroItem delay={250} className="mt-7 sm:mt-9">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
                <ButtonLink
                  href="/products"
                  variant="accent"
                  size="lg"
                  withArrow
                >
                  View Products
                </ButtonLink>
                <ButtonLink href={site.whatsappHref} variant="outline" size="lg">
                  Enquire on WhatsApp
                </ButtonLink>
              </div>
            </HeroItem>
          </div>

          <HeroItem
            delay={340}
            className="mt-[clamp(2.5rem,6vw,4.5rem)]"
          >
            <ul className="grid max-w-[30rem] grid-cols-3 gap-[clamp(0.5rem,2vw,2rem)]">
              {highlights.map(({ icon: Icon, title, note, ring }) => (
                <li
                  key={title}
                  className="group flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  <span
                    className={`grid size-[2.75rem] place-items-center rounded-2xl transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:scale-105 sm:size-[3.125rem] ${ring}`}
                  >
                    <Icon className="size-5 sm:size-[1.4rem]" />
                  </span>
                  <p className="mt-3 text-[0.8125rem] font-semibold text-navy sm:text-[0.9375rem]">
                    {title}
                  </p>
                  <p className="mt-1 text-[0.6875rem] text-muted sm:text-[0.8125rem]">
                    {note}
                  </p>
                </li>
              ))}
            </ul>
          </HeroItem>
        </div>
      </Container>
    </section>
  );
}
