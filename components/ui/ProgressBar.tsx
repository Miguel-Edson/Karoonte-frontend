interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full h-4 md:h-6 border-2 border-ilga-white rounded-full p-[2px] flex items-center">
      <div 
        className="h-full bg-ilga-white rounded-full transition-all duration-100 linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}