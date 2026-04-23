"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ShinyText from "../ShinyText";
// Local interface since the package doesn't export the ref type
interface FlipBookRef {
  flipNext: () => void;
  flipPrev: () => void;
  flip: (page: number) => void;
  getCurrentPageIndex: () => number | undefined;
}
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Dynamically import to avoid SSR issues with page-flip
const ReactFlipBook = dynamic(
  () => import("@vuvandinh203/react-flipbook").then((m) => m.ReactFlipBook),
  { ssr: false }
);

const PHOTOS = [
  {
    img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=900&auto=format&fit=crop",
    caption: "The Bridal Elegance",
    year: "2024",
  },
  {
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop",
    caption: "Studio Portraiture",
    year: "2024",
  },
  {
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=900&auto=format&fit=crop",
    caption: "Editorial Fashion",
    year: "2024",
  },
  {
    img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=900&auto=format&fit=crop",
    caption: "Engagement Vows",
    year: "2024",
  },
  {
    img: "https://images.unsplash.com/photo-1554046920-90fb4d5ba644?q=80&w=900&auto=format&fit=crop",
    caption: "Monochrome Study",
    year: "2023",
  },
  {
    img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=900&auto=format&fit=crop",
    caption: "Interior Framing",
    year: "2023",
  },
  {
    img: "https://images.unsplash.com/photo-1519671482749-fd098f390099?q=80&w=900&auto=format&fit=crop",
    caption: "Macro Details",
    year: "2023",
  },
  {
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=900&auto=format&fit=crop",
    caption: "Classic Fine Art",
    year: "2023",
  },
];

// Leather cover page
const CoverPage = React.forwardRef<HTMLDivElement, Record<string, never>>((props, ref) => {
  return (
    <div
      ref={ref}
      className="page w-full h-full flex flex-col items-center justify-center relative overflow-hidden select-none bg-obsidian"
      style={{
        background:
          "linear-gradient(145deg, #2e1407 0%, #5c2e10 30%, #7a3d18 50%, #5c2e10 70%, #2e1407 100%)",
      }}
    >
      {/* Embossed outer border */}
      <div className="absolute inset-2" style={{ border: "1px solid rgba(212,175,85,0.4)" }} />
      <div className="absolute inset-4" style={{ border: "1px solid rgba(212,175,85,0.2)" }} />

      {/* Floral background texture */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='30' stroke='%23d4af55' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='40' cy='40' r='18' stroke='%23d4af55' stroke-width='0.5' fill='none'/%3E%3Cpath d='M40 10 Q52 40 40 70 Q28 40 40 10Z' stroke='%23d4af55' stroke-width='0.5' fill='none'/%3E%3Cpath d='M10 40 Q40 52 70 40 Q40 28 10 40Z' stroke='%23d4af55' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Corner ornaments */}
      {[
        "top-4 left-4",
        "top-4 right-4 rotate-90",
        "bottom-4 left-4 -rotate-90",
        "bottom-4 right-4 rotate-180",
      ].map((pos, i) => (
        <svg
          key={i}
          className={`absolute ${pos} w-14 h-14 opacity-50`}
          viewBox="0 0 50 50"
          fill="none"
        >
          <path d="M2 2 L22 2 L22 7 L7 7 L7 22 L2 22 Z" fill="#d4af55" />
          <path d="M5 5 L18 5 L18 7 L7 7 L7 18 L5 18 Z" fill="#d4af55" opacity="0.4" />
          <circle cx="12" cy="12" r="2.5" fill="#d4af55" opacity="0.3" />
        </svg>
      ))}

      {/* Center title plate */}
      <div
        className="relative px-10 py-7 text-center mx-10"
        style={{
          background: "linear-gradient(135deg, #3a1f08, #6b3810, #4a2810)",
          border: "1px solid rgba(212,175,85,0.5)",
          boxShadow: "0 0 0 3px rgba(212,175,85,0.12), inset 0 0 24px rgba(0,0,0,0.4)",
        }}
      >
        <div className="absolute inset-[4px]" style={{ border: "1px solid rgba(212,175,85,0.2)" }} />

        <p
          className="text-[9px] tracking-[0.4em] uppercase mb-3 opacity-60"
          style={{ color: "#d4af55", fontFamily: "Georgia, serif" }}
        >
          ARTFLIX Studio
        </p>

        <h2
          className="font-light italic leading-none"
          style={{
            fontFamily: "Georgia, serif",
            color: "#f0d890",
            fontSize: "clamp(28px, 4vw, 44px)",
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}
        >
          Photographs
        </h2>

        <div className="w-12 h-[1px] mx-auto mt-4 mb-3" style={{ background: "rgba(212,175,85,0.4)" }} />

        <p
          className="text-[9px] tracking-[0.25em] opacity-35"
          style={{ color: "#d4af55", fontFamily: "Georgia, serif" }}
        >
          2023 — 2024
        </p>
      </div>

      {/* Bottom label */}
      <p
        className="absolute bottom-7 text-[8px] tracking-[0.3em] uppercase opacity-20"
        style={{ color: "#d4af55", fontFamily: "Georgia, serif" }}
      >
        Premium Prints &amp; Lamination
      </p>
    </div>
  );
});
CoverPage.displayName = "CoverPage";

// Aged paper photo page
const PhotoPage = React.forwardRef<HTMLDivElement, { img: string; caption: string; year: string }>(
  ({ img, caption, year }, ref) => {
    return (
      <div
        ref={ref}
        className="page w-full h-full p-7 flex flex-col justify-between select-none"
        style={{
          background: "linear-gradient(135deg, #f5ede0, #ede0cc, #f0e4d0)",
        }}
      >
        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "250px 250px",
            mixBlendMode: "multiply",
          }}
        />

        {/* Photo with white border */}
        <div
          className="relative w-full h-[380px] overflow-hidden bg-white p-2"
          style={{
            boxShadow: "0 3px 18px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(0,0,0,0.07)",
          }}
        >
          <img
            src={img}
            alt={caption}
            className="w-full h-full object-cover"
            style={{ filter: "sepia(18%) contrast(1.05) brightness(0.95)" }}
            crossOrigin="anonymous"
          />
          {/* Photo corner tabs */}
          {[
            { cls: "top-2 left-2", clip: "polygon(0 0, 100% 0, 0 100%)" },
            { cls: "top-2 right-2", clip: "polygon(0 0, 100% 0, 100% 100%)" },
            { cls: "bottom-2 left-2", clip: "polygon(0 0, 0 100%, 100% 100%)" },
            { cls: "bottom-2 right-2", clip: "polygon(100% 0, 0 100%, 100% 100%)" },
          ].map((c, i) => (
            <div
              key={i}
              className={`absolute ${c.cls} w-5 h-5`}
              style={{ background: "rgba(180,140,60,0.7)", clipPath: c.clip }}
            />
          ))}
        </div>

        {/* Caption */}
        <div className="mt-4 text-center relative z-10 flex-shrink-0">
          <p
            className="text-[13px] tracking-[0.1em] italic"
            style={{ fontFamily: "Georgia, serif", color: "#5c3d1e" }}
          >
            {caption}
          </p>
          <p
            className="text-[10px] tracking-[0.25em] mt-1 opacity-45"
            style={{ fontFamily: "Georgia, serif", color: "#8b5e3c" }}
          >
            {year}
          </p>
        </div>
      </div>
    );
  }
);
PhotoPage.displayName = "PhotoPage";

// Back cover (with quote and contact details)
const BackCover = React.forwardRef<HTMLDivElement, Record<string, never>>((props, ref) => {
  return (
    <div
      ref={ref}
      className="page w-full h-full flex flex-col items-center justify-center relative overflow-hidden select-none p-10 text-center bg-obsidian"
      style={{
        background:
          "linear-gradient(145deg, #2e1407 0%, #5c2e10 40%, #3a1a08 100%)",
      }}
    >
      <div className="absolute inset-2" style={{ border: "1px solid rgba(212,175,85,0.25)" }} />
      <div className="absolute inset-4" style={{ border: "1px solid rgba(212,175,85,0.1)" }} />
      
      {/* Floral background texture matching front cover */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Ccircle cx='40' cy='40' r='30' stroke='%23d4af55' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='40' cy='40' r='18' stroke='%23d4af55' stroke-width='0.5' fill='none'/%3E%3Cpath d='M40 10 Q52 40 40 70 Q28 40 40 10Z' stroke='%23d4af55' stroke-width='0.5' fill='none'/%3E%3Cpath d='M10 40 Q40 52 70 40 Q40 28 10 40Z' stroke='%23d4af55' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full pt-10">
        {/* Star Icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mb-6 opacity-60">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#d4af55" />
        </svg>

        {/* Inspirational Quote */}
        <p 
          className="font-serif italic text-lg leading-relaxed mb-10 max-w-[85%]"
          style={{ color: "#d4af55", opacity: 0.9 }}
        >
          &quot;Photography is an austere and blazing poetry of the real.&quot;
        </p>

        <div className="w-16 h-[1px] mb-10" style={{ background: "rgba(212,175,85,0.3)" }} />

        {/* Contact Details */}
        <div className="flex flex-col gap-4 text-[9px] tracking-[0.25em] uppercase" style={{ color: "#d4af55", opacity: 0.7 }}>
          <p>hello@artflix.studio</p>
          <p>+94 77 123 4567</p>
          <p>Colombo, Sri Lanka</p>
        </div>

        {/* Bottom Logo Text */}
        <div className="absolute bottom-4 w-full text-center">
          <h3 className="font-serif text-xl tracking-[0.2em] uppercase" style={{ color: "#f0d890", opacity: 0.9 }}>
            ART<span style={{ color: "#d4af55", fontStyle: "italic" }}>FLIX</span>
          </h3>
        </div>
      </div>
    </div>
  );
});
BackCover.displayName = "BackCover";

export default function AlbumView() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<FlipBookRef | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = PHOTOS.length + 2; // cover + photos + back cover

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
    });
    tl.fromTo(
      ".album-title-reveal",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
    ).fromTo(
      ".album-book-wrapper",
      { opacity: 0, y: 50, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" },
      "-=0.6"
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // Center the book smoothly based on whether it is closed or open
  useEffect(() => {
    let xPercent = 0;
    if (currentPage === 0) {
      // Cover page (book closed on the right side) -> shift container left to center the visible cover
      xPercent = -25;
    } else if (currentPage >= totalPages - 1) {
      // Back cover (book closed on the left side) -> shift container right to center it
      xPercent = 25;
    } else {
      // Book is open -> center normally
      xPercent = 0;
    }

    gsap.to(".book-centering-container", {
      xPercent: xPercent,
      duration: 0.9,
      ease: "power3.inOut"
    });
  }, [currentPage, totalPages]);

  return (
    <section
      ref={sectionRef}
      id="album"
      className="bg-[#080604] py-36 px-4 md:px-16 overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-[1100px] mx-auto mb-16 text-center">
        <div className="flex items-center justify-center gap-4 mb-5 album-title-reveal">
          <div className="w-10 h-[1px] bg-gold/60" />
          <span className="text-[9px] font-medium tracking-[0.4em] uppercase text-gold">
            Previous Works
          </span>
          <div className="w-10 h-[1px] bg-gold/60" />
        </div>
        <h2 className="album-title-reveal font-serif text-[clamp(34px,5vw,60px)] font-light leading-[1.1] text-ivory">
          The <em className="italic text-gold">Album</em>
        </h2>
        <p className="album-title-reveal mt-5 text-[13px] font-light text-platinum/50 tracking-[0.08em] max-w-[460px] mx-auto leading-relaxed">
          A curated collection of captured moments — retouched and preserved for
          eternity.
        </p>
      </div>

      {/* Desktop 3D Book */}
      <div className="album-book-wrapper hidden lg:flex flex-col items-center gap-10 overflow-hidden px-4 md:px-0">
        <div
          className="book-centering-container w-full max-w-[960px] mx-auto py-10"
          style={{
            filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.85))",
          }}
        >
          <ReactFlipBook
            ref={bookRef as React.Ref<never>}
            width={480}
            height={560}
            size="fixed"
            showCover={true}
            flippingTime={900}
            drawShadow={true}
            showPageCorners={true}
            useMouseEvents={true}
            mobileScrollSupport={false}
            showNavigationButtons={false}
            showPageNumbers={false}
            onPageChange={(page: number) => setCurrentPage(page)}
            className="mx-auto"
          >
            {/* Cover */}
            <CoverPage />

            {/* Photo pages */}
            {PHOTOS.map((photo, i) => (
              <PhotoPage
                key={i}
                img={photo.img}
                caption={photo.caption}
                year={photo.year}
              />
            ))}

            {/* Back cover */}
            <BackCover />
          </ReactFlipBook>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-10">
          <button
            onClick={() => bookRef.current?.flipPrev()}
            className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-platinum/60 hover:text-gold transition-all duration-300 group"
          >
            <span className="inline-block w-8 h-[1px] bg-current transition-all duration-300 group-hover:w-12" />
            <ShinyText text="Prev" speed={3} color="inherit" shineColor="#f0d890" />
          </button>

          {/* Page dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.ceil(totalPages / 2) }).map((_, i) => (
              <div
                key={i}
                onClick={() => bookRef.current?.flip(i * 2)}
                className={`cursor-pointer transition-all duration-400 rounded-full ${
                  Math.floor(currentPage / 2) === i
                    ? "bg-gold w-5 h-[3px]"
                    : "bg-platinum/20 w-[5px] h-[5px] hover:bg-platinum/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => bookRef.current?.flipNext()}
            className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-platinum/60 hover:text-gold transition-all duration-300 group"
          >
            <ShinyText text="Next" speed={3} color="inherit" shineColor="#f0d890" />
            <span className="inline-block w-8 h-[1px] bg-current transition-all duration-300 group-hover:w-12" />
          </button>
        </div>

        <p className="text-[9px] tracking-[0.3em] uppercase text-platinum/20">
          Click the corner or use buttons to turn pages
        </p>
      </div>

      {/* Mobile/Tablet Alternative Grid */}
      <div className="flex lg:hidden flex-col gap-12 mt-4 px-2 sm:px-10">
        {PHOTOS.map((photo, i) => (
          <div 
            key={i} 
            className="relative w-full aspect-[4/5] bg-white p-3 shadow-2xl rounded-sm"
          >
            <img 
              src={photo.img} 
              alt={photo.caption} 
              className="w-full h-full object-cover" 
              style={{ filter: "sepia(18%) contrast(1.05) brightness(0.95)" }}
              crossOrigin="anonymous" 
            />
            {/* Corner Tabs */}
            {[
              { cls: "top-3 left-3", clip: "polygon(0 0, 100% 0, 0 100%)" },
              { cls: "top-3 right-3", clip: "polygon(0 0, 100% 0, 100% 100%)" },
              { cls: "bottom-3 left-3", clip: "polygon(0 0, 0 100%, 100% 100%)" },
              { cls: "bottom-3 right-3", clip: "polygon(100% 0, 0 100%, 100% 100%)" },
            ].map((c, j) => (
              <div
                key={j}
                className={`absolute ${c.cls} w-6 h-6`}
                style={{ background: "rgba(180,140,60,0.7)", clipPath: c.clip }}
              />
            ))}
            
            {/* Elegant Mobile Caption */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-center w-[85%]">
              <div 
                className="bg-[#0A0A0A]/95 backdrop-blur-md px-6 py-4"
                style={{ border: "1px solid rgba(212,175,85,0.2)" }}
              >
                <p className="text-[15px] italic text-[#d4af55] font-serif mb-1">{photo.caption}</p>
                <p className="text-[9px] tracking-[0.3em] text-[#c8c0b4]/60">{photo.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
