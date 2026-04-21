"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ArtisanTouch() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textColsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered Text Reveal
    gsap.fromTo(
      textColsRef.current?.children || [],
      { opacity: 0, y: 44 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15,
        scrollTrigger: {
          trigger: textColsRef.current,
          start: "top 88%",
        }
      }
    );

    // Image Parallax Shift
    const panels = document.querySelectorAll(".artisan-panel-img");
    panels.forEach((img, i) => {
      gsap.to(img, {
        yPercent: i % 2 === 0 ? -15 : 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="artisan" className="min-h-screen relative overflow-hidden bg-charcoal py-36">
      <div className="container max-w-[1400px] mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-20 min-h-[80vh]">
        
        {/* Left Column Text */}
        <div ref={textColsRef} className="flex flex-col justify-center px-4 md:pl-20 md:pr-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px] bg-gold" />
            <span className="text-[9px] font-medium tracking-[0.4em] uppercase text-gold">The Artisan&apos;s Touch</span>
          </div>
          <h2 className="font-serif text-[clamp(38px,5vw,64px)] font-light leading-[1.15] text-ivory">
            Where vision<br /><em className="italic text-gold">becomes reality</em>
          </h2>
          <p className="text-[15px] leading-[1.85] text-platinum/75 font-light max-w-[440px] mt-8">
            Every photograph that enters our studio is treated as a singular artefact. Our digital master editors apply years of expertise — calibrating light, shadow, and tone to ensure your memory is beautifully immortalized.
          </p>
          <div className="w-12 h-[1px] bg-gold my-9" />
          <p className="text-[15px] leading-[1.85] text-platinum/75 font-light mt-0 max-w-[440px]">
            Once perfected, your photo is meticulously printed and protected with premium laminations, delivering a seamless, frameless aesthetic that stands the test of time.
          </p>
        </div>

        {/* Right Column Grid */}
        <div className="grid grid-cols-2 gap-[2px] mt-20">
          <div className="relative overflow-hidden aspect-4/3 col-span-2 group">
            <div 
              className="artisan-panel-img absolute -inset-10 will-change-transform bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621245645511-df8bfe5752c0?q=80&w=1400&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="font-serif text-[22px] font-light italic text-ivory mb-1.5">Digital Mastering</h3>
              <p className="text-[10px] tracking-[0.18em] uppercase text-gold">Color grading & retouching</p>
            </div>
          </div>
          <div className="relative overflow-hidden aspect-4/3 group">
            <div 
              className="artisan-panel-img absolute -inset-6 will-change-transform bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1616518174548-52c67bb309cd?q=80&w=800&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="font-serif text-lg font-light italic text-ivory mb-1">Premium Lamination</h3>
              <p className="text-[9px] tracking-[0.18em] uppercase text-gold">Protective sealing</p>
            </div>
          </div>
          <div className="relative overflow-hidden aspect-4/3 group">
            <div 
              className="artisan-panel-img absolute -inset-6 will-change-transform bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="font-serif text-lg font-light italic text-ivory mb-1">Frameless Finish</h3>
              <p className="text-[9px] tracking-[0.18em] uppercase text-gold">Seamless mounting</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
