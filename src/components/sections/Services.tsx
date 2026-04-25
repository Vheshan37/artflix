"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import GlareHover from "../GlareHover";

export default function Services() {
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in-up sequence
    const elems = gsap.utils.selector(blockRef);
    gsap.fromTo(
      elems(".reveal-srv"),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: blockRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      elems(".reveal-card"),
      { opacity: 0, x: -44 },
      {
        opacity: 1,
        x: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: blockRef.current,
          start: "top 60%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="services" ref={blockRef} className="bg-obsidian py-40 px-10 md:px-16">
      <div className="text-center max-w-[640px] mx-auto mb-24">
        <div className="flex items-center justify-center gap-4 mb-6 reveal-srv">
          <div className="w-10 h-[1px] bg-gold" />
          <span className="text-[9px] font-medium tracking-[0.4em] uppercase text-gold">
            Our Disciplines
          </span>
          <div className="w-10 h-[1px] bg-gold" />
        </div>
        <h2 className="font-serif text-[clamp(38px,5vw,64px)] font-light leading-[1.15] text-ivory text-center reveal-srv">
          Two crafts.
          <br />
          <em className="italic text-gold">One seamless vision.</em>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] max-w-[1400px] mx-auto">
        <GlareHover glareColor="#f0d890" glareOpacity={0.4} glareSize={200} className="reveal-card">
          <div className="relative w-full h-full overflow-hidden aspect-[3/2] cursor-none group">
            <div
              className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[0.9s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-100 brightness-50 group-hover:brightness-75"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1615209853186-e4bd66602508?q=80&w=1200&auto=format&fit=crop')",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent">
              <div className="font-serif text-[80px] font-light text-gold/15 leading-none mb-auto self-end">
                01
              </div>
              <h3 className="font-serif text-[32px] font-light text-ivory mb-3">
                Digital Photo Editing
              </h3>
              <p className="text-[11px] tracking-[0.15em] uppercase text-gold mb-6">
                Retouching · Manipulation · Enhancement
              </p>
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase text-platinum transition-colors duration-300 group-hover:text-ivory w-fit"
              >
                View Process
                <span className="inline-block w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-8" />
              </Link>
            </div>
          </div>
        </GlareHover>

        <GlareHover glareColor="#f0d890" glareOpacity={0.4} glareSize={200} className="reveal-card">
          <div className="relative w-full h-full overflow-hidden aspect-[3/2] cursor-none group">
            <div
              className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[0.9s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-100 brightness-50 group-hover:brightness-75"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop')",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent">
              <div className="font-serif text-[80px] font-light text-gold/15 leading-none mb-auto self-end">
                02
              </div>
              <h3 className="font-serif text-[32px] font-light text-ivory mb-3">
                Custom Print & Laminate
              </h3>
              <p className="text-[11px] tracking-[0.15em] uppercase text-gold mb-6">
                Frameless wall art · Durable laminations · Polaroids
              </p>
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase text-platinum transition-colors duration-300 group-hover:text-ivory w-fit"
              >
                Explore Products
                <span className="inline-block w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-8" />
              </Link>
            </div>
          </div>
        </GlareHover>
      </div>
    </section>
  );
}
