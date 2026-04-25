import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import Cursor from "@/components/Cursor";
import TargetCursor from "@/components/TargetCursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Artflics | Atelier of Fine Art",
  description: "Crafting Memories, Frame by Frame",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${outfit.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroller>
            <Cursor />
            <TargetCursor />
            {children}
            <FloatingWhatsApp />
          </SmoothScroller>
        </ThemeProvider>
      </body>
    </html>
  );
}
