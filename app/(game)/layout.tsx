// app/(game)/layout.tsx
import React from "react";
import Image from "next/image"; // 1. Importe o componente Image

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ilga-purple flex flex-col font-sans relative">
      <header className="p-6 md:p-8 flex justify-between items-start w-full max-w-5xl mx-auto">
        
        {/* 2. Substitua o texto pela tag Image */}
       <div className="relative w-16 h-16 md:w-20 md:h-20">
          <Image 
            src="/assets/logo.svg" /* <-- Mude de .png para .svg aqui! */
            alt="Logo Karoonte" 
            fill 
            className="object-contain"
            priority 
            unoptimized /* <-- Adicione esta linha para SVGs */
          />
        </div>

        <div className="w-12 h-12 rounded-full border-2 border-ilga-white bg-gray-300 shadow-lg"></div>
      </header>

      <main className="flex-grow flex flex-col items-center p-4 w-full max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  );
}