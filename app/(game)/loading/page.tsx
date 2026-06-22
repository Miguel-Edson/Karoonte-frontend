import Link from "next/link";

export default function LoadingScreen() {
  return (
    <div className="w-full flex flex-col items-center mt-8">
      <h1 className="text-ilga-white text-5xl font-extrabold tracking-wide mb-8 drop-shadow-md">
        Karoonte!
      </h1>
      
      <div className="bg-ilga-white rounded-3xl p-8 w-full max-w-sm shadow-2xl flex flex-col items-center">
        <h2 className="text-ilga-black font-extrabold mb-6 text-sm tracking-tight text-center">
          Dispositivos conectados ...
        </h2>
        
        <ul className="w-full space-y-2 mb-8 text-xs font-bold text-ilga-black flex-grow px-4">
          <li className="flex justify-between">
            <span>1. ESP 32 .</span> <span>@ 12123344</span>
          </li>
          <li className="flex justify-between">
            <span>2. ESP Fi 32 .</span> <span>@ 12123344</span>
          </li>
        </ul>

        <Link 
          href="/question" 
          className="bg-ilga-purple text-ilga-white px-10 py-2 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-md"
        >
          Iniciar
        </Link>
      </div>

      {/* Ícones dos dispositivos conectados (Baseado no design) */}
      <div className="flex gap-4 mt-8">
         <div className="w-6 h-10 bg-ilga-red rounded border-2 border-ilga-white rotate-[-15deg] shadow-lg flex items-center justify-center text-ilga-white text-[10px]">▲</div>
         <div className="w-6 h-10 bg-ilga-orange rounded border-2 border-ilga-white shadow-lg flex items-center justify-center text-ilga-white text-[10px]">●</div>
         <div className="w-6 h-10 bg-ilga-green rounded border-2 border-ilga-white rotate-[15deg] shadow-lg flex items-center justify-center text-ilga-white text-[10px]">■</div>
         <div className="w-6 h-10 bg-ilga-blue rounded border-2 border-ilga-white rotate-[25deg] shadow-lg flex items-center justify-center text-ilga-white text-[10px]">◆</div>
      </div>
    </div>
  );
}