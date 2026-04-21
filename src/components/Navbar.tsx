"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={clsx(
      "fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 ease-in-out",
      scrolled ? "bg-obsidian/90 backdrop-blur-md py-4 px-12 md:px-16 border-b border-gold/10" : "py-8 px-12 md:px-16 bg-transparent"
    )}>
      <Link href="/" className="font-serif text-2xl md:text-[26px] tracking-widest text-ivory no-underline magnetic">
        ART<span className="text-gold">FLIX</span>
      </Link>
      
      <ul className="hidden md:flex gap-12 list-none m-0 p-0">
        {[
          { name: "Home", href: "/" },
          { name: "Catalogue", href: "/catalogue" },
          { name: "Editorial", href: "/#artisan" },
          { name: "About", href: "/#artisan" }
        ].map((el, i) => (
          <li key={i}>
            <Link href={el.href} className="text-[10px] font-medium tracking-[0.2em] uppercase text-platinum transition-colors duration-300 relative group magnetic">
              {el.name}
              <span className="absolute bottom-[-4px] left-1/2 right-1/2 h-[1px] bg-gold transition-all duration-300 group-hover:left-0 group-hover:right-0" />
            </Link>
          </li>
        ))}
      </ul>

      <Link href="#product" className="text-[10px] font-normal tracking-[0.2em] uppercase text-gold border border-gold/40 px-6 py-2.5 transition-all duration-300 hover:bg-gold hover:text-obsidian magnetic">
        Inquire
      </Link>
    </nav>
  );
}
