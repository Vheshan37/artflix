import Hero from "@/components/sections/Hero";
import ArtisanTouch from "@/components/sections/ArtisanTouch";
import Services from "@/components/sections/Services";
import FeaturedProduct from "@/components/sections/FeaturedProduct";
import TopProducts from "@/components/sections/TopProducts";
import AlbumView from "@/components/sections/AlbumView";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="w-full bg-obsidian selection:bg-gold/30 selection:text-ivory relative z-0">
      <Navbar />
      <Hero />
      <FeaturedProduct />
      <TopProducts />
      <ArtisanTouch />
      <Services />
      <AlbumView />
      <Footer />
    </main>
  );
}
