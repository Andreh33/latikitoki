"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useQuickView } from "@/components/providers/QuickViewProvider";
import { useCart } from "@/components/providers/CartProvider";
import { ProductMedia } from "./ProductMedia";
import { CATEGORY_MAP } from "@/lib/products";
import { euro } from "@/lib/utils";

const PERKS = [
  "Envío a toda España en 24–72h",
  "Pago seguro: tarjeta, Bizum, PayPal",
  "Devolución gratis en 14 días",
  "Atención por WhatsApp 7 días/semana",
];

export function QuickView() {
  const { product, close } = useQuickView();
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const discount = product?.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-noche/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="glass-strong relative z-10 grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[1.8rem] border border-white/12 md:grid-cols-2"
          >
            <button
              onClick={close}
              data-cursor
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-noche/50 text-niebla transition-colors hover:text-crema"
            >
              ✕
            </button>

            {/* Media */}
            <div className="p-4 md:p-5">
              <ProductMedia
                product={product}
                className="aspect-square w-full"
                rounded="rounded-[1.4rem]"
              />
            </div>

            {/* Detalle */}
            <div className="flex flex-col p-6 md:py-8 md:pr-8">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-lila">
                {CATEGORY_MAP[product.category].name} · {product.proof}
              </p>
              <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight">
                {product.name}
              </h2>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-azul">★★★★★</span>
                <span className="font-mono text-xs text-niebla">
                  {product.rating.toFixed(1)} · valoración media
                </span>
              </div>

              <p className="mt-4 text-niebla">{product.seo}</p>

              <div className="mt-5 flex items-end gap-3">
                <span className="font-display text-4xl font-extrabold holo-text-static">
                  {euro(product.price)}
                </span>
                {product.compareAt && (
                  <span className="mb-1 text-lg text-niebla/60 line-through">
                    {euro(product.compareAt)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="mb-1 rounded-full bg-azul/15 px-2 py-0.5 font-mono text-xs font-bold text-azul">
                    −{discount}%
                  </span>
                )}
              </div>

              {/* Cantidad + añadir */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center gap-4 rounded-full border border-white/15 px-4 py-3">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    data-cursor
                    aria-label="Menos"
                    className="text-niebla hover:text-crema"
                  >
                    −
                  </button>
                  <span className="w-5 text-center font-mono">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    data-cursor
                    aria-label="Más"
                    className="text-niebla hover:text-crema"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => {
                    add(product, qty);
                    close();
                  }}
                  data-cursor-label="¡SÍ!"
                  className="btn-holo flex-1 justify-center"
                >
                  Añadir al carrito · {euro(product.price * qty)}
                </button>
              </div>

              {/* Perks */}
              <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {PERKS.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-xs text-niebla"
                  >
                    <span className="holo-text-static">✦</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
