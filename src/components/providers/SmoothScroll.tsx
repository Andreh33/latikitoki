"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollContextValue {
  scrollTo: (target: string | number, opts?: { offset?: number }) => void;
}

const ScrollContext = createContext<ScrollContextValue>({ scrollTo: () => {} });

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Empezar siempre arriba (evita restauración de scroll del navegador)
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: reduce ? 0 : 1.15,
      lerp: reduce ? 1 : 0.09,
      smoothWheel: !reduce,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    lenis.scrollTo(0, { immediate: true });

    // Sincronizar Lenis con el ticker de GSAP y ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Refresca medidas cuando todo está listo
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 600);

    return () => {
      gsap.ticker.remove(update);
      window.removeEventListener("load", refresh);
      clearTimeout(t);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo: ScrollContextValue["scrollTo"] = (target, opts) => {
    lenisRef.current?.scrollTo(target, {
      offset: opts?.offset ?? -40,
      duration: 1.4,
    });
  };

  return (
    <ScrollContext.Provider value={{ scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrollTo() {
  return useContext(ScrollContext).scrollTo;
}
