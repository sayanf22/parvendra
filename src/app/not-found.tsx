import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="hero-wash absolute inset-0 -z-10" />
      <Container>
        <div className="flex min-h-[58vh] flex-col items-start justify-center py-[clamp(3rem,8vw,6rem)]">
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="mt-4 max-w-[20ch] text-h1">
            This page could not be <span className="text-blue">found.</span>
          </h1>
          <p className="text-lead mt-5 max-w-[46ch] text-muted">
            The link you followed does not exist. The catalogue and the quote
            form are a click away.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="/" size="lg" withArrow>
              Back to home
            </ButtonLink>
            <ButtonLink href="/products" variant="outline" size="lg">
              Browse products
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
