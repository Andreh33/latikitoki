"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type TikiExpression =
  | "happy"
  | "wink"
  | "love"
  | "wow"
  | "cool"
  | "dizzy";

interface TikiProps {
  expression?: TikiExpression;
  className?: string;
  float?: boolean;
}

/**
 * Tiki — la mascota de La TikiToki. Criatura holográfica con expresiones.
 * SVG puro (sin assets), gradiente de marca y ojos brillantes.
 */
export function TikiMascot({
  expression = "happy",
  className,
  float = false,
}: TikiProps) {
  const id = useId().replace(/:/g, "");
  const body = `body-${id}`;
  const gloss = `gloss-${id}`;
  const glow = `glow-${id}`;

  return (
    <svg
      viewBox="0 0 200 210"
      className={cn(float && "tiki-bob", className)}
      role="img"
      aria-label="Tiki, la mascota de La TikiToki"
    >
      <defs>
        <linearGradient id={body} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c8b8ff" />
          <stop offset="48%" stopColor="#9fe9ff" />
          <stop offset="100%" stopColor="#ffb4e2" />
        </linearGradient>
        <radialGradient id={gloss} cx="0.35" cy="0.28" r="0.5">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Antena estrella */}
      <g filter={`url(#${glow})`}>
        <path
          d="M100 6 L104 20 L118 22 L106 30 L110 44 L100 35 L90 44 L94 30 L82 22 L96 20 Z"
          fill="#fff3c4"
        />
      </g>
      <line x1="100" y1="36" x2="100" y2="56" stroke="#c8b8ff" strokeWidth="3" />

      {/* Cuerpo blob */}
      <g filter={`url(#${glow})`}>
        <path
          d="M100 52 C150 52 182 86 182 128 C182 172 148 200 100 200 C52 200 18 172 18 128 C18 86 50 52 100 52 Z"
          fill={`url(#${body})`}
        />
        <path
          d="M100 52 C150 52 182 86 182 128 C182 172 148 200 100 200 C52 200 18 172 18 128 C18 86 50 52 100 52 Z"
          fill={`url(#${gloss})`}
        />
      </g>

      {/* Mejillas */}
      <ellipse cx="58" cy="146" rx="13" ry="9" fill="#ff8fd0" opacity="0.55" />
      <ellipse cx="142" cy="146" rx="13" ry="9" fill="#ff8fd0" opacity="0.55" />

      {/* Ojos + boca por expresión */}
      <Face expression={expression} />
    </svg>
  );
}

function Eye({ x, shine = true }: { x: number; shine?: boolean }) {
  return (
    <g>
      <ellipse cx={x} cy="118" rx="14" ry="17" fill="#1a0f33" />
      {shine && <circle cx={x + 4} cy="112" r="4.5" fill="#fff" />}
      {shine && <circle cx={x - 4} cy="122" r="2.2" fill="#fff" opacity="0.7" />}
    </g>
  );
}

function Face({ expression }: { expression: TikiExpression }) {
  switch (expression) {
    case "wink":
      return (
        <>
          <Eye x={74} />
          <path
            d="M114 118 q12 -9 24 0"
            stroke="#1a0f33"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M84 150 q16 16 32 0"
            stroke="#1a0f33"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
    case "love":
      return (
        <>
          <Heart x={74} />
          <Heart x={126} />
          <path
            d="M82 150 q18 18 36 0"
            stroke="#1a0f33"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
    case "wow":
      return (
        <>
          <Eye x={74} />
          <Eye x={126} />
          <ellipse cx="100" cy="156" rx="11" ry="14" fill="#1a0f33" />
        </>
      );
    case "cool":
      return (
        <>
          <rect x="50" y="104" width="100" height="26" rx="13" fill="#1a0f33" />
          <rect x="58" y="110" width="32" height="10" rx="5" fill="#82e6ff" opacity="0.7" />
          <rect x="110" y="110" width="32" height="10" rx="5" fill="#b7a2ff" opacity="0.7" />
          <path
            d="M84 152 q16 14 32 0"
            stroke="#1a0f33"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
    case "dizzy":
      return (
        <>
          <path d="M66 110 l16 16 M82 110 l-16 16" stroke="#1a0f33" strokeWidth="5" strokeLinecap="round" />
          <path d="M118 110 l16 16 M134 110 l-16 16" stroke="#1a0f33" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="100" cy="154" rx="9" ry="11" fill="#1a0f33" />
        </>
      );
    default: // happy
      return (
        <>
          <Eye x={74} />
          <Eye x={126} />
          <path
            d="M80 148 q20 22 40 0"
            stroke="#1a0f33"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
        </>
      );
  }
}

function Heart({ x }: { x: number }) {
  return (
    <path
      d={`M${x} 128 c-6 -10 -20 -6 -20 4 c0 8 12 15 20 21 c8 -6 20 -13 20 -21 c0 -10 -14 -14 -20 -4 Z`}
      fill="#ff5fa8"
    />
  );
}
