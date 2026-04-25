"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../MagneticButton";

const ITEMS = [
  {
    id: "1",
    title: "Frameless Sibling Portrait",
    frame: "Glossy Lamination",
    url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
    tall: false,
  },
  {
    id: "2",
    title: "Nordic Vista Print",
    frame: "Canvas Texture Laminate",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    tall: true,
  },
  {
    id: "3",
    title: "Wedding Polaroid Pack",
    frame: "Matte Finish",
    url: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?q=80&w=800&auto=format&fit=crop",
    tall: false,
  },
  {
    id: "4",
    title: "Émile — Custom Label",
    frame: "High-Quality Sticker",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    tall: false,
  },
  {
    id: "5",
    title: "Family Wall Art",
    frame: "Glossy Lamination",
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800&auto=format&fit=crop",
    tall: false,
  },
  {
    id: "6",
    title: "Business Identity Card",
    frame: "Premium Matte Card Stock",
    url: "https://images.unsplash.com/photo-1490750967868-88df5691cc9a?q=80&w=800&auto=format&fit=crop",
    tall: true,
  },
];

export default function Catalogue() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = gsap.utils.selector(sectionRef);
    gsap.fromTo(
      elements(".reveal-cat"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="catalogue"
      ref={sectionRef}
      className="bg-charcoal py-40 px-10 md:px-16 min-h-screen"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="reveal-cat">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-[1px] bg-gold" />
              <span className="text-[9px] font-medium tracking-[0.4em] uppercase text-gold">
                The Collection
              </span>
            </div>
            <h2 className="font-serif text-[clamp(36px,4vw,56px)] font-light leading-[1.1] text-ivory">
              Finished <em className="italic text-gold">Works</em>
            </h2>
          </div>

          <div className="flex gap-8 reveal-cat flex-wrap">
            {["All", "Frameless Wall Art", "Polaroid Packs", "Custom Prints", "Business Cards"].map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={clsx(
                    "text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 pb-2 relative group magnetic",
                    activeFilter === filter ? "text-ivory" : "text-platinum/45 hover:text-ivory"
                  )}
                >
                  {filter}
                  <span
                    className={clsx(
                      "absolute bottom-0 left-0 right-0 h-[1px] bg-gold transition-transform duration-300 origin-left",
                      activeFilter === filter ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </button>
              )
            )}
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {ITEMS.map((item, idx) => (
            <Link
              key={idx}
              href={`/products/${item.id}`}
              className={clsx(
                "break-inside-avoid relative overflow-hidden group block cursor-none reveal-cat bg-obsidian cursor-target",
                item.tall ? "aspect-[2/3]" : "aspect-[4/5]"
              )}
            >
              <div
                className="absolute inset-0 bg-cover bg-center brightness-75 transition-all duration-[0.8s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105 group-hover:brightness-90"
                style={{ backgroundImage: `url('${item.url}')` }}
              />

              <div className="absolute top-4 right-4 text-[8px] tracking-[0.22em] uppercase bg-obsidian/70 text-gold px-3 py-1.5 border border-gold/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-md">
                View Details
              </div>

              <div className="absolute inset-x-0 bottom-0 p-7 bg-gradient-to-t from-obsidian/90 to-transparent translate-y-4 opacity-70 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                <h4 className="font-serif text-[20px] font-light text-ivory mb-1">{item.title}</h4>
                <p className="text-[9px] tracking-[0.22em] uppercase text-gold">{item.frame}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-24 text-center reveal-cat">
          <MagneticButton href="/catalogue">View Full Catalogue &rarr;</MagneticButton>
        </div>
      </div>
    </section>
  );
}
