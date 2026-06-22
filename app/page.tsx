"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import mqtt from "mqtt";

export default function Home() {
  const [dispositivos, setDispositivos] = useState<{ id: string }[]>([]);
  const [mqttClient, setMqttClient] = useState<mqtt.MqttClient | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Conecta ao Broker
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
    setMqttClient(client);

    client.on("connect", () => {
      console.log("Conectado ao Lobby!");
      client.subscribe("karoonte/lobby/dispositivos");
    });

    client.on("message", (topic, message) => {
      if (topic === "karoonte/lobby/dispositivos") {
        const lista = JSON.parse(message.toString());
        setDispositivos(lista); 
      }
    });

    return () => {
      client.end();
    };
  }, []);

  // Nova função que comanda o Servidor a iniciar a partida!
  const handleIniciarJogo = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que o link mude de página sozinho
    
    if (dispositivos.length > 0 && mqttClient) {
      console.log("Disparando comando de INICIAR_PARTIDA...");
      
      // Manda o sinal para o Orquestrador (Node.js) e pro ESP32
      mqttClient.publish("karoonte/servidor/controle_web", JSON.stringify({ acao: "INICIAR_PARTIDA" }));
      
      // Vai para a tela da Pergunta
      router.push("/question");
    }
  };

  return (
    <main className="min-h-screen bg-ilga-purple flex flex-col items-center justify-between p-8 py-8">
      <Image src="/assets/LogoEscrita.svg" alt="Logo Karoonte" width={250} height={80} priority />

      <div className="bg-ilga-white rounded-3xl shadow-2xl w-full max-w-md p-10 flex flex-col items-center min-h-[400px] justify-between relative">
        <div className="w-full">
          <h2 className="text-xl font-bold text-ilga-black mb-8 text-center">
            {dispositivos.length > 0 ? "Dispositivos conectados:" : "Aguardando jogadores..."}
          </h2>
          
          <ul className="space-y-4 font-bold text-ilga-black text-sm pl-8">
            {dispositivos.map((disp, index) => (
              <li key={disp.id} className="tracking-wide animate-pulse">
                {index + 1}. Jogador: {disp.id}
              </li>
            ))}
          </ul>
        </div>

        {/* Botão agora executa a função de disparar o MQTT */}
        <button 
          onClick={handleIniciarJogo}
          disabled={dispositivos.length === 0}
          className={`px-12 py-3 rounded-xl font-bold text-2xl transition-all shadow-md mt-8 ${
            dispositivos.length > 0 
              ? "bg-ilga-purple text-white hover:brightness-110 hover:scale-105 cursor-pointer" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Iniciar
        </button>
      </div>

      <Image src="/assets/mãos.svg" alt="Imagem de base" width={500} height={100} />
    </main>
  );
}