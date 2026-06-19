"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTS, type Product } from "@/lib/products";

interface StoredLine {
  id: string;
  qty: number;
}
export interface CartLine {
  product: Product;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  lastAdded: string | null;
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "tikitoki-cart";
const PRODUCT_INDEX = new Map(PRODUCTS.map((p) => [p.id, p]));

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [stored, setStored] = useState<StoredLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  // Hidratar desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStored(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  // Persistir
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* ignore */
    }
  }, [stored]);

  const lines = useMemo<CartLine[]>(
    () =>
      stored
        .map((l) => {
          const product = PRODUCT_INDEX.get(l.id);
          return product ? { product, qty: l.qty } : null;
        })
        .filter(Boolean) as CartLine[],
    [stored],
  );

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((s, l) => s + l.product.price * l.qty, 0),
    [lines],
  );

  const add = useCallback((product: Product, qty = 1) => {
    setStored((prev) => {
      const existing = prev.find((l) => l.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.id === product.id ? { ...l, qty: l.qty + qty } : l,
        );
      }
      return [...prev, { id: product.id, qty }];
    });
    setLastAdded(product.id);
    setIsOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setStored((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setStored((prev) =>
      qty <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const clear = useCallback(() => setStored([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    isOpen,
    lastAdded,
    add,
    remove,
    setQty,
    clear,
    open,
    close,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
