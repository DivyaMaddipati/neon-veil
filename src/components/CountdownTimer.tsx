
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const isMobile = useIsMobile();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center items-center w-full max-w-4xl mx-auto">
      <div className={`${isMobile ? 'grid grid-cols-2 gap-3 w-full' : 'flex items-center justify-center space-x-4'}`}>
        <TimeUnit value={timeLeft.days} label="DAYS" />
        {!isMobile && <Separator />}
        <TimeUnit value={timeLeft.hours} label="HOURS" />
        {!isMobile && <Separator />}
        <TimeUnit value={timeLeft.minutes} label="MINUTES" />
        {!isMobile && <Separator />}
        <TimeUnit value={timeLeft.seconds} label="SECONDS" />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="neo-glass p-2 sm:p-3 md:p-4 rounded-xl border border-[#6c43ff]/30 w-full text-center relative group overflow-hidden transition-all duration-300 hover:border-[#6c43ff]/60 transform hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-br from-[#6c43ff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6c43ff] to-[#ff6b00] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
      <span className="text-glow text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tabular-nums relative z-10">
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="text-[10px] sm:text-xs text-gray-400 mt-2 font-medium tracking-wider cyber-font">{label}</span>
  </div>
);

const Separator = () => (
  <div className="flex items-center justify-center animate-pulse">
    <span className="text-[#6c43ff]/70 text-2xl md:text-4xl font-light mx-1">:</span>
  </div>
);

export default CountdownTimer;
