"use client";

import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

interface StreakData {
  count: number;
  best: number;
  last: string;
  claimed: boolean;
}

const INITIAL: StreakData = { count: 0, best: 0, last: "", claimed: false };
const dayMs = 86_400_000;
const today = () => new Date().toISOString().slice(0, 10);

/** Racha de visitas diarias. Suma +1 cada día consecutivo, resetea si se rompe. */
export function useStreak() {
  const [data, setData, ready] = useLocalStorage<StreakData>(
    "tk-streak",
    INITIAL,
  );

  useEffect(() => {
    if (!ready) return;
    const t = today();
    if (data.last === t) return; // ya contado hoy

    setData((prev) => {
      const diff = prev.last
        ? Math.round((Date.parse(t) - Date.parse(prev.last)) / dayMs)
        : 1;
      const count = diff === 1 ? prev.count + 1 : 1;
      return {
        count,
        best: Math.max(prev.best, count),
        last: t,
        claimed: count >= 35 ? prev.claimed : false,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const claim = () => setData((p) => ({ ...p, claimed: true }));

  return { ...data, claim, ready };
}
