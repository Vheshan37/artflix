import Navbar from "@/components/Navbar";
import Catalogue from "@/components/sections/Catalogue";
import Footer from "@/components/sections/Footer";

export default function CataloguePage() {
  return (
    <main className="w-full bg-obsidian selection:bg-gold/30 selection:text-ivory relative z-0 min-h-screen pt-20">
      <Navbar />
      <Catalogue />
      <Footer />
    </main>
  );
}
