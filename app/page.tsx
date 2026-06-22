import Link from "next/link";
import Image from "next/image"; // Importe o componente Image do Next

export default function Home() {
  const dispositivos = [
    { id: 1, nome: "ESP 32", ip: "12123344" },
    { id: 2, nome: "ESP fi 32", ip: "12123344" },
  ];

  return (
    <main className="min-h-screen bg-ilga-purple flex flex-col items-center justify-between p-8 py-8">
      
      {/* 1. Topo - Logo */}
      <Image 
        src="/assets/LogoEscrita.svg" // Caminho considerando que está dentro de public/assets/
        alt="Logo Karoonte"
        width={250} // Ajuste o tamanho conforme necessário
        height={80} 
        priority // Carrega a logo mais rápido
      />

      {/* 2. Centro - Card Branco */}
      <div className="bg-ilga-white rounded-3xl shadow-2xl w-full max-w-md p-10 flex flex-col items-center min-h-95 justify-between relative">
        
        <div className="w-full">
          <h2 className="text-xl font-bold text-ilga-black mb-8 text-center">
            Dispositivos conectados ...
          </h2>
          
          <ul className="space-y-4 font-bold text-ilga-black text-sm pl-8">
            {dispositivos.map((disp, index) => (
              <li key={disp.id} className="tracking-wide">
                {index + 1}. {disp.nome} . @ {disp.ip}
              </li>
            ))}
          </ul>
        </div>

        <Link 
          href="/question" 
          className="bg-ilga-purple text-white px-12 py-3 rounded-xl font-bold text-2xl hover:brightness-110 hover:scale-105 transition-all shadow-md mt-8"
        >
          Iniciar
        </Link>
      </div>

      {/* 4. Base - Imagem Moes */}
      <Image 
        src="/assets/mãos.svg" // Troque pelo nome exato do seu arquivo
        alt="Imagem de base"
        width={500} // Ajuste o tamanho
        height={100}
        className="" // Dá pra brincar com a opacidade se quiser
      />
      
    </main>
  );
}