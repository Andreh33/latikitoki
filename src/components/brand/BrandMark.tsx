"use client";

import { cn } from "@/lib/utils";

/** Una letra que late siempre (las "t" de tikitoki). */
function Beat({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="beat" style={{ animationDelay: `${delay}s` }}>
      {children}
    </span>
  );
}

/** Wordmark "tikitoki" con las T latiendo + disco de marca. */
export function BrandMark({
  withText = true,
  className,
  size = "md",
}: {
  withText?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const disc =
    size === "lg" ? "h-11 w-11" : size === "sm" ? "h-7 w-7" : "h-8 w-8";
  const text =
    size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";

  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span className={cn("relative flex items-center justify-center", disc)}>
        <span className="absolute inset-0 rounded-full bg-[var(--holo)] blur-[2px]" />
        <span className="absolute inset-[3px] rounded-full bg-noche" />
        <span className="relative font-display text-sm font-extrabold holo-text-static">
          <Beat>T</Beat>
        </span>
      </span>
      {withText && (
        <span
          className={cn("font-display font-extrabold tracking-tight", text)}
        >
          <Beat delay={0.1}>t</Beat>iki<Beat delay={0.45}>t</Beat>oki
        </span>
      )}
    </span>
  );
}
