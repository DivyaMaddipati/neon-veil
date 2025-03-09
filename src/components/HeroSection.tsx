
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
        <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-[#6c43ff]/10 blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-64 h-64 rounded-full bg-[#ff6b00]/10 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        <h1 className="hero-animate opacity-0 text-7xl md:text-9xl font-extrabold mb-4 tracking-wider font-roboto">
          AgentX
        </h1>
        <p className="hero-animate opacity-0 text-xl text-gray-400 mb-8 tracking-widest">
          Code &nbsp; Create &nbsp; Disrupt
        </p>
        
        <button 
          onClick={scrollToRegister} 
          className="hero-animate opacity-0 bg-[#232323] text-white font-medium py-3 px-10 rounded-full text-xl mb-20 relative overflow-hidden group mt-8"
        >
          <span className="relative z-10 flex items-center">
            Register Now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </span>
        </button>
        
        <div className="mt-16 w-full max-w-4xl">
          <div className="bg-[#2c1e54]/60 backdrop-blur-sm border border-[#6c43ff]/10 rounded-xl p-8">
            <p className="text-center text-xl mb-4 text-white/80">26 - 04 - 2025 &nbsp; Sat</p>
            <CountdownTimer targetDate="2025-04-26T00:00:00" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
