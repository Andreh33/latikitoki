"use client";

import { createElement, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollIlluminateProps {
  text: string;
  /** Índices (0-based) de palabras que se encienden en lila intenso. */
  accent?: number[];
  className?: string;
  as?: "h2" | "h3" | "p" | "div";
  /** Reparte la activación a lo largo del scroll. */
  start?: string;
  end?: string;
}

/**
 * Texto que se ilumina palabra a palabra al hacer scroll.
 * Es LA interacción firma de la página: arranca apagado y se enciende.
 */
export function ScrollIlluminate({
  text,
  accent = [],
  className,
  as = "h2",
  start = "top 80%",
  end = "bottom 55%",
}: ScrollIlluminateProps) {
  const root = useRef<HTMLDivElement>(null);
  const accentSet = new Set(accent);
  const words = text.split(" ");
  const Tag = as as React.ElementType;

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>(".il-word", root.current);

      gsap.set(els, {
        color: "rgba(244,240,255,0.12)",
        textShadow: "0 0 0px rgba(139,92,246,0)",
      });

      gsap.to(els, {
        color: (i, el: HTMLElement) =>
          el.dataset.accent ? "#cbbcff" : "#f6f2ff",
        textShadow: (i, el: HTMLElement) =>
          el.dataset.accent
            ? "0 0 34px rgba(139,92,246,0.9), 0 0 9px rgba(130,230,255,0.65)"
            : "0 0 22px rgba(139,92,246,0.42)",
        ease: "none",
        stagger: 0.4,
        scrollTrigger: {
          trigger: root.current,
          start,
          end,
          scrub: 0.6,
        },
      });
    },
    { scope: root },
  );

  const content = words.map((w, i) => (
    <span
      key={i}
      className="il-word"
      data-accent={accentSet.has(i) ? "1" : undefined}
    >
      {w}
      {i < words.length - 1 ? " " : ""}
    </span>
  ));

  return (
    <div ref={root}>
      {createElement(Tag, { className: cn("text-balance", className) }, content)}
    </div>
  );
}
