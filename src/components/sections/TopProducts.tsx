"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BorderGlow from "@/components/BorderGlow";

const TOP_PRODUCTS = [
  {
    id: 1,
    name: "Premium Frameless Art",
    price: "Rs 3,500 LKR",
    image: "/works/524331837_706514065554110_4268118539056236746_n.jpg",
    link: "/products/1",
  },
  {
    id: 2,
    name: "Classic Laminated Frame",
    price: "Rs 2,500 LKR",
    image: "/works/524401289_708029228735927_5106487507539885658_n.jpg",
    link: "/products/2",
  },
  {
    id: 3,
    name: "Signature Digital Edit",
    price: "Rs 1,800 LKR",
    image: "/works/532243718_721489777389872_6677289994051051575_n.jpg",
    link: "/products/3",
  },
];

export default function TopProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = gsap.utils.selector(sectionRef);
    
    gsap.fromTo(
      elements(".top-product-card"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );

    gsap.fromTo(
      elements(".top-products-title"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
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
    <section ref={sectionRef} className="py-24 px-6 md:px-16 bg-obsidian relative z-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 top-products-title">
          <span className="font-sans text-[11px] font-semibold tracking-[0.4em] uppercase text-gold mb-4 block">
            Most Loved
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ivory font-normal leading-tight">
            Top Picks <em className="text-gold italic">For You</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TOP_PRODUCTS.map((product) => (
            <BorderGlow
              key={product.id}
              className="top-product-card group flex flex-col bg-charcoal rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-shadow duration-500"
              glowColor="43 60 58"
              colors={['#d4af55', '#f0d890', '#b8966a']}
              backgroundColor="#0a0919"
              borderRadius={16}
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col items-center text-center relative z-20">
                <h3 className="font-serif text-2xl text-ivory mb-2 font-normal group-hover:text-gold transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="font-sans text-platinum/70 mb-6 font-medium tracking-wide">
                  {product.price}
                </p>
                <Link
                  href={product.link}
                  className="inline-block border border-gold/30 px-6 py-3 rounded-full text-gold text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-gold hover:text-obsidian transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}
