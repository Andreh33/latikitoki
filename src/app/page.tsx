import { Hero } from "@/components/sections/Hero";
import { ProductoDelMes } from "@/components/sections/ProductoDelMes";
import { Manifesto } from "@/components/sections/Manifesto";
import { Featured } from "@/components/sections/Featured";
import { Categories } from "@/components/sections/Categories";
import { Catalog } from "@/components/sections/Catalog";
import { TuCuarto } from "@/components/sections/TuCuarto";
import { Arcade } from "@/components/sections/Arcade";
import { ClubSection } from "@/components/sections/ClubSection";
import { Values } from "@/components/sections/Values";
import { SocialWall } from "@/components/sections/SocialWall";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/sections/Footer";
import { LiquidDivider } from "@/components/ui/LiquidDivider";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <div className="relative overflow-hidden">
        {/* Puente de aurora vibrante: une el producto destacado con el manifiesto */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="aurora-bridge h-[42rem] w-[42rem] max-w-[92vw] rounded-full" />
        </div>
        <ProductoDelMes />
        <Manifesto />
      </div>
      <Featured />
      <Categories />
      <Catalog />
      <TuCuarto />
      <LiquidDivider />
      <Arcade />
      <ClubSection />
      <Values />
      <SocialWall />
      <LiquidDivider />
      <Newsletter />
      <Footer />
    </main>
  );
}
