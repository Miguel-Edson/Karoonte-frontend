// app/(game)/results/page.tsx
"use client"; // Precisamos disso para poder ler o localStorage
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ResultsScreen() {
  const [finalScore, setFinalScore] = useState(0);

  // Assim que a tela carrega, ele busca a pontuação que salvamos
  useEffect(() => {
    const pontuacaoSalva = localStorage.getItem('karoonte_score');
    if (pontuacaoSalva) {
      setFinalScore(parseInt(pontuacaoSalva, 10));
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center mt-12">
      <div className="bg-ilga-white rounded-3xl p-8 md:p-12 w-full max-w-md shadow-2xl flex flex-col items-center min-h-[350px] relative">
        
        <h2 className="text-ilga-black font-extrabold mb-8 text-2xl tracking-tight">
          Pontuação Final
        </h2>
        
        {/* Mostramos o jogador atual (Você) e a pontuação simulando o ESP */}
        <ul className="w-full space-y-4 mb-8 text-sm md:text-base font-extrabold text-ilga-black flex-grow">
          <li className="flex justify-between items-center border-b-2 border-gray-100 pb-3">
            <span>1. Jogador Web (Você)</span> 
            <span className="text-ilga-purple text-2xl">{finalScore} pts</span>
          </li>
          
          {/* Exemplo de outros jogadores estáticos para manter o design */}
          <li className="flex justify-between items-center border-b border-gray-100 pb-2 opacity-50">
            <span>2. ESP 32 . @ 12123344</span> 
            <span>0 pts</span>
          </li>
        </ul>

        <Link 
          href="/" 
          className="bg-ilga-green text-ilga-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-md mt-auto"
        >
          Jogar Novamente
        </Link>
      </div>
    </div>
  );
}