"use client";

import { useState, useEffect } from "react";
import { Reveal } from "@/components/text/Reveal";
import { ProductMedia } from "./ProductMedia";
import { useCart } from "@/components/providers/CartProvider";
import { useQuickView } from "@/components/providers/QuickViewProvider";
import { BEST_SELLER } from "@/lib/products";
import { euro } from "@/lib/utils";

const PERKS = [
  "El que más nos piden y el que más repite",
  "Efecto inmediato en cualquier cuarto",
  "El favorito para regalar (y autorregalarse)",
];

export function ProductoDelMes() {
  const { add } = useCart();
  const { open } = useQuickView();
  const p = BEST_SELLER;
  const [month, setMonth] = useState("");

  useEffect(() => {
    setMonth(
      new Date().toLocaleDateString("es-ES", { month: "long" }).toUpperCase(),
    );
  }, []);

  return (
    <section className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32">
      <div
        className="glow-spot anim-pulse-glow left-1/2 top-1/2 h-[60vh] w-[55vw] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "var(--holo)", opacity: 0.3 }}
      />

      <div className="mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-2">
        {/* Escenario */}
        <Reveal className="order-2 md:order-1">
          <div className="relative mx-auto flex aspect-square max-w-[460px] items-center justify-center">
            {/* pedestal */}
            <div
              className="absolute bottom-[14%] h-10 w-[62%] rounded-[50%] blur-xl"
              style={{ background: "var(--holo)", opacity: 0.55 }}
            />
            {/* producto flotando */}
            <div className="anim-float relative w-[72%]">
              <div className="holo-ring overflow-hidden rounded-[2rem] p-2 shadow-[0_30px_80px_-20px_rgba(139,92,246,0.7)]">
                <ProductMedia
                  product={p}
                  className="aspect-square w-full"
                  rounded="rounded-[1.6rem]"
                />
              </div>
              {/* reflejo */}
              <div
                className="absolute left-2 right-2 top-[101%] h-24 scale-y-[-1] opacity-25 blur-[2px]"
                style={{
                  maskImage: "linear-gradient(to bottom, #000, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000, transparent)",
                }}
              >
                <ProductMedia
                  product={p}
                  className="aspect-square w-full"
                  rounded="rounded-[1.6rem]"
                />
              </div>
            </div>
            {/* destellos */}
            <span className="holo-text-static absolute left-[8%] top-[18%] text-2xl">
              ✦
            </span>
            <span className="holo-text-static absolute right-[12%] top-[30%] text-lg">
              ✦
            </span>
            <span className="holo-text-static absolute bottom-[28%] right-[6%] text-xl">
              ✦
            </span>
          </div>
        </Reveal>

        {/* Detalle */}
        <Reveal delay={0.1} className="order-1 md:order-2">
          <div className="flex items-center gap-3">
            <span
              className="rounded-full px-3 py-1 font-mono text-[0.62rem] font-bold tracking-[0.18em] text-noche"
              style={{ background: "var(--holo)" }}
            >
              ★ PRODUCTO DE {month || "ESTE MES"}
            </span>
          </div>

          <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,4rem)] font-extrabold leading-[0.95]">
            {p.name}
          </h2>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-azul">★★★★★</span>
            <span className="font-mono text-xs text-niebla">
              {p.rating.toFixed(1)} · {p.proof}
            </span>
          </div>

          <p className="mt-4 max-w-[42ch] text-lg text-niebla">{p.tagline}</p>

          <ul className="mt-5 space-y-2">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-2 text-sm text-crema/90">
                <span className="holo-text-static">✦</span>
                {perk}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-extrabold holo-text-static">
                {euro(p.price)}
              </span>
              {p.compareAt && (
                <span className="text-lg text-niebla/60 line-through">
                  {euro(p.compareAt)}
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => add(p)} data-cursor-label="¡SÍ!" className="btn-holo">
              Lo quiero →
            </button>
            <button onClick={() => open(p)} data-cursor className="btn-ghost">
              Vista rápida
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
