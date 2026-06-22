export default function ResultsScreen() {
  return (
    <div className="w-full flex flex-col items-center mt-12">
      <div className="bg-ilga-white rounded-3xl p-8 md:p-12 w-full max-w-md shadow-2xl flex flex-col items-center min-h-[350px]">
        
        <h2 className="text-ilga-black font-extrabold mb-8 text-xl tracking-tight">
          Pontuação
        </h2>
        
        <ul className="w-full space-y-4 mb-8 text-xs md:text-sm font-extrabold text-ilga-black flex-grow">
          <li className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span>1. ESP 32 . @ 12123344</span> 
            <span>122</span>
          </li>
          <li className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span>2. ESP 32 . @ 12123344</span> 
            <span>99</span>
          </li>
        </ul>

      </div>
    </div>
  );
}