"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number; // segundos por ciclo
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}

/** Cinta infinita horizontal: duplica el grupo para un loop perfecto al -50%. */
export function Marquee({
  children,
  speed = 32,
  reverse = false,
  className,
  pauseOnHover = false,
}: MarqueeProps) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{
          animation: `marqueeX ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center gap-8 pr-8">{children}</div>
        <div
          aria-hidden
          className="flex shrink-0 items-center gap-8 pr-8"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
