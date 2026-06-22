"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // 1. NOVO: Importamos o roteador automático do Next
import { ProgressBar } from "@/components/ui/ProgressBar";
import { OptionButton } from "@/components/ui/Button";
import { greekMythologyQuestions, Question } from "@/lib/questions";

export default function QuestionScreen() {
  const router = useRouter(); // Inicializa o roteador
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showGabarito, setShowGabarito] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isTimeOut, setIsTimeOut] = useState(false); // 2. NOVO: Para saber se o tempo esgotou ou se o jogador clicou

  useEffect(() => {
    const perguntasSorteadas = [...greekMythologyQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setGameQuestions(perguntasSorteadas);
  }, []);

  // 3. NOVO: Cronômetro Inteligente (15s para Pergunta, 5s para Gabarito)
  useEffect(() => {
    if (gameQuestions.length === 0) return;

    // Se estiver no gabarito, o tempo é 5s. Se estiver na pergunta, é 15s.
    const tempoAtualEmSegundos = showGabarito ? 5 : 15;
    const intervaloEmMs = 100;
    const passo = 100 / ((tempoAtualEmSegundos * 1000) / intervaloEmMs);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev - passo <= 0) return 0;
        return prev - passo;
      });
    }, intervaloEmMs);

    return () => clearInterval(timer);
  }, [showGabarito, currentQuestionIndex, gameQuestions.length]);

  // 4. NOVO: O que fazer quando a barra de progresso chega a 0%
  useEffect(() => {
    if (progress <= 0 && gameQuestions.length > 0) {
      if (!showGabarito) {
        // Caso A: Acabou o tempo de responder a pergunta (15s)
        setIsTimeOut(true);
        setIsCorrect(false);
        setProgress(100); // Enche a barra novamente para o cronômetro do Gabarito
        setShowGabarito(true);
      } else {
        // Caso B: Acabou o tempo de visualização do Gabarito (5s)
        if (currentQuestionIndex < gameQuestions.length - 1) {
          // Passa para a próxima pergunta automaticamente
          setCurrentQuestionIndex((prev) => prev + 1);
          setProgress(100); // Enche a barra para a nova pergunta
          setShowGabarito(false);
        } else {
          // Era a última pergunta! Vai para o Ranking automaticamente
          router.push("/results");
        }
      }
    }
  }, [progress, showGabarito, currentQuestionIndex, gameQuestions.length, router]);

  useEffect(() => {
    localStorage.setItem('karoonte_score', score.toString());
  }, [score]);

  const handleOptionClick = (selectedIndex: number) => {
    if (showGabarito) return;

    const currentQuestion = gameQuestions[currentQuestionIndex];
    const acertou = selectedIndex === currentQuestion.correctAnswerIndex;

    if (acertou) setScore((prev) => prev + 2);

    setIsTimeOut(false); // Clicou antes do tempo acabar
    setIsCorrect(acertou);
    setProgress(100); // 5. NOVO: Enche a barra para os 5 segundos do Gabarito
    setShowGabarito(true);
  };

  const IconTriangle = <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L22 20H2L12 2Z" /></svg>;
  const IconCircle = <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>;
  const IconDiamond = <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L22 12L12 22L2 12L12 2Z" /></svg>;
  const IconSquare = <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>;

  const buttonStyles = [
    { color: "bg-ilga-red", icon: IconTriangle },
    { color: "bg-ilga-blue", icon: IconDiamond },
    { color: "bg-ilga-orange", icon: IconCircle },
    { color: "bg-ilga-green", icon: IconSquare },
  ];

  if (gameQuestions.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <h2 className="text-ilga-white text-2xl font-bold animate-pulse">Preparando as perguntas...</h2>
      </div>
    );
  }

  const currentQuestion = gameQuestions[currentQuestionIndex];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-4xl mb-4 flex justify-between items-center gap-4 text-ilga-white font-bold">
        <span>Pergunta {currentQuestionIndex + 1}/{gameQuestions.length}</span>
        <ProgressBar progress={progress} />
      </div>

      <div className="bg-ilga-white rounded-3xl p-6 md:p-10 w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col min-h-[400px]">

        {showGabarito && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm transition-all duration-300">
            <div className={`text-ilga-white w-[150%] md:w-[200%] py-6 md:py-8 -rotate-[8deg] flex justify-center shadow-2xl transform scale-105 ${isTimeOut ? 'bg-ilga-black' : (isCorrect ? 'bg-ilga-green' : 'bg-ilga-red')}`}>
              <span className="text-4xl md:text-6xl font-black italic tracking-widest drop-shadow-xl">
                {isTimeOut ? "TEMPO ESGOTADO!" : (isCorrect ? "CORRETO!" : "INCORRETO!")}
              </span>
            </div>

            <span className="mt-16 bg-ilga-white text-ilga-black px-4 py-1 rounded-full font-bold text-sm shadow animate-pulse">
              Aguarde a próxima...
            </span>
          </div>
        )}

        <div className="flex-grow flex items-center justify-center mb-8 z-0">
          <h1 className="text-ilga-black text-lg md:text-2xl font-extrabold text-center leading-relaxed">
            {currentQuestion.text}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 z-0">
          {currentQuestion.options.map((optionText, index) => {
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
      </div>
    </div>
  );
}