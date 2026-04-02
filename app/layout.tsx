import type { Metadata } from "next";
import { Playfair_Display, Lora, DM_Mono } from "next/font/google";
import "./globals.css";
import FloatingCats from "@/components/FloatingCats";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Lora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const monoFont = DM_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "🐾 Something Special for Tannu",
  description: "A little mystery. A little magic. Open it.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐾</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} font-body antialiased`}
      >
        <div className="floating-paw">🐾</div>
        <div className="floating-paw">🐾</div>
        <div className="floating-paw">🐾</div>
        <div className="floating-paw">🐾</div>
        <div className="floating-paw">🐾</div>
        <div className="floating-paw">🐾</div>
        <div className="floating-paw">🐾</div>
        <div className="floating-paw">🐾</div>
        <FloatingCats />
        {children}
      </body>
    </html>
  );
}
