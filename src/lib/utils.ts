import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Une clases de Tailwind resolviendo conflictos. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatea un número como euros (es-ES): 34.99 -> "34,99 €" */
export function euro(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

/** Limita un valor entre min y max. */
export function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

/** Interpolación lineal. */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
