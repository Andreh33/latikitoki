"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProductCard } from "./ProductCard";
import { FILTER_EVENT } from "./Categories";
import { Reveal } from "@/components/text/Reveal";
import {
  CATEGORIES,
  productsByCategory,
  type CategoryKey,
} from "@/lib/products";
import { cn } from "@/lib/utils";

type Filter = CategoryKey | "all";

const CHIPS: { key: Filter; label: string }[] = [
  { key: "all", label: "Todo" },
  ...CATEGORIES.map((c) => ({ key: c.key as Filter, label: c.name })),
];

export function Catalog() {
  const [filter, setFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(24);

  useEffect(() => {
    const onFilter = (e: Event) => {
      const detail = (e as CustomEvent).detail as Filter;
      setFilter(detail);
    };
    window.addEventListener(FILTER_EVENT, onFilter);
    return () => window.removeEventListener(FILTER_EVENT, onFilter);
  }, []);

  useEffect(() => setVisible(24), [filter]);

  const items = productsByCategory(filter);
  const shown = items.slice(0, visible);

  return (
    <section id="tienda" className="mx-auto max-w-[1400px] px-5 py-28 md:px-8">
      <Reveal>
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">/ La tienda</p>
            <h2 className="t-h1 font-display font-extrabold">
              Todo lo que <span className="holo-text">necesitas</span>
              <br />
              (y un poco más)
            </h2>
          </div>
          <p className="font-mono text-xs tracking-[0.2em] text-niebla">
            {items.length} PRODUCTOS
          </p>
        </div>
      </Reveal>

      {/* Filtros */}
      <div className="mb-10 flex flex-wrap gap-2.5">
        {CHIPS.map((chip) => {
          const active = filter === chip.key;
          return (
            <button
              key={chip.key}
              onClick={() => setFilter(chip.key)}
              data-cursor
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300",
                active
                  ? "text-noche"
                  : "border border-white/15 text-niebla hover:border-white/40 hover:text-crema",
              )}
              style={active ? { background: "var(--holo)" } : undefined}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4"
        >
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </motion.div>
      </AnimatePresence>

      {items.length > visible && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + 24)}
            data-cursor
            className="btn-ghost"
          >
            Ver más productos ({items.length - visible})
          </button>
        </div>
      )}
    </section>
  );
}
