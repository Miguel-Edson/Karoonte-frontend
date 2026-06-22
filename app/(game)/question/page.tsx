"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import mqtt from "mqtt";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { OptionButton } from "@/components/ui/Button";
import { greekMythologyQuestions, Question } from "@/lib/questions";

export default function QuestionScreen() {
  const router = useRouter();
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showGabarito, setShowGabarito] = useState(false);
  const [progress, setProgress] = useState(100);
  const [isTimeOut, setIsTimeOut] = useState(false);
  
  const [respostasJogadores, setRespostasJogadores] = useState<Record<string, number>>({});
  const [scores, setScores] = useState<Record<string, number>>({});
  
  const TOTAL_JOGADORES = 2; 
  
  // Identificador para o jogador que está clicando na tela do navegador
  const JOGADOR_WEB_ID = "WEB_1";
  const webJaRespondeu = respostasJogadores[JOGADOR_WEB_ID] !== undefined;

  useEffect(() => {
    const perguntasSorteadas = [...greekMythologyQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    setGameQuestions(perguntasSorteadas);
  }, []);

  useEffect(() => {
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

    client.on("connect", () => {
      console.log("Conectado ao jogo!");
      client.subscribe("karoonte/game/resposta");
    });

    client.on("message", (topic, message) => {
      if (topic === "karoonte/game/resposta" && !showGabarito) {
        try {
          const data = JSON.parse(message.toString());
          setRespostasJogadores((prev) => {
            // Se este ESP já respondeu nesta rodada, ignora qualquer outro clique dele!
            if (prev[data.id] !== undefined) return prev; 
            return { ...prev, [data.id]: data.resposta };
          });
        } catch (error) {
          console.error("Erro ao ler MQTT:", error);
        }
      }
    });

    return () => {
      client.end();
    };
  }, [showGabarito]);

  useEffect(() => {
    const totalRespostas = Object.keys(respostasJogadores).length;
    if (totalRespostas >= TOTAL_JOGADORES && !showGabarito) {
      finalizarRodada(false); 
    }
  }, [respostasJogadores, showGabarito]);

  useEffect(() => {
    if (gameQuestions.length === 0) return;

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

  useEffect(() => {
    if (progress <= 0 && gameQuestions.length > 0) {
      if (!showGabarito) {
        finalizarRodada(true);
      } else {
        if (currentQuestionIndex < gameQuestions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setProgress(100);
          setRespostasJogadores({}); 
          setShowGabarito(false);
        } else {
          localStorage.setItem('karoonte_scores_multiplayer', JSON.stringify(scores));
          router.push("/results");
        }
      }
    }
  }, [progress, showGabarito, currentQuestionIndex, gameQuestions.length, router, scores]);

  const finalizarRodada = (porTempoEsgotado: boolean) => {
    const currentQuestion = gameQuestions[currentQuestionIndex];
    const correta = currentQuestion.correctAnswerIndex;

    setScores((prevScores) => {
      const novosScores = { ...prevScores };
      Object.entries(respostasJogadores).forEach(([idJogador, respostaEscolhida]) => {
        if (respostaEscolhida === correta) {
          novosScores[idJogador] = (novosScores[idJogador] || 0) + 2;
        }
      });
      return novosScores;
    });

    setIsTimeOut(porTempoEsgotado);
    setProgress(100); 
    setShowGabarito(true);
  };

  const handleOptionClick = (selectedIndex: number) => {
    // SE JÁ ESTIVER NO GABARITO OU SE O JOGADOR WEB JÁ RESPONDEU, BLOQUEIA O CLIQUE!
    if (showGabarito || webJaRespondeu) return;
    
    setRespostasJogadores((prev) => {
      if (prev[JOGADOR_WEB_ID] !== undefined) return prev;
      return { ...prev, [JOGADOR_WEB_ID]: selectedIndex };
    });
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
        <div className="flex-grow flex justify-center">
          <span className="text-sm bg-black/20 px-4 py-1 rounded-full">
            Respostas recebidas: {Object.keys(respostasJogadores).length} / {TOTAL_JOGADORES}
          </span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      <div className="bg-ilga-white rounded-3xl p-6 md:p-10 w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col min-h-[400px]">
        
        {showGabarito && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm transition-all duration-300">
            <div className={`text-ilga-white w-[150%] md:w-[200%] py-6 md:py-8 -rotate-[8deg] flex justify-center shadow-2xl transform scale-105 ${isTimeOut ? 'bg-ilga-black' : 'bg-ilga-green'}`}>
              <span className="text-4xl md:text-6xl font-black italic tracking-widest drop-shadow-xl text-center">
                {isTimeOut ? "TEMPO ESGOTADO!" : "GABARITO!"}
              </span>
            </div>
            
            <span className="mt-16 bg-ilga-white text-ilga-black px-4 py-1 rounded-full font-bold text-sm shadow animate-pulse">
              Aguarde a próxima...
            </span>
          </div>
        )}

        {/* Aviso de "Aguardando" se o jogador web já clicou e está esperando o ESP */}
        {!showGabarito && webJaRespondeu && (
           <div className="absolute top-4 right-6 z-10 bg-ilga-yellow text-ilga-black text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow">
             Sua resposta foi registrada. Aguardando oponentes...
           </div>
        )}

        <div className="flex-grow flex items-center justify-center mb-8 z-0">
          <h1 className="text-ilga-black text-lg md:text-2xl font-extrabold text-center leading-relaxed">
            {currentQuestion.text}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 z-30 relative">
          {currentQuestion.options.map((optionText, index) => {
            
            // LÓGICA DE FADE (Apagar os botões)
            // 1. Se estiver no gabarito, apaga as respostas incorretas.
            // 2. Se o jogador Web respondeu, apaga instantaneamente as opções que ele NÃO escolheu.
            const isFaded = showGabarito 
              ? index !== currentQuestion.correctAnswerIndex
              : (webJaRespondeu && respostasJogadores[JOGADOR_WEB_ID] !== index);
            
            const jogadoresNestaOpcao = Object.entries(respostasJogadores)
              .filter(([id, resposta]) => resposta === index)
              .map(([id]) => id);

            return (
              <div key={index} className="relative w-full">
                <OptionButton 
                  onClick={() => handleOptionClick(index)} 
                  colorClass={buttonStyles[index].color} 
                  icon={buttonStyles[index].icon} 
                  text={optionText} 
                  isFaded={isFaded} 
                />
                
                {showGabarito && jogadoresNestaOpcao.length > 0 && (
                  <div className="absolute -top-3 -right-2 flex gap-1 z-40 opacity-100 animate-bounce">
                    {jogadoresNestaOpcao.map((jogadorId, i) => (
                      <div key={i} className="bg-ilga-black text-ilga-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg border-2 border-white transform scale-110">
                        {jogadorId.substring(0, 5)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}