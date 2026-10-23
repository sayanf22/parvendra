import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/**
 * Intrinsic size of `public/logo.webp`, so Next reserves the right box and no
 * layout shift lands when the mark loads.
 */
const LOGO_SIZE = 512;

export function Logo({
  className,
  imageClassName,
  onDark = false,
}: {
  className?: string;
  imageClassName?: string;
  /**
   * Set on dark surfaces. The brown badge would sink into the near-black
   * footer, so it sits on a cream plate there.
   */
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center transition-opacity duration-300 hover:opacity-85",
        className
      )}
      aria-label={`${site.name} — home`}
    >
      <span
        className={cn(
          onDark &&
            "inline-flex rounded-full bg-cream-soft p-1.5 shadow-[0_2px_14px_rgb(0_0_0/0.35)]"
        )}
      >
        <Image
          src="/logo.webp"
          alt={site.name}
          width={LOGO_SIZE}
          height={LOGO_SIZE}
          /* The header mark is above the fold on every route. The footer copy is not. */
          priority={!onDark}
          loading={onDark ? "lazy" : undefined}
          sizes="(min-width: 1024px) 80px, (min-width: 640px) 68px, 60px"
          className={cn(
            "h-[3rem] w-[3rem] sm:h-[3.4rem] sm:w-[3.4rem] lg:h-[4rem] lg:w-[4rem]",
            imageClassName
          )}
        />
      </span>
    </Link>
  );
}
