// app/(game)/layout.tsx
import React from "react";
import Image from "next/image"; // 1. Importe o componente Image
import Link from "next/link";

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ilga-purple flex flex-col font-sans relative">
      <header className="p-6 md:p-8 flex justify-between items-start w-full max-w-5xl mx-auto">
        
        {/* 2. Substitua o texto pela tag Image */}
      <Link href="/" className="relative block w-16 h-16 md:w-20 md:h-20">          <Image 
            src="/assets/logo.svg" /* <-- Mude de .png para .svg aqui! */
            alt="Logo Karoonte" 
            fill 
            className="object-contain hover:scale-105 transition-all"
            priority 
            unoptimized /* <-- Adicione esta linha para SVGs */
          />
        </Link>

      </header>

      <main className="flex-grow flex flex-col items-center p-4 w-full max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  );
}