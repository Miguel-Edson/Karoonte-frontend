"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import mqtt from "mqtt";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { OptionButton } from "@/components/ui/Button";

const LETRAS = ["A", "B", "C", "D"];
const TEMPO_TOTAL_SEGUNDOS = 20;

export default function QuestionScreen() {
  const router = useRouter();
  
  // Estados guiados pelo Servidor
  const [statusPartida, setStatusPartida] = useState<string>("AGUARDANDO");
  const [pergunta, setPergunta] = useState<any>(null);
  const [estatisticas, setEstatisticas] = useState<any>({ A: 0, B: 0, C: 0, D: 0 });
  const [gabarito, setGabarito] = useState<string | null>(null);
  
  // Estados Locais de UI
  const [numeroPergunta, setNumeroPergunta] = useState(0);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

    client.on("connect", () => {
      console.log("📺 Telão conectado ao Orquestrador!");
      client.subscribe("karoonte/web/painel");
    });

    client.on("message", (topic, message) => {
      if (topic === "karoonte/web/painel") {
        const payload = JSON.parse(message.toString());

        if (payload.status === "RODADA_INICIADA") {
          setStatusPartida("RODADA_INICIADA");
          setPergunta(payload.pergunta);
          setNumeroPergunta((prev) => prev + 1); // Incrementa a rodada
          setProgress(100); // Enche a barra
          setGabarito(null); 
          setEstatisticas({ A: 0, B: 0, C: 0, D: 0 }); 
        } 
        else if (payload.status === "RODADA_ENCERRADA") {
          setStatusPartida("RODADA_ENCERRADA");
          setEstatisticas(payload.estatisticas);
          setGabarito(payload.gabarito);
          setProgress(0); // Zera a barra na hora (se encerrou por votos)
        }
        else if (payload.status === "JOGO_FINALIZADO") {
          localStorage.setItem("rankingFinal", JSON.stringify(payload.ranking));
          router.push("/results"); 
        }
      }
    });

    return () => {
      client.end();
    };
  }, [router]);

  // Efeito da Barra de Progresso Suave (escorre a cada 100ms)
  useEffect(() => {
    if (statusPartida === "RODADA_INICIADA" && progress > 0) {
      const intervaloEmMs = 100;
      const passo = 100 / ((TEMPO_TOTAL_SEGUNDOS * 1000) / intervaloEmMs);

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev - passo <= 0) return 0;
          return prev - passo;
        });
      }, intervaloEmMs);

      return () => clearInterval(timer);
    }
  }, [statusPartida, progress]);

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

  if (statusPartida === "AGUARDANDO" || !pergunta) {
    return (
      <div className="flex-grow flex items-center justify-center min-h-[400px]">
        <h2 className="text-ilga-white text-3xl font-bold animate-pulse">Aguardando início da partida...</h2>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* CABEÇALHO COM CONTADOR DE RODADA E BARRA */}
      <div className="w-full max-w-4xl mb-4 flex justify-between items-center gap-4 text-ilga-white font-bold">
        <span>Pergunta {numeroPergunta}/5</span>
        <ProgressBar progress={progress} />
      </div>

      <div className="bg-ilga-white rounded-3xl p-6 md:p-10 w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col min-h-[400px]">

        {/* CAIXA DA PERGUNTA */}
        <div className="flex-grow flex items-center justify-center mb-8 z-10 relative">
          <h1 className="text-ilga-black text-lg md:text-3xl font-extrabold text-center leading-relaxed">
            {pergunta.text}
          </h1>
        </div>

        {/* GRID DE ALTERNATIVAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 z-10 relative">
          {pergunta.options.map((optionText: string, index: number) => {
            const letraBotao = LETRAS[index];
            const votos = estatisticas[letraBotao as keyof typeof estatisticas] || 0;
            
            // Fica "faded" se a rodada acabou e não é o gabarito
            const isFaded = statusPartida === "RODADA_ENCERRADA" && gabarito !== letraBotao;

            return (
              <div key={index} className="relative w-full">
                <OptionButton
                  onClick={() => {}} // Não faz nada ao clicar, vira dummy!
                  colorClass={buttonStyles[index].color}
                  icon={buttonStyles[index].icon}
                  text={`${letraBotao} - ${optionText}`}
                  isFaded={isFaded}
                />
                
                {/* Balão de Votos: Aparece no canto do botão quando a rodada encerra */}
                {statusPartida === "RODADA_ENCERRADA" && (
                  <div className="absolute -top-3 -right-3 bg-ilga-black text-white font-bold text-xl px-4 py-2 rounded-full shadow-lg border-4 border-white animate-bounce">
                    {votos}
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