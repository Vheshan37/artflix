"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal pt-20 pb-10 px-10 md:px-16 border-t border-platinum/10 relative z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-10">
          <div className="font-serif text-4xl text-ivory font-light tracking-[0.2em]">ARTFLIX</div>
          <ul className="flex flex-wrap gap-10 list-none m-0 p-0 md:pt-2">
            {["Gallery", "Collections", "Editorial", "About", "Inquire"].map((link) => (
              <li key={link}>
                <Link href={`#${link.toLowerCase()}`} className="text-[10px] tracking-[0.2em] uppercase text-platinum/45 transition-colors duration-300 hover:text-gold magnetic">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-7 border-t border-platinum/10 gap-6">
          <p className="text-[10px] tracking-[0.08em] text-platinum/30 text-center md:text-left">
            &copy; 2025 ARTFLIX Atelier. All rights reserved. Made with devotion.
          </p>
          <div className="flex gap-6">
            {["Instagram", "Pinterest", "Behance"].map((social) => (
              <a key={social} href="#" className="text-[10px] tracking-[0.18em] uppercase text-platinum/30 transition-colors duration-300 hover:text-gold magnetic">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
