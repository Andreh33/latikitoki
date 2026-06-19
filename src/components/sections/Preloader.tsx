"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { TikiMascot, type TikiExpression } from "@/components/brand/TikiMascot";

// Solo una vez por carga de página, aunque el componente se remonte.
let shownOnce = false;

/** Intro de marca cinematográfica con Tiki, logo cinético y reveal líquido. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(shownOnce);
  const [expr, setExpr] = useState<TikiExpression>("happy");

  useGSAP(
    () => {
      if (shownOnce) {
        setDone(true);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          shownOnce = true;
          setDone(true);
        },
      });

      gsap.set(".in-line-fill", { scaleX: 0, transformOrigin: "left" });

      tl.from(".in-tiki", {
        scale: 0,
        rotate: -30,
        autoAlpha: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
      })
        .from(
          ".in-la",
          { yPercent: 120, autoAlpha: 0, duration: 0.5, ease: "power3.out" },
          "-=0.2",
        )
        .from(
          ".in-letter",
          {
            yPercent: 130,
            autoAlpha: 0,
            rotateX: -60,
            duration: 0.7,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.25",
        )
        .from(
          ".in-tag",
          { autoAlpha: 0, y: 12, duration: 0.5 },
          "-=0.3",
        )
        .to(".in-line-fill", { scaleX: 1, duration: 1, ease: "power2.inOut" }, "-=0.4")
        .call(() => setExpr("wink"))
        .to({}, { duration: 0.35 })
        // salida líquida hacia arriba
        .to(".in-content", { yPercent: -40, autoAlpha: 0, duration: 0.6, ease: "power2.in" })
        .to(
          root.current,
          { yPercent: -118, duration: 0.95, ease: "expo.inOut" },
          "-=0.35",
        );
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-noche"
    >
      {/* aurora suave de fondo */}
      <div
        className="glow-spot anim-pulse-glow left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "var(--holo)", opacity: 0.35 }}
      />
      <div className="bg-grid absolute inset-0 opacity-40" />

      <button
        onClick={() => {
          shownOnce = true;
          setDone(true);
        }}
        className="absolute right-5 top-5 font-mono text-[0.65rem] tracking-[0.25em] text-niebla transition-colors hover:text-crema"
      >
        SALTAR ✕
      </button>

      <div className="in-content relative flex flex-col items-center px-6">
        <TikiMascot
          expression={expr}
          float
          className="in-tiki mb-6 h-28 w-28 drop-shadow-[0_8px_30px_rgba(139,92,246,0.5)]"
        />

        <p className="in-la mb-1 font-display text-lg font-semibold tracking-[0.35em] text-niebla">
          LA
        </p>
        <h1 className="flex overflow-hidden font-display text-[14vw] font-extrabold leading-none md:text-[7rem]">
          {"TIKITOKI".split("").map((c, i) => (
            <span key={i} className="in-letter holo-text-static inline-block">
              {c}
            </span>
          ))}
        </h1>

        <p className="in-tag mt-5 font-mono text-[0.7rem] tracking-[0.4em] text-niebla">
          LO VIRAL, ANTES QUE NADIE
        </p>

        <div className="in-line mt-7 h-[2px] w-[min(70vw,320px)] overflow-hidden rounded-full bg-white/10">
          <div
            className="in-line-fill h-full w-full"
            style={{ background: "var(--holo)" }}
          />
        </div>
      </div>

      {/* borde líquido inferior (se levanta revelando el hero) */}
      <svg
        className="pointer-events-none absolute left-0 top-full w-full"
        style={{ height: "140px" }}
        viewBox="0 0 1200 140"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,0 H1200 V42 C1050,150 950,18 800,74 C650,128 520,8 380,72 C240,132 120,28 0,62 Z"
          fill="#070411"
        />
      </svg>
    </div>
  );
}
