// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-ilga-purple flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-ilga-white mb-8">
        Bem-vindo ao Karoonte!
      </h1>
      
      {/* Botão que navega para a rota da pergunta */}
      <Link 
        href="/question" 
        className="bg-ilga-green text-ilga-white px-8 py-4 rounded-lg font-bold text-xl hover:scale-105 transition-transform"
      >
        Ir para o Jogo
      </Link>
    </main>
  );
}