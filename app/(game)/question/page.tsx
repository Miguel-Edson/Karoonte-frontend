"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { OptionButton } from "@/components/ui/Button";
// 1. Importamos as perguntas que acabamos de criar
import { greekMythologyQuestions } from "@/lib/questions";

export default function QuestionScreen() {
  // Controle de qual pergunta está aparecendo agora (0 é a primeira)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [showGabarito, setShowGabarito] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isCorrect, setIsCorrect] = useState(false); // Para mostrar a cor/texto certo

  // Pegamos a pergunta atual com base no índice
  const currentQuestion = greekMythologyQuestions[currentQuestionIndex];

  // Lógica do cronômetro
  useEffect(() => {
    if (showGabarito) return;

    const tempoTotalEmSegundos = 15; 
    const intervaloEmMs = 100; 
    const passo = 100 / ((tempoTotalEmSegundos * 1000) / intervaloEmMs);

    const timer = setInterval(() => {
      setProgress((valorAnterior) => {
        if (valorAnterior - passo <= 0) {
          clearInterval(timer);
          setIsCorrect(false); // Se o tempo acabou, errou!
          setShowGabarito(true);
          return 0;
        }
        return valorAnterior - passo;
      });
    }, intervaloEmMs);

    return () => clearInterval(timer);
  }, [showGabarito, currentQuestionIndex]);

  // Função para lidar com o clique na alternativa
  const handleOptionClick = (selectedIndex: number) => {
    if (showGabarito) return; // Trava o clique se já respondeu

    const acertou = selectedIndex === currentQuestion.correctAnswerIndex;
    setIsCorrect(acertou);
    setShowGabarito(true);
  };

  // Função para avançar para a próxima pergunta
  const handleNextQuestion = () => {
    if (currentQuestionIndex < greekMythologyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowGabarito(false);
      setProgress(100);
    }
  };

  const IconTriangle = <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L22 20H2L12 2Z"/></svg>;
  const IconCircle = <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>;
  const IconDiamond = <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L22 12L12 22L2 12L12 2Z"/></svg>;
  const IconSquare = <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>;

  // Um array com as propriedades de cada botão para facilitar a renderização
  const buttonStyles = [
    { color: "bg-ilga-red", icon: IconTriangle },
    { color: "bg-ilga-blue", icon: IconDiamond },
    { color: "bg-ilga-orange", icon: IconCircle },
    { color: "bg-ilga-green", icon: IconSquare },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl mb-4 flex justify-between items-center gap-4 text-ilga-white font-bold">
        <span>Pergunta {currentQuestionIndex + 1}/{greekMythologyQuestions.length}</span>
        <ProgressBar progress={progress} />
      </div>

      <div className="bg-ilga-white rounded-3xl p-6 md:p-10 w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col min-h-[400px]">
        
        {/* Faixa do Gabarito Dinâmica (Acerto, Erro ou Fim de tempo) */}
        {showGabarito && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className={`text-ilga-white w-[120%] py-4 -rotate-[8deg] flex justify-center shadow-xl ${progress <= 0 ? 'bg-ilga-black' : (isCorrect ? 'bg-ilga-green' : 'bg-ilga-red')}`}>
              <span className="text-3xl md:text-5xl font-extrabold italic tracking-wider drop-shadow-md">
                {progress <= 0 ? "TEMPO ESGOTADO!" : (isCorrect ? "CORRETO!" : "INCORRETO!")}
              </span>
            </div>
          </div>
        )}

        {/* Texto Dinâmico da Pergunta */}
        <div className="flex-grow flex items-center justify-center mb-8 z-0">
          <h1 className="text-ilga-black text-lg md:text-2xl font-extrabold text-center leading-relaxed">
            {currentQuestion.text}
          </h1>
        </div>

        {/* Alternativas Dinâmicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 z-0">
          {currentQuestion.options.map((optionText, index) => {
            // Se o gabarito estiver ativo, apenas a resposta correta não fica apagada
            const isFaded = showGabarito && index !== currentQuestion.correctAnswerIndex;
            
            return (
              <OptionButton 
                key={index}
                onClick={() => handleOptionClick(index)} 
                colorClass={buttonStyles[index].color} 
                icon={buttonStyles[index].icon} 
                text={optionText} 
                isFaded={isFaded} 
              />
            );
          })}
        </div>

        {/* Links de navegação após responder */}
        {showGabarito && (
          <div className="mt-8 flex justify-between z-20">
            <Link href="/results" className="text-ilga-black font-bold underline">
              Finalizar e ver Ranking
            </Link>
            
            {/* Botão de Próxima Pergunta (só aparece se não for a última) */}
            {currentQuestionIndex < greekMythologyQuestions.length - 1 && (
              <button 
                onClick={handleNextQuestion}
                className="bg-ilga-black text-ilga-white px-6 py-2 rounded-lg font-bold hover:scale-105 transition-transform"
              >
                Próxima Pergunta &rarr;
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}