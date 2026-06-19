"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCart } from "@/components/providers/CartProvider";
import { useQuickView } from "@/components/providers/QuickViewProvider";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { ProductMedia } from "./ProductMedia";
import { FEATURED } from "@/lib/products";
import { euro } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Featured() {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { add } = useCart();
  const { open } = useQuickView();
  const scrollTo = useScrollTo();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 821px)", () => {
        const el = track.current;
        if (!el) return;
        const amount = () => el.scrollWidth - window.innerWidth + 48;
        const tween = gsap.to(el, {
          x: () => -amount(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => "+=" + amount(),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => tween.kill();
      });
    },
    { scope: section },
  );

  return (
    <section ref={section} id="featured" className="relative bg-noche">
      <div className="h-[100svh] overflow-x-auto md:h-screen md:overflow-hidden [scrollbar-width:none]">
        <div
          ref={track}
          className="flex h-full snap-x snap-mandatory items-center gap-6 px-5 md:snap-none md:gap-8 md:px-[6vw]"
        >
          {/* Intro */}
          <div className="flex h-full w-[88vw] shrink-0 snap-center flex-col justify-center md:w-[34vw]">
            <p className="eyebrow mb-5">/ Lo que se lleva</p>
            <h2 className="font-display text-[clamp(2.6rem,6vw,5rem)] font-extrabold leading-[0.9]">
              Los que <span className="holo-text">petan</span> esta semana
            </h2>
            <p className="mt-5 max-w-[32ch] text-niebla">
              Selección de lo más viral, actualizada cada lunes. Desliza para
              verlos →
            </p>
            <div className="mt-8 hidden items-center gap-3 text-niebla md:flex">
              <span className="font-mono text-xs tracking-[0.3em]">SCROLL</span>
              <span className="h-[1px] w-16 bg-gradient-to-r from-lila to-transparent" />
            </div>
          </div>

          {/* Productos */}
          {FEATURED.map((p, i) => (
            <article
              key={p.id}
              className="group relative flex h-full w-[86vw] shrink-0 snap-center flex-col justify-center md:w-[40vw] lg:w-[34vw]"
            >
              <span className="pointer-events-none absolute right-2 top-[12%] font-display text-[7rem] font-extrabold leading-none text-white/[0.04] md:text-[10rem]">
                {String(i + 1).padStart(2, "0")}
              </span>

              <button
                onClick={() => open(p)}
                data-cursor-label="VER"
                className="relative aspect-[5/6] w-full overflow-hidden rounded-[1.6rem] border border-white/10"
              >
                <ProductMedia
                  product={p}
                  rounded="rounded-none"
                  className="h-full w-full transition-transform duration-700 group-hover:scale-105"
                />
                {p.badge && (
                  <span
                    className="absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[0.62rem] font-bold tracking-[0.15em] text-noche"
                    style={{ background: "var(--holo)" }}
                  >
                    {p.badge}
                  </span>
                )}
              </button>

              <div className="mt-5 flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-bold leading-tight">
                    {p.name}
                  </h3>
                  <p className="mt-1 max-w-[26ch] text-sm text-niebla">
                    {p.tagline}
                  </p>
                </div>
                <span className="shrink-0 font-display text-2xl font-extrabold holo-text-static">
                  {euro(p.price)}
                </span>
              </div>

              <button
                onClick={() => add(p)}
                data-cursor
                className="btn-ghost mt-5 justify-center"
              >
                Añadir al carrito +
              </button>
            </article>
          ))}

          {/* Outro */}
          <div className="flex h-full w-[80vw] shrink-0 snap-center flex-col items-start justify-center md:w-[26vw]">
            <h3 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[0.95]">
              ¿Y esto es <span className="holo-text">solo</span> el principio?
            </h3>
            <p className="mt-4 text-niebla">Sí. Hay muchísimo más abajo.</p>
            <button
              onClick={() => scrollTo("#tienda")}
              data-cursor
              className="btn-holo mt-7"
            >
              Ver toda la tienda →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
