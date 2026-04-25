"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

// Real price list from Artflics
const SIZES = [
  { size: "5×5", price: 850 },
  { size: "6×6", price: 1000 },
  { size: "6×8", price: 1300 },
  { size: "8×10", price: 1800 },
  { size: "8×12", price: 2000 },
  { size: "10×12", price: 2300 },
  { size: "10×15", price: 2500 },
  { size: "12×15", price: 3000 },
  { size: "12×18", price: 3500 },
  { size: "16×24", price: 6500 },
];

const FINISHES = [
  { id: "glossy", name: "Glossy", desc: "High-shine, vibrant finish" },
  { id: "matte", name: "Matte", desc: "Soft, elegant, no glare" },
  { id: "canvas", name: "Canvas", desc: "Textured artistic feel" },
];

export default function ProductDetails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedSize, setSelectedSize] = useState(SIZES[3]); // default 8×10
  const [selectedFinish, setSelectedFinish] = useState("glossy");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const elements = gsap.utils.selector(sectionRef);
    gsap.fromTo(
      elements(".reveal-prod"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const totalPrice = selectedSize.price * quantity;

  const whatsappMessage = encodeURIComponent(
    `Hello Artflics! I'd like to order a Frameless Wall Art:\n📐 Size: ${selectedSize.size} inches\n✨ Finish: ${selectedFinish}\n🔢 Quantity: ${quantity}\n💰 Total: Rs ${totalPrice.toLocaleString()} LKR\n\nPlease let me know the next steps. 🙏`
  );

  return (
    <section
      id="product"
      ref={sectionRef}
      className="bg-obsidian py-32 px-6 md:px-16 min-h-screen"
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* ─── Left: Image + Thumbnails ─── */}
        <div className="lg:sticky lg:top-28 flex flex-col gap-3 reveal-prod">
          {/* Before/After Slider */}
          <div
            ref={containerRef}
            className="relative w-full aspect-[4/5] bg-graphite overflow-hidden select-none cursor-ew-resize touch-none rounded-sm"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerMove={handlePointerMove}
          >
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: "url('/works/524331837_706514065554110_4268118539056236746_n.jpg')" }}
            />
            <div
              className="absolute inset-0 bg-cover bg-center grayscale pointer-events-none brightness-75"
              style={{
                backgroundImage: "url('/works/524331837_706514065554110_4268118539056236746_n.jpg')",
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
            />
            {/* Slider handle */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-gold pointer-events-none z-10"
              style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-2 border-white/20 rounded-full flex items-center justify-center text-[10px] text-obsidian font-bold bg-gold shadow-lg"
              >
                ‹ ›
              </div>
            </div>
            <div className="absolute bottom-4 inset-x-4 flex justify-between pointer-events-none">
              <span className="text-[9px] tracking-[0.2em] uppercase text-white/60">Before</span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-white/60">After</span>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-2">
            {[
              "/works/524401289_708029228735927_5106487507539885658_n.jpg",
              "/works/532243718_721489777389872_6677289994051051575_n.jpg",
              "/works/537359103_727863823419134_488152008974869960_n.jpg",
            ].map((src, i) => (
              <div
                key={i}
                className="aspect-square bg-cover bg-center brightness-60 hover:brightness-90 transition-all duration-300 rounded-sm cursor-pointer border border-white/5"
                style={{ backgroundImage: `url('${src}')` }}
              />
            ))}
          </div>
        </div>

        {/* ─── Right: Product Details ─── */}
        <div className="flex flex-col">
          <Link
            href="/catalogue"
            className="reveal-prod flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-platinum/40 hover:text-gold transition-colors duration-300 mb-8 w-fit group"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Back to Catalogue
          </Link>

          <p className="reveal-prod text-[10px] tracking-[0.4em] uppercase text-gold mb-4 font-semibold">
            Digital Colour Lab · Premium Frameless Wall Art
          </p>
          <h1 className="reveal-prod font-serif text-[clamp(36px,4vw,52px)] font-normal leading-[1.1] text-ivory mb-2">
            Frameless <em className="italic text-gold">Wall Art</em>
          </h1>
          <p className="reveal-prod text-sm text-platinum/60 font-normal mb-10 leading-relaxed max-w-[500px]">
            Expert digital retouching with premium lamination finish. High-definition
            print that transforms your precious moments into stunning frameless wall pieces.
          </p>

          {/* ─── Price Display ─── */}
          <div className="reveal-prod flex items-end gap-3 mb-10 p-5 rounded-sm border border-gold/10 bg-gold/[0.03]">
            <span className="font-serif text-[44px] font-normal text-ivory leading-none">
              Rs {selectedSize.price.toLocaleString()}
            </span>
            <span className="text-platinum/50 text-sm mb-2">LKR / piece</span>
            <span className="ml-auto text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full font-bold bg-gold text-obsidian">
              {selectedSize.size}&quot;
            </span>
          </div>

          {/* ─── Size & Price Grid ─── */}
          <div className="reveal-prod text-[9px] tracking-[0.3em] uppercase text-platinum/50 border-b border-white/10 mb-5 pb-3">
            Select Size (inches) — Price (LKR)
          </div>
          <div className="reveal-prod grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-10">
            {SIZES.map((s) => {
              const isSelected = selectedSize.size === s.size;
              return (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s)}
                  className={clsx(
                    "relative flex flex-col items-center justify-center py-3 px-2 text-center border transition-all duration-300 rounded-sm group",
                    isSelected ? "bg-gold border-gold text-obsidian" : "border-white/10 text-platinum/60 hover:border-gold/30 hover:text-ivory"
                  )}
                >
                  <span className="text-[13px] font-serif font-light leading-tight">{s.size}&quot;</span>
                  <span className={clsx("text-[10px] mt-0.5", isSelected ? "text-obsidian/70" : "text-platinum/40")}>
                    Rs {s.price.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ─── Finish Selection ─── */}
          <div className="reveal-prod text-[9px] tracking-[0.3em] uppercase text-platinum/50 border-b border-white/10 mb-5 pb-3">
            Lamination Finish
          </div>
          <div className="reveal-prod flex gap-3 mb-10">
            {FINISHES.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFinish(f.id)}
                className={clsx(
                  "flex-1 py-3 px-3 text-center border rounded-sm transition-all duration-300 text-[10px] tracking-widest uppercase",
                  selectedFinish === f.id ? "bg-gold/10 border-gold text-gold" : "border-white/10 text-platinum/50 hover:border-gold/30"
                )}
              >
                <div className="font-medium mb-0.5">{f.name}</div>
                <div className="text-[8px] normal-case tracking-normal opacity-60">{f.desc}</div>
              </button>
            ))}
          </div>

          {/* ─── Quantity ─── */}
          <div className="reveal-prod text-[9px] tracking-[0.3em] uppercase text-platinum/50 border-b border-white/10 mb-5 pb-3">
            Quantity
          </div>
          <div className="reveal-prod flex items-center gap-5 mb-10">
            <div className="flex items-center border border-white/10 rounded-full overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-5 py-3 text-platinum/60 hover:text-ivory hover:bg-white/5 transition-all text-lg"
              >−</button>
              <span className="px-6 text-ivory font-medium text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-5 py-3 text-platinum/60 hover:text-ivory hover:bg-white/5 transition-all text-lg"
              >+</button>
            </div>
            <div className="text-platinum/50 text-sm">
              Total: <span className="text-ivory font-medium">Rs {totalPrice.toLocaleString()} LKR</span>
            </div>
          </div>

          {/* ─── CTA Buttons ─── */}
          <div className="reveal-prod flex flex-col gap-3">
            <a
              href={`https://wa.me/94729644800?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-sm text-center text-obsidian bg-gold text-[11px] font-medium tracking-[0.25em] uppercase transition-all duration-300 hover:brightness-110"
            >
              Order via WhatsApp 💬
            </a>
            <a
              href="mailto:artflics1@gmail.com"
              className="w-full py-4 rounded-sm text-center text-ivory text-[11px] tracking-[0.25em] uppercase border border-white/10 hover:border-gold/40 hover:text-gold transition-all duration-300"
            >
              Email Inquiry
            </a>
          </div>

          {/* ─── Assurance badges ─── */}
          <div className="reveal-prod mt-8 flex flex-wrap gap-4 pt-6 border-t border-white/5">
            {["✓ Premium Lamination", "✓ Frameless Finish", "✓ Island-Wide Delivery", "✓ Custom Retouching"].map((b) => (
              <span key={b} className="text-[9px] tracking-widest uppercase text-platinum/35">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
