"use client";

import { motion } from "motion/react";
import { useCart } from "@/components/providers/CartProvider";
import { useQuickView } from "@/components/providers/QuickViewProvider";
import { ProductMedia } from "./ProductMedia";
import type { Product } from "@/lib/products";
import { euro } from "@/lib/utils";

function Badge({ label }: { label: string }) {
  const hot = label === "VIRAL" || label === "TOP VENTAS";
  return (
    <span
      className="rounded-full px-2.5 py-1 font-mono text-[0.6rem] font-bold tracking-[0.15em]"
      style={
        hot
          ? { background: "var(--holo)", color: "#1a0f33" }
          : {
              background: "rgba(7,4,17,0.6)",
              color: "#f4f0ff",
              border: "1px solid rgba(183,162,255,0.3)",
            }
      }
    >
      {label}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { open: onQuickView } = useQuickView();
  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex flex-col"
    >
      {/* Media */}
      <button
        onClick={() => onQuickView(product)}
        data-cursor-label="VER"
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-[1.4rem] border border-white/10 transition-colors duration-300 group-hover:border-[rgba(183,162,255,0.4)]"
      >
        <ProductMedia
          product={product}
          rounded="rounded-none"
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.badge && <Badge label={product.badge} />}
          {discount > 0 && (
            <span className="rounded-full bg-noche/70 px-2.5 py-1 font-mono text-[0.6rem] font-bold tracking-[0.1em] text-azul">
              −{discount}%
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-noche/60 px-2.5 py-1 backdrop-blur-sm">
          <span className="text-azul">★</span>
          <span className="font-mono text-[0.65rem] text-crema">
            {product.rating.toFixed(1)}
          </span>
        </div>

        {/* Overlay vista rápida */}
        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-noche/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="mb-4 rounded-full bg-crema/95 px-4 py-1.5 text-xs font-semibold text-noche">
            Vista rápida
          </span>
        </div>
      </button>

      {/* Info */}
      <div className="mt-4 flex flex-1 flex-col">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-lila">
          {product.proof}
        </p>
        <h3 className="mt-1 font-display text-lg font-bold leading-tight">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-niebla">
          {product.tagline}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-extrabold">
              {euro(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-sm text-niebla/60 line-through">
                {euro(product.compareAt)}
              </span>
            )}
          </div>
          <button
            onClick={() => add(product)}
            data-cursor
            aria-label={`Añadir ${product.name} al carrito`}
            className="flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold text-noche transition-transform active:scale-90"
            style={{ background: "var(--holo)" }}
          >
            Añadir
            <span className="text-base leading-none">+</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
