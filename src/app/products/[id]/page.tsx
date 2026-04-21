import Navbar from "@/components/Navbar";
import ProductDetails from "@/components/sections/ProductDetails";
import Footer from "@/components/sections/Footer";

export default function ProductPage() {
  return (
    <main className="w-full bg-obsidian selection:bg-gold/30 selection:text-ivory relative z-0 min-h-screen pt-20">
      <Navbar />
      {/* We can pass the id to ProductDetails if it fetched from a DB, for now we render UI */}
      <ProductDetails />
      <Footer />
    </main>
  );
}
