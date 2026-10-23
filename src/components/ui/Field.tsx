import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const control =
  "w-full rounded-2xl border bg-surface-2 px-4 py-3.5 text-[0.9375rem] text-ink " +
  "placeholder:text-muted transition-[border-color,box-shadow,background-color] duration-300 " +
  "hover:border-navy/30 focus:border-navy focus:bg-white focus:outline-none focus:ring-4 focus:ring-lime-soft/60";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={htmlFor} className="text-[0.8125rem] font-semibold text-navy">
          {label}
        </label>
        {required && (
          <span className="rounded-pill bg-lime-soft px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-navy">
            Required
          </span>
        )}
      </div>
      {children}
      {hint && !error && (
        <p className="text-[0.75rem] text-muted">{hint}</p>
      )}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-[0.75rem] font-medium text-berry"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function inputClass(error?: string) {
  return cn(control, error ? "border-berry/70" : "border-line");
}

export function selectClass(error?: string) {
  return cn(
    control,
    "appearance-none bg-[length:0.7rem] bg-[right_1.1rem_center] bg-no-repeat pr-11",
    error ? "border-berry/70" : "border-line"
  );
}

/** Inline chevron for native selects, encoded to avoid an extra request. */
export const selectArrow = {
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none' stroke='%2332211a' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M1 1.5 6 6.5l5-5'/%3E%3C/svg%3E\")",
} as const;
