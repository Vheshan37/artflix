"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../MagneticButton";
import LightRays from "../LightRays";

const SocialIcons = () => (
  <>
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group p-2 transition-all duration-300 hover:scale-125"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-platinum/40 group-hover:text-gold transition-colors duration-300"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    </a>

    <a
      href="https://web.facebook.com/profile.php?id=100085865697339"
      target="_blank"
      rel="noopener noreferrer"
      className="group p-2 transition-all duration-300 hover:scale-125"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-platinum/40 group-hover:text-gold transition-colors duration-300"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    </a>

    <a
      href="https://wa.me/94729644800"
      target="_blank"
      rel="noopener noreferrer"
      className="group p-2 transition-all duration-300 hover:scale-125"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-platinum/40 group-hover:text-gold transition-colors duration-300"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    </a>
  </>
);

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
      },
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
      },
    });

    // Text Reveal Animation
    const q = gsap.utils.selector(textContentRef);
    gsap.fromTo(
      q(".reveal-hero"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.4,
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-obsidian"
    >
      {/* Parallax BG Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 origin-center will-change-transform"
        style={{
          backgroundImage:
            "url('/ArtflicsLogo.jpg')", // Actual work from client
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Light Rays FX */}
      <LightRays
        raysColor="#b8966a"
        raysSpeed={0.8}
        lightSpread={1.2}
        rayLength={1.5}
        mouseInfluence={0.08}
        className="absolute inset-0 z-[5] opacity-60"
      />
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 z-10 bg-obsidian/60" />
      {/* Gradient Overlay — subtle depth */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-obsidian via-transparent to-obsidian/40" />

      {/* Content */}
      <div ref={textContentRef} className="relative z-20 text-center max-w-[900px] px-10">
        <span className="reveal-hero block text-[11px] font-semibold tracking-[0.4em] uppercase text-gold mb-7">
          Digital Colour Lab
        </span>
        <h1 className="reveal-hero font-serif text-[clamp(72px,10vw,140px)] font-normal leading-[0.9] tracking-[0.12em] text-ivory drop-shadow-2xl">
          ART<em className="text-gold italic">FLICS</em>
        </h1>
        <div className="reveal-hero w-[60px] h-[1px] bg-gold mx-auto my-6" />
        <p className="reveal-hero font-serif text-xl font-normal italic tracking-[0.12em] text-platinum mx-0 mt-7 mb-12">
          Let&apos;s Frame Your Memorable Moment
        </p>
        <div className="reveal-hero">
          <MagneticButton href="#catalogue">Explore Creations</MagneticButton>
        </div>

        {/* Mobile Social Bar - only visible on mobile, under button */}
        <div className="flex lg:hidden flex-row items-center justify-center gap-8 mt-16 reveal-hero">
          <SocialIcons />
        </div>
      </div>

      {/* Desktop Social Bar - hidden on mobile, fixed on right */}
      <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 flex-col items-center gap-8 z-30 reveal-hero">
        <div className="w-[1px] h-12 bg-gradient-to-t from-gold to-transparent opacity-40" />
        <SocialIcons />
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent opacity-40" />
      </div>

      {/* Fading Watermark */}
      <div
        ref={watermarkRef}
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-serif text-[clamp(100px,18vw,220px)] font-light tracking-[0.3em] text-white/[0.025] pointer-events-none whitespace-nowrap leading-none z-10"
      >
        ARTFLICS
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <div className="w-[1px] h-[60px] bg-gradient-to-b from-gold to-transparent animate-pulse" />
        <span className="text-[9px] tracking-[0.25em] uppercase text-platinum/50">Scroll</span>
      </div>
    </section>
  );
}
