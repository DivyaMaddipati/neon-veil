
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
    <div className="grid grid-cols-4 gap-2 text-center">
      <div className="flex flex-col">
        <div className="glass py-4 px-2 rounded-lg mb-2 text-2xl md:text-3xl font-bold text-white">
          {String(timeLeft.days).padStart(2, '0')}
        </div>
        <span className="text-sm text-gray-300">Days</span>
      </div>
      
      <div className="flex flex-col">
        <div className="glass py-4 px-2 rounded-lg mb-2 text-2xl md:text-3xl font-bold text-white">
          {String(timeLeft.hours).padStart(2, '0')}
        </div>
        <span className="text-sm text-gray-300">Hours</span>
      </div>
      
      <div className="flex flex-col">
        <div className="glass py-4 px-2 rounded-lg mb-2 text-2xl md:text-3xl font-bold text-white">
          {String(timeLeft.minutes).padStart(2, '0')}
        </div>
        <span className="text-sm text-gray-300">Minutes</span>
      </div>
      
      <div className="flex flex-col">
        <div className="glass py-4 px-2 rounded-lg mb-2 text-2xl md:text-3xl font-bold text-white">
          {String(timeLeft.seconds).padStart(2, '0')}
        </div>
        <span className="text-sm text-gray-300">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
