"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import clsx from "clsx";
import Link from "next/link";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className, href, onClick }: MagneticProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * 0.22;
    const y = (e.clientY - (top + height / 2)) * 0.22;

    gsap.to(buttonRef.current, {
      x,
      y,
      duration: 1,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const innerContent = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        "relative overflow-hidden inline-flex border text-ivory text-[10px] font-medium tracking-[0.28em] uppercase px-12 py-[18px] transition-colors duration-400 group hover:text-obsidian magnetic cursor-none",
        className
      )}
      style={{ borderColor: 'rgba(248,16,188,0.4)' }}
    >
      {/* Gradient fill on hover */}
      <div
        className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-x-100"
        style={{ background: 'linear-gradient(90deg, #064feb, #f810bc)' }}
      />
      <span className="relative z-10">{children}</span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" onClick={onClick}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="inline-block p-0 bg-transparent border-none outline-none">
      {innerContent}
    </button>
  );
}
