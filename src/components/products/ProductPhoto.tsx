import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Product photo that is never cropped. The photo is fitted inside its frame
 * (`object-contain`), and any leftover space is filled with a blurred,
 * enlarged copy of the same photo so the frame never shows flat bands.
 *
 * Both layers use the same `src` and `sizes`, so the browser downloads the
 * file once. Place inside a `relative` frame with a fixed aspect ratio.
 */
export function ProductPhoto({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Classes for the sharp photo layer, e.g. hover zoom. */
  className?: string;
}) {
  return (
    <>
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        priority={priority}
        className="scale-110 object-cover blur-2xl"
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-contain object-center", className)}
      />
    </>
  );
}
