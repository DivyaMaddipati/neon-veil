
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
    <div className="flex justify-center items-center">
      {isMobile ? (
        // Mobile view - stacked layout
        <div className="grid grid-cols-2 gap-4 w-full">
          <TimeUnit value={timeLeft.days} label="DAYS" />
          <TimeUnit value={timeLeft.hours} label="HOURS" />
          <TimeUnit value={timeLeft.minutes} label="MINUTES" />
          <TimeUnit value={timeLeft.seconds} label="SECONDS" />
        </div>
      ) : (
        // Desktop view - horizontal layout
        <div className="flex items-center justify-center tracking-widest space-x-4">
          <TimeUnit value={timeLeft.days} label="DAYS" />
          <span className="text-white text-4xl md:text-6xl">:</span>
          <TimeUnit value={timeLeft.hours} label="HOURS" />
          <span className="text-white text-4xl md:text-6xl">:</span>
          <TimeUnit value={timeLeft.minutes} label="MINUTES" />
          <span className="text-white text-4xl md:text-6xl">:</span>
          <TimeUnit value={timeLeft.seconds} label="SECONDS" />
        </div>
      )}
    </div>
  );
};

// Extracted time unit component for reusability
const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="glass py-2 px-4 rounded-lg border border-[#6c43ff]/30 w-full">
      <span className="text-glow text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="text-xs text-gray-400 mt-2 font-medium">{label}</span>
  </div>
);

export default CountdownTimer;
