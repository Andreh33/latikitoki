"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Separador líquido holográfico entre secciones: dos olas que fluyen en
 * sentidos opuestos + una línea de luz. Da sensación de transición líquida.
 */
export function LiquidDivider({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const g = `ld-${id}`;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none relative h-[70px] w-full overflow-hidden md:h-[90px]",
        flip && "rotate-180",
        className,
      )}
    >
      <svg className="absolute h-0 w-0">
        <defs>
          <linearGradient id={g} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b7a2ff" />
            <stop offset="50%" stopColor="#82e6ff" />
            <stop offset="100%" stopColor="#ff97d6" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="absolute bottom-0 left-[-25%] h-full w-[150%]"
        style={{ animation: "liquidShift 9s ease-in-out infinite" }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,70 C220,20 420,110 720,60 C1020,12 1220,108 1440,64 L1440,120 L0,120 Z"
          fill={`url(#${g})`}
          opacity="0.22"
        />
      </svg>
      <svg
        className="absolute bottom-0 left-[-25%] h-full w-[150%]"
        style={{ animation: "liquidShift 13s ease-in-out infinite reverse" }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,84 C260,40 480,120 760,80 C1040,40 1240,116 1440,86 L1440,120 L0,120 Z"
          fill={`url(#${g})`}
          opacity="0.14"
        />
      </svg>
      <div
        className="absolute inset-x-0 bottom-[34%] h-[1px] opacity-50 blur-[1px]"
        style={{ background: "var(--holo)" }}
      />
    </div>
  );
}
