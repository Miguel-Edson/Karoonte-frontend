"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { OptionButton } from "@/components/ui/Button";

export default function QuestionScreen() {
  const [showGabarito, setShowGabarito] = useState(false);
  const [progress, setProgress] = useState(100);

  // Lógica do cronômetro
  useEffect(() => {
    // Se o gabarito já estiver aparecendo, pausa o cronômetro
    if (showGabarito) return;

    const tempoTotalEmSegundos = 15; // Defina quantos segundos a pergunta vai durar
    const intervaloEmMs = 100; // Atualiza a barra a cada 100 milissegundos para ficar fluido
    const passo = 100 / ((tempoTotalEmSegundos * 1000) / intervaloEmMs);

    const timer = setInterval(() => {
      setProgress((valorAnterior) => {
        if (valorAnterior - passo <= 0) {
          clearInterval(timer);
          setShowGabarito(true); // Mostra o gabarito automaticamente quando o tempo acaba!
          return 0;
        }
        return valorAnterior - passo;
      });
    }, intervaloEmMs);

    // Limpa o temporizador quando o componente é desmontado
    return () => clearInterval(timer);
  }, [showGabarito]); // O array de dependências avisa que o timer deve reagir ao estado 'showGabarito'

  const IconTriangle = <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L22 20H2L12 2Z"/></svg>;
  const IconCircle = <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>;
  const IconDiamond = <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L22 12L12 22L2 12L12 2Z"/></svg>;
  const IconSquare = <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl mb-4">
        {/* Passamos o estado 'progress' dinâmico para a barra */}
        <ProgressBar progress={progress} />
      </div>

      <div className="bg-ilga-white rounded-3xl p-6 md:p-10 w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col min-h-[400px]">
        
        {showGabarito && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="bg-ilga-green text-ilga-white w-[120%] py-4 -rotate-[8deg] flex justify-center shadow-xl">
              <span className="text-3xl md:text-5xl font-extrabold italic tracking-wider drop-shadow-md">
                {progress <= 0 ? "TEMPO ESGOTADO!" : "2 ACERTOS!"}
              </span>
            </div>
          </div>
        )}

        <div className="flex-grow flex items-center justify-center mb-8 z-0">
          <h1 className="text-ilga-black text-lg md:text-2xl font-extrabold text-center leading-relaxed">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem ?
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 z-0">
          <OptionButton onClick={() => setShowGabarito(true)} colorClass="bg-ilga-red" icon={IconTriangle} text="Alternativa 1" isFaded={false} />
          <OptionButton colorClass="bg-ilga-blue" icon={IconDiamond} text="Alternativa 3" isFaded={showGabarito} />
          <OptionButton colorClass="bg-ilga-orange" icon={IconCircle} text="Alternativa 2" isFaded={showGabarito} />
          <OptionButton colorClass="bg-ilga-green" icon={IconSquare} text="Alternativa 4" isFaded={showGabarito} />
        </div>

        {showGabarito && (
          <Link href="/results" className="mt-6 text-center text-ilga-black font-bold underline z-20">
            Avançar para Pontuação &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}