import { Hero } from "@/components/sections/Hero";
import { ProductoDelMes } from "@/components/sections/ProductoDelMes";
import { Manifesto } from "@/components/sections/Manifesto";
import { Featured } from "@/components/sections/Featured";
import { Categories } from "@/components/sections/Categories";
import { Catalog } from "@/components/sections/Catalog";
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
      <ProductoDelMes />
      <LiquidDivider />
      <Manifesto />
      <Featured />
      <Categories />
      <Catalog />
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
