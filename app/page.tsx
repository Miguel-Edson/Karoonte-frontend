"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import mqtt from "mqtt";

export default function Home() {
  const [dispositivos, setDispositivos] = useState<{ id: string }[]>([]);

  useEffect(() => {
    // Conecta ao Broker (usando WSS para navegadores)
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

    client.on("connect", () => {
      console.log("Conectado ao Lobby!");
      // Assina o tópico de dispositivos (exemplo de tópico que o servidor pode publicar)
      client.subscribe("karoonte/lobby/dispositivos");
    });

    client.on("message", (topic, message) => {
      if (topic === "karoonte/lobby/dispositivos") {
        const lista = JSON.parse(message.toString());
        setDispositivos(lista); // O servidor envia a lista completa [{id: "aladdin"}, ...]
      }
    });

    return () => {
      client.end();
    };
  }, []);

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

        {/* Só libera o botão quando houver pelo menos 1 jogador */}
        <Link 
          href="/question" 
          className={`px-12 py-3 rounded-xl font-bold text-2xl transition-all shadow-md mt-8 ${
            dispositivos.length > 0 
              ? "bg-ilga-purple text-white hover:brightness-110 hover:scale-105" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={(e) => dispositivos.length === 0 && e.preventDefault()}
        >
          Iniciar
        </Link>
      </div>

      <Image src="/assets/mãos.svg" alt="Imagem de base" width={500} height={100} />
    </main>
  );
}