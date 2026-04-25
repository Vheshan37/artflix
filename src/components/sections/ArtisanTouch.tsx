"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

const PANEL_1_IMAGES = [
  "/works/480419774_593045380234313_1262790299129335887_n.jpg",
  "/works/494760863_646601994878651_5427797618584057018_n.jpg",
  "/works/537359103_727863823419134_488152008974869960_n.jpg",
];

const PANEL_2_IMAGES = [
  "/works/480911995_597949723077212_3592211339890097745_n.jpg",
  "/works/480554214_593454150193436_8828197630495022447_n.jpg",
  "/works/497779122_653289964209854_6844972595970220078_n.jpg",
];

const PANEL_3_IMAGES = [
  "/works/486398360_616874307851420_2334407374371158726_n.jpg",
  "/works/482979563_605933535612164_6920470823351063224_n.jpg",
  "/works/477089817_608102248728626_1688917684253117922_n.jpg",
];

export default function ArtisanTouch() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textColsRef = useRef<HTMLDivElement>(null);
  const [imageIndex, setImageIndex] = useState(0);

  // Slideshow interval
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % PANEL_1_IMAGES.length);
    }, 3500); // Change image every 3.5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered Text Reveal
    gsap.fromTo(
      textColsRef.current?.children || [],
      { opacity: 0, y: 44 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: textColsRef.current,
          start: "top 88%",
        },
      }
    );

    // Image Parallax Shift
    const panels = document.querySelectorAll(".artisan-panel-container");
    panels.forEach((img, i) => {
      gsap.to(img, {
        yPercent: i % 2 === 0 ? -15 : 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="artisan"
      className="min-h-screen relative overflow-hidden bg-charcoal py-36"
    >
      <div className="container max-w-[1400px] mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-20 min-h-[80vh]">
        {/* Left Column Text */}
        <div ref={textColsRef} className="flex flex-col justify-center px-4 md:pl-20 md:pr-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px] bg-gold" />
            <span className="text-[9px] font-medium tracking-[0.4em] uppercase text-gold">
              Our Process
            </span>
          </div>
          <h2 className="font-serif text-[clamp(38px,5vw,64px)] font-light leading-[1.15] text-ivory">
            From memory
            <br />
            <em className="italic text-gold">to masterpiece</em>
          </h2>
          <p className="text-[15px] leading-[1.85] text-platinum/75 font-light max-w-[440px] mt-8">
            We don&apos;t just print photos; we curate memories with an artisan&apos;s eye. Send us your favorite mobile capture, and our digital artists will transform it into a breathtaking painting.
          </p>
          <div className="w-12 h-[1px] bg-gold my-9" />
          <p className="text-[15px] leading-[1.85] text-platinum/75 font-light mt-0 max-w-[440px]">
            Once digitally perfected, your art is meticulously printed and protected with premium laminations, delivering our signature frameless, glass-look aesthetic.
          </p>
        </div>

        {/* Right Column Grid */}
        <div className="grid grid-cols-2 gap-[2px] mt-20">
          
          {/* Panel 1 */}
          <div className="artisan-panel-container relative overflow-hidden aspect-4/3 col-span-2 group">
            <div className="absolute -inset-10 will-change-transform transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
              {PANEL_1_IMAGES.map((src, i) => (
                <div
                  key={src}
                  className={clsx(
                    "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
                    imageIndex === i ? "opacity-100" : "opacity-0"
                  )}
                  style={{ backgroundImage: `url('${src}')` }}
                />
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 to-transparent z-10 pointer-events-none">
              <h3 className="font-serif text-[22px] font-light italic text-ivory mb-1.5">
                1. Connect & Share
              </h3>
              <p className="text-[10px] tracking-[0.18em] uppercase text-gold">
                Send your photo via WhatsApp
              </p>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="artisan-panel-container relative overflow-hidden aspect-4/3 group">
            <div className="absolute -inset-6 will-change-transform transition-transform duration-1000 group-hover:scale-105">
              {PANEL_2_IMAGES.map((src, i) => (
                <div
                  key={src}
                  className={clsx(
                    "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
                    imageIndex === i ? "opacity-100" : "opacity-0"
                  )}
                  style={{ backgroundImage: `url('${src}')` }}
                />
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent z-10 pointer-events-none">
              <h3 className="font-serif text-lg font-light italic text-ivory mb-1">
                2. Digital Painting
              </h3>
              <p className="text-[9px] tracking-[0.18em] uppercase text-gold">Handcrafted digital art</p>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="artisan-panel-container relative overflow-hidden aspect-4/3 group">
            <div className="absolute -inset-6 will-change-transform transition-transform duration-1000 group-hover:scale-105">
              {PANEL_3_IMAGES.map((src, i) => (
                <div
                  key={src}
                  className={clsx(
                    "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
                    imageIndex === i ? "opacity-100" : "opacity-0"
                  )}
                  style={{ backgroundImage: `url('${src}')` }}
                />
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent z-10 pointer-events-none">
              <h3 className="font-serif text-lg font-light italic text-ivory mb-1">
                3. Premium Finish
              </h3>
              <p className="text-[9px] tracking-[0.18em] uppercase text-gold">Frameless & delivered</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
