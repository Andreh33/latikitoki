"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

// Solo se muestra una vez por carga de página, aunque el componente se remonte.
let shownOnce = false;

/** Pantalla de carga de marca: contador 0→100 y cortina que se levanta. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(shownOnce);

  useGSAP(
    () => {
      if (shownOnce) return;
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          shownOnce = true;
          setDone(true);
        },
      });

      tl.to(counter, {
        v: 100,
        duration: 1.7,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countRef.current)
            countRef.current.textContent = String(Math.round(counter.v)).padStart(
              3,
              "0",
            );
          if (barRef.current)
            barRef.current.style.transform = `scaleX(${counter.v / 100})`;
        },
      })
        .to(".pl-word", { yPercent: -110, duration: 0.7, ease: "power3.inOut", stagger: 0.04 }, "+=0.15")
        .to(".pl-meta", { autoAlpha: 0, duration: 0.3 }, "<")
        .to(
          root.current,
          { yPercent: -100, duration: 0.9, ease: "expo.inOut" },
          "-=0.2",
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
      <div className="overflow-hidden">
        <div className="flex items-end gap-[0.06em] leading-none">
          {"tikitoki".split("").map((c, i) => (
            <span
              key={i}
              className="pl-word holo-text-static font-display text-[14vw] font-extrabold md:text-[9rem]"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="pl-meta mt-6 flex w-[min(80vw,420px)] flex-col items-center gap-3">
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            ref={barRef}
            className="h-full w-full origin-left"
            style={{ background: "var(--holo)", transform: "scaleX(0)" }}
          />
        </div>
        <div className="flex w-full items-center justify-between font-mono text-[0.7rem] tracking-[0.3em] text-niebla">
          <span>CARGANDO EL HYPE</span>
          <span>
            <span ref={countRef}>000</span>%
          </span>
        </div>
      </div>
    </div>
  );
}
