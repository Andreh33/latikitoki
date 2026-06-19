"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/components/providers/CartProvider";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { Magnetic } from "@/components/ui/Magnetic";
import { BrandMark } from "@/components/brand/BrandMark";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Inicio", id: "inicio" },
  { label: "Tienda", id: "tienda" },
  { label: "Tu Cuarto", id: "cuarto" },
  { label: "Juegos", id: "juegos" },
  { label: "Club", id: "club" },
];

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 8h12l-1 12H7L6 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V6.5a3 3 0 0 1 6 0V8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Nav() {
  const { count, open } = useCart();
  const scrollTo = useScrollTo();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setMenu(false);
    scrollTo(`#${id}`, { offset: -10 });
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-8">
          {/* Wordmark */}
          <button
            onClick={() => go("inicio")}
            className="group flex items-center"
            data-cursor
            aria-label="La TikiToki — inicio"
          >
            <BrandMark />
          </button>

          {/* Links centro */}
          <nav
            className={cn(
              "absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 lg:flex",
              scrolled ? "glass-strong" : "glass",
            )}
          >
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                data-cursor
                className="rounded-full px-4 py-1.5 text-sm text-niebla transition-colors hover:text-crema"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            <Magnetic strength={0.4}>
              <button
                onClick={open}
                data-cursor
                aria-label="Abrir carrito"
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all",
                  scrolled ? "glass-strong" : "glass",
                )}
              >
                <BagIcon />
                <span className="hidden sm:inline">Carrito</span>
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 18 }}
                      className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 font-mono text-[10px] font-bold text-noche"
                      style={{ background: "var(--holo)" }}
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </Magnetic>

            {/* Hamburguesa */}
            <button
              onClick={() => setMenu((m) => !m)}
              data-cursor
              aria-label="Menú"
              className={cn(
                "flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden",
                scrolled ? "glass-strong" : "glass",
              )}
            >
              <span
                className={cn(
                  "h-[1.5px] w-5 bg-crema transition-all duration-300",
                  menu && "translate-y-[6.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "h-[1.5px] w-5 bg-crema transition-all duration-300",
                  menu && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "h-[1.5px] w-5 bg-crema transition-all duration-300",
                  menu && "-translate-y-[6.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-2 bg-noche/95 backdrop-blur-xl lg:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.button
                key={l.id}
                onClick={() => go(l.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06 }}
                className="font-display text-4xl font-extrabold text-crema"
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
