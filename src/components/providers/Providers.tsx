"use client";

import { CartProvider } from "./CartProvider";
import { QuickViewProvider } from "./QuickViewProvider";
import { SmoothScroll } from "./SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Preloader } from "@/components/sections/Preloader";
import { Nav } from "@/components/sections/Nav";
import { CartDrawer } from "@/components/sections/CartDrawer";
import { QuickView } from "@/components/sections/QuickView";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <QuickViewProvider>
        <SmoothScroll>
          <Preloader />
          <Cursor />
          <ScrollProgress />
          <Nav />
          {children}
          <CartDrawer />
          <QuickView />
        </SmoothScroll>
      </QuickViewProvider>
    </CartProvider>
  );
}
