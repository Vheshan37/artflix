"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../MagneticButton";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax on Background
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    // Fading Watermark Parallax
    gsap.to(watermarkRef.current, {
      yPercent: 60,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "60% top",
        scrub: 1.2,
      }
    });

    // Text Reveal Animation
    const q = gsap.utils.selector(textContentRef);
    gsap.from(q(".reveal-hero"), {
      opacity: 0,
      y: 50,
      duration: 1.4,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.4
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-obsidian">
      {/* Parallax BG Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 origin-center will-change-transform"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1578301978693-85fa9c026f43?q=80&w=2000&auto=format&fit=crop')", // Moody architectural / interior frame reference
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      />
      {/* Gradient Overlay — lighter so bg image shows through */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-obsidian/65 via-obsidian/35 to-obsidian/55" />

      {/* Content */}
      <div ref={textContentRef} className="relative z-20 text-center max-w-[900px] px-10">
        <span className="reveal-hero block text-[10px] font-medium tracking-[0.35em] uppercase text-gold mb-7">
          Premium Digital Edits & Print Artistry
        </span>
        <h1 className="reveal-hero font-serif text-[clamp(72px,10vw,140px)] font-light leading-[0.9] tracking-[0.12em] text-ivory drop-shadow-2xl">
          ART<em className="text-gold italic">FLIX</em>
        </h1>
        <div className="reveal-hero w-[60px] h-[1px] bg-gold mx-auto my-6" />
        <p className="reveal-hero font-serif text-lg font-light italic tracking-[0.12em] text-platinum mx-0 mt-7 mb-12">
          Let&apos;s Frame Your Memorable Moment
        </p>
        <div className="reveal-hero">
          <MagneticButton href="#catalogue">Explore Creations</MagneticButton>
        </div>
      </div>

      {/* Fading Watermark */}
      <div 
        ref={watermarkRef}
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-serif text-[clamp(100px,18vw,220px)] font-light tracking-[0.3em] text-white/[0.025] pointer-events-none whitespace-nowrap leading-none z-10"
      >
        ARTFLIX
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <div className="w-[1px] h-[60px] bg-gradient-to-b from-gold to-transparent animate-pulse" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-platinum/50">Scroll</span>
      </div>
    </section>
  );
}
