
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.hero-animate');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const scrollToRegister = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-4">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-[#6c43ff]/20 blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-72 h-72 rounded-full bg-[#ff6b00]/20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
        <h1 className="hero-animate opacity-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold mb-4 tracking-wider font-roboto">
          <span className="text-glow gradient-text-purple">AgentX</span>
        </h1>
        <p className="hero-animate opacity-0 text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-10 tracking-widest">
          Code &nbsp; Create &nbsp; Disrupt
        </p>
        
        <button 
          onClick={scrollToRegister} 
          className="hero-animate opacity-0 bg-gradient-to-r from-[#6c43ff] to-[#8d6aff] text-white font-medium py-3 px-8 md:px-10 rounded-full text-lg md:text-xl mb-12 md:mb-20 relative overflow-hidden group mt-6 md:mt-8 hover:shadow-[0_0_15px_rgba(108,67,255,0.8)]"
        >
          <span className="relative z-10 flex items-center">
            Register Now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </span>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#8d6aff] to-[#6c43ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        
        <div className="mt-10 md:mt-16 w-full max-w-4xl">
          <div className="bg-[#2a1a4a]/80 backdrop-blur-md border border-[#6c43ff]/20 rounded-xl p-4 sm:p-6 md:p-8 shadow-[0_0_15px_rgba(108,67,255,0.2)]">
            <p className="text-center text-base sm:text-lg md:text-xl mb-4 md:mb-6 text-white/90">26 - 04 - 2025 &nbsp; Sat</p>
            <CountdownTimer targetDate="2025-04-26T00:00:00" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
