
import { useState, useEffect } from 'react';

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
      <div className="text-center">
        <div className="text-6xl md:text-8xl font-bold flex items-center justify-center tracking-widest space-x-4">
          <div className="flex flex-col items-center">
            <span className="text-glow text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-xs md:text-sm text-gray-400 mt-2">HOURS</span>
          </div>
          <span className="text-white">:</span>
          <div className="flex flex-col items-center">
            <span className="text-glow text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-xs md:text-sm text-gray-400 mt-2">MINUTES</span>
          </div>
          <span className="text-white">:</span>
          <div className="flex flex-col items-center">
            <span className="text-glow text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="text-xs md:text-sm text-gray-400 mt-2">SECONDS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
