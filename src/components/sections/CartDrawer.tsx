"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/components/providers/CartProvider";
import { useScrollTo } from "@/components/providers/SmoothScroll";
import { ProductMedia } from "./ProductMedia";
import { euro, clamp } from "@/lib/utils";

const FREE_SHIPPING = 30;

export function CartDrawer() {
  const { lines, subtotal, count, isOpen, close, setQty, remove } = useCart();
  const scrollTo = useScrollTo();
  const [checkout, setCheckout] = useState(false);

  const remaining = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = clamp((subtotal / FREE_SHIPPING) * 100, 0, 100);

  const handleClose = () => {
    setCheckout(false);
    close();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-noche/70 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="glass-strong absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col border-l border-white/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-baseline gap-2">
                <h3 className="font-display text-2xl font-extrabold">
                  Tu carrito
                </h3>
                <span className="font-mono text-xs text-niebla">({count})</span>
              </div>
              <button
                onClick={handleClose}
                data-cursor
                aria-label="Cerrar carrito"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-niebla transition-colors hover:text-crema"
              >
                ✕
              </button>
            </div>

            {/* Barra de envío gratis */}
            {count > 0 && (
              <div className="px-6 pb-4">
                <p className="mb-2 text-xs text-niebla">
                  {remaining > 0 ? (
                    <>
                      Te faltan{" "}
                      <span className="font-semibold text-crema">
                        {euro(remaining)}
                      </span>{" "}
                      para el envío gratis 🚀
                    </>
                  ) : (
                    <span className="font-semibold holo-text-static">
                      ¡Envío gratis conseguido! 🎉
                    </span>
                  )}
                </p>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%`, background: "var(--holo)" }}
                  />
                </div>
              </div>
            )}

            {/* Contenido */}
            <div className="flex-1 overflow-y-auto px-6">
              {count === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-full text-3xl"
                    style={{ background: "var(--holo)" }}
                  >
                    🛍️
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold">
                      Tu carrito está vacío
                    </p>
                    <p className="mt-1 text-sm text-niebla">
                      Pero no por mucho tiempo 👀
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      handleClose();
                      scrollTo("#tienda");
                    }}
                    className="btn-holo"
                    data-cursor
                  >
                    Explorar la tienda
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col gap-4 py-2">
                  <AnimatePresence initial={false}>
                    {lines.map((line) => (
                      <motion.li
                        key={line.product.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-4"
                      >
                        <ProductMedia
                          product={line.product}
                          className="h-20 w-20 shrink-0"
                          rounded="rounded-xl"
                        />
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <p className="text-sm font-semibold leading-tight">
                              {line.product.name}
                            </p>
                            <button
                              onClick={() => remove(line.product.id)}
                              data-cursor
                              aria-label="Quitar"
                              className="text-niebla transition-colors hover:text-rosa"
                            >
                              ✕
                            </button>
                          </div>
                          <p className="mt-0.5 text-xs text-niebla">
                            {euro(line.product.price)}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-3 rounded-full border border-white/15 px-3 py-1">
                              <button
                                onClick={() =>
                                  setQty(line.product.id, line.qty - 1)
                                }
                                data-cursor
                                aria-label="Menos"
                                className="text-niebla transition-colors hover:text-crema"
                              >
                                −
                              </button>
                              <span className="w-4 text-center font-mono text-sm">
                                {line.qty}
                              </span>
                              <button
                                onClick={() =>
                                  setQty(line.product.id, line.qty + 1)
                                }
                                data-cursor
                                aria-label="Más"
                                className="text-niebla transition-colors hover:text-crema"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-mono text-sm font-semibold">
                              {euro(line.product.price * line.qty)}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {count > 0 && (
              <div className="border-t border-white/10 px-6 py-5">
                {checkout ? (
                  <div className="space-y-3 text-center">
                    <p className="font-display text-lg font-bold holo-text-static">
                      Pedido casi listo ✨
                    </p>
                    <p className="text-xs leading-relaxed text-niebla">
                      La pasarela de pago (Stripe Checkout) está preparada para
                      conectarse. Al añadir las claves, este botón llevará al pago
                      real con tarjeta, Bizum, Apple&nbsp;Pay y Google&nbsp;Pay.
                    </p>
                    <button
                      onClick={() => setCheckout(false)}
                      className="btn-ghost w-full justify-center"
                      data-cursor
                    >
                      Volver al carrito
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm text-niebla">Subtotal</span>
                      <span className="font-display text-2xl font-extrabold">
                        {euro(subtotal)}
                      </span>
                    </div>
                    <button
                      onClick={() => setCheckout(true)}
                      className="btn-holo w-full justify-center"
                      data-cursor
                    >
                      Tramitar pedido →
                    </button>
                    <p className="mt-3 text-center text-[11px] text-niebla">
                      Envío e impuestos calculados al pagar · Devoluciones 14 días
                    </p>
                  </>
                )}
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
