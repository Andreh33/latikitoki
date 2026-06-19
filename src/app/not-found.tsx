"use client";

import { useState } from "react";
import Link from "next/link";
import { TikiMascot } from "@/components/brand/TikiMascot";
import { Confetti } from "@/components/ui/Confetti";

const STARS = [
  { x: 18, y: 26 },
  { x: 78, y: 20 },
  { x: 30, y: 70 },
  { x: 84, y: 66 },
  { x: 52, y: 14 },
];

export default function NotFound() {
  const [lit, setLit] = useState<Set<number>>(new Set());
  const won = lit.size >= STARS.length;

  const light = (i: number) =>
    setLit((prev) => {
      const next = new Set(prev);
      next.add(i);
      return next;
    });

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-noche px-5 text-center">
      <div className="bg-grid absolute inset-0 opacity-40" />
      <div
        className="glow-spot anim-pulse-glow left-1/2 top-1/2 h-[60vh] w-[70vw] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "var(--holo)", opacity: 0.25 }}
      />
      <Confetti show={won} />

      {/* estrellas del juego */}
      {STARS.map((s, i) => (
        <button
          key={i}
          onClick={() => light(i)}
          aria-label="Encender estrella"
          className="absolute z-10 text-3xl transition-all duration-300"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            color: lit.has(i) ? "#ffe15c" : "rgba(255,255,255,0.25)",
            textShadow: lit.has(i) ? "0 0 18px #ffe15c" : "none",
            transform: lit.has(i) ? "scale(1.3)" : "scale(1)",
          }}
        >
          ✦
        </button>
      ))}

      <div className="relative z-20 flex flex-col items-center">
        <p className="font-display text-[18vw] font-extrabold leading-none holo-text md:text-[10rem]">
          404
        </p>

        <TikiMascot
          expression={won ? "happy" : "dizzy"}
          float
          className="my-4 h-28 w-28 drop-shadow-[0_8px_30px_rgba(139,92,246,0.5)]"
        />

        {won ? (
          <>
            <h1 className="font-display text-2xl font-extrabold md:text-3xl">
              ¡Lo has traído de vuelta! 🎉
            </h1>
            <p className="mt-2 text-niebla">
              Toma un <span className="holo-text-static font-bold">−10%</span> por
              el rescate:
            </p>
            <p className="mt-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-mono text-lg font-bold tracking-widest">
              PERDIDO10
            </p>
          </>
        ) : (
          <>
            <h1 className="font-display text-2xl font-extrabold md:text-3xl">
              Tiki se ha perdido en la galaxia
            </h1>
            <p className="mt-2 max-w-[36ch] text-niebla">
              Enciende las {STARS.length} estrellas para traerlo a casa.
            </p>
            <p className="mt-3 font-mono text-sm holo-text-static">
              {lit.size} / {STARS.length}
            </p>
          </>
        )}

        <Link href="/" className="btn-holo mt-7" data-cursor>
          {won ? "Llévame a la tienda →" : "Volver al inicio"}
        </Link>
      </div>
    </main>
  );
}
