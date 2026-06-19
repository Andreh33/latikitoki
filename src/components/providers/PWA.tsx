"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TikiMascot } from "@/components/brand/TikiMascot";

interface BIPEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const WEEK = 7 * 86_400_000;
const KEY = "tk-install-ts";

/** Registra el service worker y muestra el aviso de instalación 1 vez/semana. */
export function PWA() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const onBIP = (e: Event) => {
      e.preventDefault();
      const standalone = window.matchMedia("(display-mode: standalone)").matches;
      if (standalone) return;
      let last = 0;
      try {
        last = Number(localStorage.getItem(KEY) || 0);
      } catch {
        /* ignore */
      }
      // Date.now en cliente está permitido
      if (Date.now() - last > WEEK) {
        setDeferred(e as BIPEvent);
        setShow(true);
      }
    };

    window.addEventListener("beforeinstallprompt", onBIP);
    window.addEventListener("appinstalled", () => setShow(false));
    return () => window.removeEventListener("beforeinstallprompt", onBIP);
  }, []);

  const stamp = () => {
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    stamp();
    setShow(false);
  };

  const dismiss = () => {
    stamp();
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="glass-strong fixed bottom-4 left-1/2 z-[250] flex w-[min(92vw,420px)] -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/12 p-3"
        >
          <TikiMascot expression="happy" className="h-12 w-12 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold">Instala La TikiToki</p>
            <p className="text-xs text-niebla">
              Acceso directo en tu móvil. Como una app.
            </p>
          </div>
          <button
            onClick={install}
            data-cursor
            className="rounded-full px-3.5 py-2 text-xs font-bold text-noche"
            style={{ background: "var(--holo)" }}
          >
            Instalar
          </button>
          <button
            onClick={dismiss}
            data-cursor
            aria-label="Ahora no"
            className="text-niebla hover:text-crema"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
