"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SPARK_COLORS = ["#b7a2ff", "#82e6ff", "#ff97d6", "#ffe15c", "#ffffff"];

/**
 * Cursor personalizado: punto + anillo con inercia, crece sobre interactivos,
 * muestra etiqueta (data-cursor-label) y deja un rastro de purpurina.
 * Se desactiva en táctil. Los nodos se renderizan siempre (refs válidos).
 */
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (!fine) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    const label = labelRef.current;
    const sparkLayer = sparkRef.current;
    if (!ring || !dot || !label || !sparkLayer) return;

    const xRing = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });

    let visible = false;
    let lastSpark = 0;

    const spawnSpark = (x: number, y: number) => {
      const s = document.createElement("span");
      s.textContent = "✦";
      const size = 7 + Math.random() * 11;
      s.style.cssText = `position:absolute;left:${
        x + (Math.random() - 0.5) * 18
      }px;top:${y + (Math.random() - 0.5) * 18}px;font-size:${size}px;color:${
        SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0]
      };text-shadow:0 0 8px currentColor;transform:translate(-50%,-50%);animation:twinkle ${
        500 + Math.random() * 400
      }ms ease-out forwards;will-change:transform,opacity;`;
      sparkLayer.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    };

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([ring, dot], { autoAlpha: 1, duration: 0.3 });
      }
      xRing(e.clientX);
      yRing(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);

      const now = performance.now();
      if (now - lastSpark > 42) {
        lastSpark = now;
        spawnSpark(e.clientX, e.clientY);
      }
    };

    const setHover = (active: boolean, text?: string) => {
      gsap.to(ring, {
        scale: active ? (text ? 2.6 : 1.9) : 1,
        borderColor: active
          ? "rgba(183,162,255,0.95)"
          : "rgba(183,162,255,0.5)",
        backgroundColor: active
          ? "rgba(183,162,255,0.10)"
          : "rgba(183,162,255,0)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: active ? 0 : 1, duration: 0.3 });
      label.textContent = text ?? "";
      gsap.to(label, { autoAlpha: text ? 1 : 0, duration: 0.25 });
    };

    const sel = "a, button, [data-cursor], input, textarea";
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.<HTMLElement>(sel);
      if (el) setHover(true, el.dataset.cursorLabel);
    };
    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(sel);
      const related = (e.relatedTarget as HTMLElement)?.closest?.(sel);
      if (el && el !== related) setHover(false);
    };
    const onDown = () => gsap.to(ring, { scale: 0.8, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: 1, duration: 0.3 });
    const onLeave = () => {
      visible = false;
      gsap.to([ring, dot], { autoAlpha: 0, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={sparkRef} className="pointer-events-none fixed inset-0 z-[9998] hidden md:block" aria-hidden />
      <div
        className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
        aria-hidden
      >
        <div
          ref={ringRef}
          className="absolute -left-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full border opacity-0"
          style={{ borderColor: "rgba(183,162,255,0.5)" }}
        >
          <span
            ref={labelRef}
            className="font-mono text-[9px] font-semibold tracking-widest text-crema opacity-0"
          />
        </div>
        <div
          ref={dotRef}
          className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-crema opacity-0"
        />
      </div>
    </>
  );
}
