import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import Cursor from "@/components/Cursor";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "ARTFLIX | Atelier of Fine Art",
  description: "Crafting Memories, Frame by Frame",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${montserrat.variable} font-sans antialiased`}>
        <SmoothScroller>
          <Cursor />
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
