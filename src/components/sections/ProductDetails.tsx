"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";
import MagneticButton from "../MagneticButton";

const FRAMES = [
  { id: "glossy", name: "Glossy Finish", img: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=400&auto=format&fit=crop" },
  { id: "matte", name: "Matte Finish", img: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=400&auto=format&fit=crop" },
  { id: "canvas", name: "Canvas Texture", img: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=400&auto=format&fit=crop" },
];

export default function ProductDetails() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState("walnut");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = gsap.utils.selector(sectionRef);
    gsap.fromTo(
      elements(".reveal-prod"),
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <section id="product" ref={sectionRef} className="bg-obsidian py-40 px-10 md:px-16 min-h-screen">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        
        {/* Left visually sticky column */}
        <div className="lg:sticky lg:top-32 h-auto flex flex-col gap-2 reveal-prod">
          <div 
            ref={containerRef}
            className="relative w-full aspect-[4/5] bg-graphite overflow-hidden select-none cursor-ew-resize touch-none"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerMove={handlePointerMove}
          >
            {/* After */}
            <div 
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop')" }}
            />
            {/* Before */}
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale pointer-events-none brightness-75"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop&sat=-100')",
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
               }}
            />
            
            {/* Handle */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-gold pointer-events-none z-10"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-gold border-2 border-white/20 rounded-full flex items-center justify-center text-[10px] text-obsidian font-bold tracking-tighter">
                &lsaquo; &rsaquo;
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-5 inset-x-5 flex justify-between pointer-events-none">
              <span className="text-[9px] tracking-[0.2em] uppercase text-white/70 drop-shadow-md">Before</span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-white/70 drop-shadow-md">After</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="aspect-square bg-cover bg-center brightness-75 hover:brightness-95 transition-all" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=400&auto=format&fit=crop')" }} />
            <div className="aspect-square bg-cover bg-center brightness-75 hover:brightness-95 transition-all" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop')" }} />
            <div className="aspect-square bg-cover bg-center brightness-75 hover:brightness-95 transition-all" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop')" }} />
          </div>
        </div>

        {/* Right Details Column */}
        <div className="flex flex-col justify-center">
          <Link href="/catalogue" className="reveal-prod flex items-center gap-3 text-[9px] tracking-[0.2em] uppercase text-platinum/50 hover:text-gold transition-colors duration-300 mb-8 w-fit group">
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">&larr;</span> Back to Catalogue
          </Link>
          
          <p className="reveal-prod text-[9px] tracking-[0.35em] uppercase text-gold mb-5">Premium Collectibles &middot; Laminated Edition 2025</p>
          <h1 className="reveal-prod font-serif text-[clamp(36px,4vw,56px)] font-light leading-[1.1] text-ivory mb-8">
            Birthday<br /><em className="italic text-gold">Frameless</em><br />Wall Art
          </h1>

          <div className="reveal-prod text-[9px] tracking-[0.3em] uppercase text-platinum border-b border-platinum/10 pb-3 mb-5">The Story</div>
          <p className="reveal-prod text-[14px] leading-[1.9] text-platinum/70 mb-11 font-light">
            A celebration of a cherished moment, enhanced with expert digital retouching to restore perfect lighting and tonal balance. We carefully print and finish this piece with a high-end protective lamination, producing an elegantly frameless wall art piece that breathes life into any modern space without the clutter of a physical wooden frame.
          </p>

          <div className="reveal-prod text-[9px] tracking-[0.3em] uppercase text-platinum border-b border-platinum/10 pb-3 mb-5">Select Lamination Finish</div>
          <div className="reveal-prod grid grid-cols-3 gap-3 mb-11">
            {FRAMES.map((f) => (
              <div 
                key={f.id} 
                onClick={() => setSelectedFrame(f.id)}
                className={clsx(
                  "relative border border-platinum/10 cursor-none transition-all duration-300 group overflow-hidden",
                  selectedFrame === f.id && "border-gold"
                )}
              >
                <div className="aspect-square bg-cover bg-center brightness-75 transition-all group-hover:brightness-90" style={{ backgroundImage: `url('${f.img}')` }} />
                <div className="p-2.5 text-[9px] tracking-[0.18em] uppercase text-platinum truncate">
                  {f.name}
                </div>
                <div className={clsx(
                  "absolute top-2 right-2 w-5 h-5 bg-gold rounded-full flex items-center justify-center text-obsidian text-[10px] transition-opacity duration-300",
                  selectedFrame === f.id ? "opacity-100" : "opacity-0 group-hover:opacity-30"
                )}>
                  &#10003;
                </div>
              </div>
            ))}
          </div>

          <div className="reveal-prod text-[9px] tracking-[0.3em] uppercase text-platinum border-b border-platinum/10 pb-3 mb-5">Dimensions</div>
          <div className="reveal-prod grid grid-cols-2 gap-4 mb-12">
            {[
              { label: "Print Width", value: "60 cm" },
              { label: "Print Height", value: "80 cm" },
              { label: "Thickness", value: "8 mm" },
              { label: "Mounting Style", value: "Frameless" },
            ].map((dim, i) => (
              <div key={i} className="border-t border-platinum/10 pt-3">
                <div className="text-[9px] tracking-[0.2em] uppercase text-platinum/45 mb-1.5">{dim.label}</div>
                <div className="font-serif text-[22px] text-ivory font-light">{dim.value}</div>
              </div>
            ))}
          </div>

          <div className="reveal-prod">
             <button className="w-full relative overflow-hidden inline-flex justify-center border border-platinum/30 text-ivory text-[10px] font-medium tracking-[0.28em] uppercase px-12 py-5 transition-colors duration-400 group hover:border-gold hover:text-obsidian magnetic cursor-none">
              <div className="absolute inset-x-0 bottom-0 bg-gold origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-y-100 h-full" />
              <span className="relative z-10">Contact to Order</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
