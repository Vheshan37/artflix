"use client";

import React, { useState } from "react";
import { Plus, Minus, Share, ArrowRight } from "lucide-react";

const SIZES = [
  "4in x 6in",
  "6in x 8in",
  "A4 (8in x 11.5in)",
  "10in x 15in",
  "A3 (11.5in x 16.5in)",
  "12in x 18in",
];

export default function FeaturedProduct() {
  const [selectedSize, setSelectedSize] = useState(SIZES[2]);
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="bg-charcoal py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: Product Image */}
        <div className="relative group perspective-1000">
          <div className="absolute -inset-4 bg-gold/10 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl transition-transform duration-700 transform group-hover:rotate-y-2 group-hover:rotate-x-2 group-hover:scale-[1.02]">
            <img
              src="/works/482979563_605933535612164_6920470823351063224_n.jpg"
              alt="Premium Frameless Wall Art"
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
            {/* Minimal overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent opacity-60" />

            <div className="absolute bottom-10 left-10 text-ivory drop-shadow-lg">
              <h4 className="font-serif italic text-4xl mb-2">Happy Birthday</h4>
              <p className="text-[9px] uppercase tracking-widest opacity-80 max-w-[300px] leading-relaxed">
                A small reminder of all our beautiful moments. Put everything else on hold, because
                today is all about you.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col">
          <span className="text-[11px] font-semibold tracking-[0.4em] uppercase text-gold mb-4">
            Digital Colour Lab
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory font-normal leading-tight mb-4">
            Premium Frameless <br /> Wall Art <span className="text-3xl">📸✨</span>
          </h2>
          <p className="text-xl text-platinum/80 mb-10 font-medium">Rs 3,500.00 LKR</p>

          <div className="mb-8">
            <h4 className="text-xs uppercase tracking-widest text-platinum/60 mb-4">Frame Size</h4>
            <div className="flex flex-wrap gap-3">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-2.5 rounded-full text-xs transition-all duration-300 border ${
                    selectedSize === size
                      ? "bg-gold border-gold text-obsidian shadow-[0_0_15px_rgba(184,150,106,0.3)]"
                      : "bg-transparent border-platinum/20 text-platinum hover:border-gold/50 hover:text-gold"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h4 className="text-xs uppercase tracking-widest text-platinum/60 mb-4">Quantity</h4>
            <div className="flex items-center w-36 border border-platinum/20 rounded-full p-1 bg-obsidian/30">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 text-platinum/60 hover:text-gold transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="flex-1 text-center text-ivory text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 text-platinum/60 hover:text-gold transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 mb-8">
            <button className="w-full py-4 rounded-full border border-platinum/20 text-ivory text-sm tracking-widest uppercase hover:bg-ivory hover:text-obsidian transition-all duration-300">
              Add to cart
            </button>
            <button className="w-full py-4 rounded-full bg-gold text-obsidian text-sm tracking-widest uppercase font-medium hover:brightness-110 hover:shadow-[0_0_20px_rgba(184,150,106,0.4)] transition-all duration-300">
              Order Now
            </button>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-platinum/10">
            <button className="flex items-center gap-2 text-xs text-platinum/60 hover:text-gold transition-colors uppercase tracking-widest">
              <Share size={14} />
              Share
            </button>
            <button className="flex items-center gap-2 text-xs text-platinum/60 hover:text-gold transition-colors uppercase tracking-widest">
              View full details
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
