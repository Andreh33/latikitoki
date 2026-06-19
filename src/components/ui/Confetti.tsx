"use client";

import { useMemo } from "react";

const COLORS = ["#b7a2ff", "#82e6ff", "#ff97d6", "#ffe15c", "#8b5cf6", "#ffffff"];

/** Lluvia de confeti holográfico. Se renderiza cuando `show` es true. */
export function Confetti({ show, count = 90 }: { show: boolean; count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        dur: 1.8 + Math.random() * 1.6,
        size: 6 + Math.random() * 8,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        round: Math.random() > 0.5,
        drift: (Math.random() - 0.5) * 120,
      })),
    [count],
  );

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[400] overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.i}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * (p.round ? 1 : 1.6),
            background: p.color,
            borderRadius: p.round ? "9999px" : "2px",
            // @ts-expect-error custom prop usado por la animación
            "--drift": `${p.drift}px`,
            animation: `confettiFall ${p.dur}s ${p.delay}s ease-in forwards`,
            boxShadow: `0 0 8px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
