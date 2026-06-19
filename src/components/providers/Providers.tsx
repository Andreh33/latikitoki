"use client";

import { CartProvider } from "./CartProvider";
import { QuickViewProvider } from "./QuickViewProvider";
import { SmoothScroll } from "./SmoothScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Preloader } from "@/components/sections/Preloader";
import { Nav } from "@/components/sections/Nav";
import { CartDrawer } from "@/components/sections/CartDrawer";
import { QuickView } from "@/components/sections/QuickView";
import { PWA } from "./PWA";
import { Atmosphere } from "@/components/fx/Atmosphere";
import { ScreenFX } from "@/components/fx/ScreenFX";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <QuickViewProvider>
        <SmoothScroll>
          <Atmosphere />
          <Preloader />
          <ScrollProgress />
          <Nav />
          {children}
          <CartDrawer />
          <QuickView />
          <PWA />
          <ScreenFX />
        </SmoothScroll>
      </QuickViewProvider>
    </CartProvider>
  );
}
