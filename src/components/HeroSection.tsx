
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
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-20">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-[#6c43ff]/20 blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-72 h-72 rounded-full bg-[#ff6b00]/20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <h1 className="hero-animate opacity-0 text-8xl md:text-9xl font-extrabold mb-4 tracking-wider font-roboto">
          <span className="text-glow gradient-text-purple">AgentX</span>
        </h1>
        <p className="hero-animate opacity-0 text-xl md:text-2xl text-gray-300 mb-10 tracking-widest">
          Code &nbsp; Create &nbsp; Disrupt
        </p>
        
        <button 
          onClick={scrollToRegister} 
          className="hero-animate opacity-0 bg-gradient-to-r from-[#6c43ff] to-[#8d6aff] text-white font-medium py-3 px-10 rounded-full text-xl mb-20 relative overflow-hidden group mt-8 hover:shadow-[0_0_15px_rgba(108,67,255,0.8)]"
        >
          <span className="relative z-10 flex items-center">
            Register Now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </span>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#8d6aff] to-[#6c43ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
        
        <div className="mt-16 w-full max-w-4xl">
          <div className="bg-[#2a1a4a]/80 backdrop-blur-md border border-[#6c43ff]/20 rounded-xl p-8 shadow-[0_0_15px_rgba(108,67,255,0.2)]">
            <p className="text-center text-xl mb-6 text-white/90">26 - 04 - 2025 &nbsp; Sat</p>
            <CountdownTimer targetDate="2025-04-26T00:00:00" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
