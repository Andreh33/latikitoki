"use client";

import { createContext, useContext, useState } from "react";
import type { Product } from "@/lib/products";

interface QuickViewValue {
  product: Product | null;
  open: (p: Product) => void;
  close: () => void;
}

const QuickViewContext = createContext<QuickViewValue | null>(null);

export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);
  return (
    <QuickViewContext.Provider
      value={{ product, open: setProduct, close: () => setProduct(null) }}
    >
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const ctx = useContext(QuickViewContext);
  if (!ctx) throw new Error("useQuickView dentro de <QuickViewProvider>");
  return ctx;
}
