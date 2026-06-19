import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Featured } from "@/components/sections/Featured";
import { Categories } from "@/components/sections/Categories";
import { Catalog } from "@/components/sections/Catalog";
import { Values } from "@/components/sections/Values";
import { SocialWall } from "@/components/sections/SocialWall";
import { Newsletter } from "@/components/sections/Newsletter";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Manifesto />
      <Featured />
      <Categories />
      <Catalog />
      <Values />
      <SocialWall />
      <Newsletter />
      <Footer />
    </main>
  );
}
