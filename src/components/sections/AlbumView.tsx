"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import ShinyText from "../ShinyText";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Local interface since the package doesn't export the ref type
interface FlipBookRef {
  flipNext: () => void;
  flipPrev: () => void;
  flip: (page: number) => void;
  getCurrentPageIndex: () => number | undefined;
}

// Dynamically import to avoid SSR issues with page-flip
const ReactFlipBook = dynamic(
  () => import("@vuvandinh203/react-flipbook").then((m) => m.ReactFlipBook),
  { ssr: false }
);

const PHOTOS = [
  {
    img: "/works/477089817_608102248728626_1688917684253117922_n.jpg",
    caption: "Birthday Masterpiece",
    year: "2024",
  },
  {
    img: "/works/494760863_646601994878651_5427797618584057018_n.jpg",
    caption: "Anniversary Edit",
    year: "2024",
  },
  {
    img: "/works/497779122_653289964209854_6844972595970220078_n.jpg",
    caption: "Family Portraits",
    year: "2024",
  },
  {
    img: "/works/524331837_706514065554110_4268118539056236746_n.jpg",
    caption: "Couple's Frame",
    year: "2024",
  },
  {
    img: "/works/524401289_708029228735927_5106487507539885658_n.jpg",
    caption: "Classic Portrait",
    year: "2023",
  },
  {
    img: "/works/532243718_721489777389872_6677289994051051575_n.jpg",
    caption: "Digital Art Finish",
    year: "2023",
  },
  {
    img: "/works/537359103_727863823419134_488152008974869960_n.jpg",
    caption: "Custom Present",
    year: "2023",
  },
  {
    img: "/works/486398360_616874307851420_2334407374371158726_n.jpg",
    caption: "Artflics Premium",
    year: "2023",
  },
];

// Luxury dark cover page
const CoverPage = React.forwardRef<HTMLDivElement, Record<string, never>>((props, ref) => {
  return (
    <div
      ref={ref}
      className="page w-full h-full flex flex-col items-center justify-center relative overflow-hidden select-none"
      style={{
        background: "#080604", // True Midnight Black
      }}
    >
      {/* Premium Leather Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.6] pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Gold embossed outer border */}
      <div className="absolute inset-4" style={{ border: "1px solid rgba(248,16,188,0.3)" }} />
      <div className="absolute inset-6" style={{ border: "1px solid rgba(6,79,235,0.15)" }} />

      {/* Center title plate */}
      <div
        className="relative px-12 py-10 text-center mx-10 overflow-hidden"
        style={{
          background: "#0d0b09",
          border: "1px solid rgba(248,16,188,0.4)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.6), inset 0 0 50px rgba(248,16,188,0.1)",
        }}
      >
        {/* Decorative Inner Line */}
        <div className="absolute inset-[6px]" style={{ border: "0.5px solid rgba(6,79,235,0.2)" }} />

        <p
          className="text-[10px] tracking-[0.5em] uppercase mb-5 font-bold"
          style={{ color: "#f810bc", opacity: 1 }}
        >
          Artflics Studio
        </p>

        <h2
          className="font-serif leading-tight mb-3"
          style={{
            color: "white",
            fontSize: "clamp(34px, 5vw, 52px)",
            textShadow: "0 5px 15px rgba(0,0,0,0.8)"
          }}
        >
          Photo<span style={{ color: "#f810bc", fontStyle: "italic" }}>graphs</span>
        </h2>

        <div
          className="w-20 h-[2px] mx-auto my-7"
          style={{ background: "linear-gradient(90deg, #064feb, #f810bc)" }}
        />

        <p
          className="text-[11px] tracking-[0.35em] font-medium"
          style={{ color: "white", opacity: 0.7 }}
        >
          2023 — 2024
        </p>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 flex items-center gap-4">
        <div className="w-10 h-[1px] bg-white/20" />
        <span className="text-[9px] tracking-[0.5em] uppercase text-white/40 font-bold">Collectors Edition</span>
        <div className="w-10 h-[1px] bg-white/20" />
      </div>
    </div>
  );
});
CoverPage.displayName = "CoverPage";

// Luxury dark photo page
const PhotoPage = React.forwardRef<HTMLDivElement, { img: string; caption: string; year: string }>(
  ({ img, caption, year }, ref) => {
    return (
      <div
        ref={ref}
        className="page w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative select-none"
        style={{
          background: "#0c0a08", // Deep Midnight Charcoal
        }}
      >
        {/* Page Inner Shadow for 3D depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.6)] pointer-events-none" />
        
        {/* Photo with thin border */}
        <div className="relative w-full h-[400px] overflow-hidden border border-white/10 p-2 bg-[#12100e] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <img
            src={img}
            alt={caption}
            className="w-full h-full object-cover"
            style={{ filter: "contrast(1.08) brightness(1.05)" }}
            crossOrigin="anonymous"
          />
          {/* Subtle photographic sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none opacity-30" />
        </div>

        {/* Caption */}
        <div className="mt-8 text-center relative z-10 flex-shrink-0">
          <p
            className="text-[17px] italic font-serif"
            style={{ color: "white" }}
          >
            {caption}
          </p>
          <div className="w-10 h-[1px] bg-gold/40 mx-auto my-4" />
          <p
            className="text-[10px] tracking-[0.4em] uppercase font-bold"
            style={{ color: "white", opacity: 0.3 }}
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
      className="page w-full h-full flex flex-col items-center justify-center relative overflow-hidden select-none p-10 text-center"
      style={{
        background: "#080604",
      }}
    >
      <div className="absolute inset-4" style={{ border: "1px solid rgba(248,16,188,0.2)" }} />
      <div className="absolute inset-6" style={{ border: "1px solid rgba(6,79,235,0.1)" }} />

      <div className="relative z-10 flex flex-col items-center justify-center h-full pt-10">
        {/* Star Icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mb-8 opacity-60">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill="#f810bc"
          />
        </svg>

        {/* Inspirational Quote */}
        <p
          className="font-serif italic text-xl leading-relaxed mb-12 max-w-[90%]"
          style={{ color: "white", opacity: 0.9 }}
        >
          &quot;Photography is the only language that can be understood anywhere in the world.&quot;
        </p>

        <div className="w-16 h-[1.5px] mb-12" style={{ background: "linear-gradient(90deg, transparent, #064feb, transparent)" }} />

        {/* Contact Details */}
        <div
          className="flex flex-col gap-5 text-[10px] tracking-[0.3em] uppercase font-bold"
          style={{ color: "white", opacity: 0.7 }}
        >
          <p>artflics1@gmail.com</p>
          <p>072 964 4800</p>
          <p>Urapola, Sri Lanka</p>
        </div>

        {/* Bottom Logo Text */}
        <div className="absolute bottom-4 w-full text-center">
          <h3
            className="font-serif text-2xl tracking-[0.25em] uppercase"
            style={{ color: "white", opacity: 0.9 }}
          >
            ART<span style={{ color: "#f810bc", fontStyle: "italic" }}>FLICS</span>
          </h3>
        </div>
      </div>
    </div>
  );
});
BackCover.displayName = "BackCover";

export default function AlbumView() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [emblaRef] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    dragFree: true,
    loop: true,
  });
  const bookRef = useRef<FlipBookRef | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = PHOTOS.length + 2;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/flip-sound.mp3");
    audioRef.current.volume = 0.25;
  }, []);

  const playFlipSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => console.log("Audio play prevented:", err));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
      ease: "power3.inOut",
    });
  }, [currentPage, totalPages]);

  // Mobile Stack Animation
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 1023px)", () => {
      const cards = gsap.utils.toArray(".mobile-stack-card") as HTMLElement[];

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // Last card doesn't scale down

        gsap.to(card, {
          scale: 0.9,
          filter: "brightness(0.5) blur(2px)",
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top 60%",
            end: "top 20%",
            scrub: true,
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="album"
      className="bg-charcoal py-36 px-4 md:px-16 overflow-hidden relative"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-neonBlue/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px]" />
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23064feb' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        />
      </div>

      {/* Section header */}
      <div className="max-w-[1100px] mx-auto mb-20 text-center relative z-10">
        <div className="album-title-reveal inline-flex items-center justify-center gap-6 mb-6 mx-auto">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-neonBlue/40" />
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-neonBlue/60">
            Premium Studio Collection
          </span>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-neonBlue/40" />
        </div>
        <h2 className="album-title-reveal font-serif text-[clamp(42px,6vw,80px)] font-light leading-[1.1] text-ivory drop-shadow-sm">
          The <em className="italic text-gold drop-shadow-md">Album</em>
        </h2>
        <div className="album-title-reveal w-20 h-[2px] bg-gradient-to-r from-neonBlue to-gold mx-auto my-8 opacity-60" />
        <p className="album-title-reveal text-[15px] font-light text-platinum/80 tracking-[0.05em] max-w-[520px] mx-auto leading-relaxed italic">
          &ldquo;A curated collection of captured moments — retouched and preserved for eternity.&rdquo;
        </p>
      </div>

      {/* Desktop 3D Book Container */}
      <div className="album-book-wrapper hidden lg:flex flex-col items-center gap-16 overflow-hidden px-4 md:px-0 relative z-10">
        <div
          className="book-centering-container w-full max-w-[960px] mx-auto relative"
          onMouseDown={playFlipSound}
          onTouchStart={playFlipSound}
        >
          {/* Subtle Glow behind book */}
          <div className="absolute inset-0 bg-white/40 blur-[100px] rounded-full scale-75 -z-10" />
          
          <div style={{ filter: "drop-shadow(0 50px 100px rgba(15,20,45,0.12))" }}>
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
            onPageChange={handlePageChange}
            className="mx-auto"
          >
            {/* Cover */}
            <CoverPage />

            {/* Photo pages */}
            {PHOTOS.map((photo, i) => (
              <PhotoPage key={i} img={photo.img} caption={photo.caption} year={photo.year} />
            ))}

            {/* Back cover */}
            <BackCover />
          </ReactFlipBook>
        </div>
      </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-14 relative">
          <button
            onClick={() => {
              playFlipSound();
              bookRef.current?.flipPrev();
            }}
            className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-ivory/60 hover:text-neonBlue transition-all duration-500 group"
          >
            <span className="w-10 h-[1px] bg-neonBlue/20 group-hover:w-16 group-hover:bg-neonBlue transition-all duration-500" />
            <span className="font-semibold">Back</span>
          </button>

          {/* Page Progress Indicator */}
          <div className="flex items-center gap-3 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border border-white shadow-sm">
            {Array.from({ length: Math.ceil(totalPages / 2) }).map((_, i) => (
              <div
                key={i}
                onClick={() => bookRef.current?.flip(i * 2)}
                className={`cursor-pointer transition-all duration-500 rounded-full ${
                  Math.floor(currentPage / 2) === i
                    ? "bg-gold w-6 h-[4px] shadow-[0_0_10px_rgba(248,16,188,0.4)]"
                    : "bg-neonBlue/10 w-[6px] h-[6px] hover:bg-neonBlue/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              playFlipSound();
              bookRef.current?.flipNext();
            }}
            className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-ivory/60 hover:text-gold transition-all duration-500 group"
          >
            <span className="font-semibold">Next</span>
            <span className="w-10 h-[1px] bg-gold/20 group-hover:w-16 group-hover:bg-gold transition-all duration-500" />
          </button>
        </div>

        <p className="text-[10px] tracking-[0.4em] uppercase text-platinum/40 font-medium animate-pulse">
          Drag corners to flip pages
        </p>
      </div>

      {/* Mobile/Tablet Alternative: Embla Carousel */}
      <div
        className="lg:hidden mt-20 w-full overflow-hidden touch-pan-y"
        ref={emblaRef}
        data-lenis-prevent
      >
        <div className="flex select-none items-start">
          {PHOTOS.map((photo, i) => (
            <div key={i} className="flex-[0_0_80%] sm:flex-[0_0_70%] min-w-0 pl-3">
              <div className="relative aspect-[4/5] w-full bg-[#0c0a08] p-4 shadow-2xl rounded-sm border border-white/5">
                <img
                  src={photo.img}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                  style={{ filter: "sepia(18%) contrast(1.05) brightness(0.95)" }}
                />

                {/* Corner Tabs */}
                {[
                  { cls: "top-2 left-2", clip: "polygon(0 0, 100% 0, 0 100%)" },
                  { cls: "top-2 right-2", clip: "polygon(0 0, 100% 0, 100% 100%)" },
                  { cls: "bottom-2 left-2", clip: "polygon(0 0, 0 100%, 100% 100%)" },
                  { cls: "bottom-2 right-2", clip: "polygon(100% 0, 0 100%, 100% 100%)" },
                ].map((c, j) => (
                  <div
                    key={j}
                    className={`absolute ${c.cls} w-5 h-5`}
                    style={{ background: "rgba(180,140,60,0.7)", clipPath: c.clip }}
                  />
                ))}

                {/* Elegant Mobile Caption overlay */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center w-[85%] z-20">
                  <div className="bg-obsidian/90 backdrop-blur-md px-4 py-3 shadow-xl border border-neonBlue/10">
                    <p className="text-[14px] italic text-ivory font-serif mb-1 leading-tight">
                      {photo.caption}
                    </p>
                    <p className="text-[8px] tracking-[0.3em] text-platinum/60">{photo.year}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[9px] tracking-[0.4em] uppercase text-gold/40">
            Swipe to explore the gallery
          </p>
        </div>
      </div>
    </section>
  );
}
