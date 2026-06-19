"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/** Envuelve un elemento para que sea "magnético": se acerca al cursor. */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    xTo.current = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1,0.4)" });
    yTo.current = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1,0.4)" });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      xTo.current?.(x);
      yTo.current?.(y);
    };
    const onLeave = () => {
      xTo.current?.(0);
      yTo.current?.(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </div>
  );
}
