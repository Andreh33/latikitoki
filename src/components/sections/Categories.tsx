"use client";

import Image from "next/image";
import { Reveal } from "@/components/text/Reveal";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { CATEGORIES, PRODUCTS, type CategoryKey } from "@/lib/products";
import { cn } from "@/lib/utils";

export const FILTER_EVENT = "tk:filter";

function countOf(key: CategoryKey) {
  return PRODUCTS.filter((p) => p.category === key).length;
}

const SPANS: Record<CategoryKey, string> = {
  iluminacion: "md:col-span-2 md:row-span-2",
  tech: "md:col-span-2",
  hogar: "md:col-span-1",
  selfcare: "md:col-span-1",
  accesorios: "md:col-span-2",
};

export function Categories() {
  const scrollTo = useScrollTo();

  const goToCategory = (key: CategoryKey | "all") => {
    window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: key }));
    scrollTo("#tienda");
  };

  return (
    <section
      id="categorias"
      className="mx-auto max-w-[1400px] px-5 py-28 md:px-8"
    >
      <Reveal>
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4">/ Explora por mundo</p>
            <h2 className="t-h1 font-display font-extrabold">
              Elige tu <span className="holo-text">vibe</span>
            </h2>
          </div>
          <p className="max-w-[36ch] text-niebla">
            Cinco universos, una misma energía. Toca uno y te llevamos directo a
            lo bueno.
          </p>
        </div>
      </Reveal>

      <div className="grid auto-rows-[230px] grid-cols-1 gap-4 md:grid-cols-4">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.key} delay={i * 0.05} className={cn(SPANS[c.key])}>
            <button
              onClick={() => goToCategory(c.key)}
              data-cursor-label="VER"
              className="group relative h-full w-full overflow-hidden rounded-[1.6rem] border border-white/10 text-left transition-colors duration-300 hover:border-[rgba(183,162,255,0.45)]"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-40 mix-blend-soft-light"
                style={{
                  background: `linear-gradient(140deg, hsl(${c.hue} 90% 65%), transparent 70%)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noche via-noche/45 to-noche/5" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="mb-1 font-mono text-[0.62rem] tracking-[0.2em] text-crema/70">
                  {countOf(c.key)} PRODUCTOS
                </span>
                <h3 className="font-display text-2xl font-extrabold md:text-3xl">
                  {c.name}
                </h3>
                <p className="mt-1 text-sm text-niebla">{c.blurb}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-crema opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  Ver colección →
                </span>
              </div>
            </button>
          </Reveal>
        ))}

        {/* CTA tile */}
        <Reveal delay={0.3} className="md:col-span-2">
          <button
            onClick={() => goToCategory("all")}
            data-cursor
            className="holo-ring group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[1.6rem] p-6 text-left"
          >
            <div
              className="glow-spot -right-10 -top-10 h-40 w-40 opacity-40 transition-opacity group-hover:opacity-70"
              style={{ background: "var(--holo)" }}
            />
            <h3 className="font-display text-2xl font-extrabold md:text-3xl">
              Ver <span className="holo-text">todo</span> el catálogo
            </h3>
            <p className="mt-1 text-sm text-niebla">
              +30 productos virales y subiendo →
            </p>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
