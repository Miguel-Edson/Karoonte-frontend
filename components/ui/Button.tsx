import { ReactNode } from "react";

interface OptionButtonProps {
  colorClass: string;
  icon: ReactNode;
  text: string;
  isFaded?: boolean; // Para a tela de gabarito
  onClick?: () => void;
}

export function OptionButton({ colorClass, icon, text, isFaded, onClick }: OptionButtonProps) {
  // Se estiver 'faded' (gabarito), fica cinza. Senão, usa a cor da Ilga.
  const bgClass = isFaded ? 'bg-gray-300 text-gray-100 border-gray-400' : `${colorClass} text-ilga-white border-black/20`;

  return (
    <button
      onClick={onClick}
      className={`${bgClass} flex items-center gap-4 p-4 rounded-xl border-b-4 active:border-b-0 active:translate-y-1 transition-all w-full`}
    >
      <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
        {icon}
      </div>
      <span className="font-bold text-left w-full truncate">{text}</span>
    </button>
  );
}