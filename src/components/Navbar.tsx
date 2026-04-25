"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

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
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-500 ease-in-out",
        scrolled
          ? "bg-white/95 backdrop-blur-lg py-4 px-12 md:px-16 border-b border-neonBlue/10 shadow-sm"
          : "bg-white/70 backdrop-blur-md py-6 px-12 md:px-16 border-b border-white/20"
      )}
    >
      <Link
        href="/"
        className="font-serif text-2xl md:text-[26px] tracking-widest text-ivory no-underline magnetic"
      >
        ART<span style={{ background: 'linear-gradient(90deg, #064feb, #f810bc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FLICS</span>
      </Link>

      <ul className="hidden md:flex gap-12 list-none m-0 p-0">
        {[
          { name: "Home", href: "/" },
          { name: "Catalogue", href: "/catalogue" },
          { name: "Editorial", href: "/#artisan" },
          { name: "About", href: "/#artisan" },
        ].map((el, i) => (
          <li key={i}>
            <Link
              href={el.href}
              className="text-[10px] font-medium tracking-[0.2em] uppercase text-platinum transition-colors duration-300 relative group magnetic"
            >
              {el.name}
              <span className="absolute bottom-[-4px] left-1/2 right-1/2 h-[1px] transition-all duration-300 group-hover:left-0 group-hover:right-0" style={{ background: 'linear-gradient(90deg, #064feb, #f810bc)' }} />
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-6">
        <ThemeToggle />
        <Link
          href="#product"
          className="text-[10px] font-normal tracking-[0.2em] uppercase text-ivory border px-6 py-2.5 transition-all duration-300 hover:text-obsidian magnetic"
          style={{ borderColor: 'rgba(248,16,188,0.5)', background: 'transparent' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #064feb, #f810bc)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          Inquire
        </Link>
      </div>
    </nav>
  );
}
