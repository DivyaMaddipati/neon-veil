import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
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

  const navigateToRegistration = () => {
    navigate('/registration');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-20 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-[#6c43ff]/20 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[10%] w-72 h-72 rounded-full bg-[#ff6b00]/20 blur-[100px] animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
        <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="hero-animate opacity-0 text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl font-extrabold mb-4 tracking-wider font-roboto relative">
            <span className="text-glow gradient-text-purple relative">
              Agent<span className="text-glow-intense">X</span>
              <div className="absolute -inset-1 bg-[#6c43ff]/10 blur-lg rounded-full z-[-1]"></div>
            </span>
          </h1>
        </div>
        
        <p className="hero-animate opacity-0 text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-10 tracking-widest">
          Build &nbsp; Automate &nbsp; Disrupt
        </p>
        
        {/* Ensuring button is always visible */}
        {!isAuthenticated && (
          <button 
            onClick={navigateToRegistration} 
            className="bg-[#6c43ff] text-white font-medium py-3 px-8 md:px-10 rounded-md text-lg md:text-xl mb-12 md:mb-20 relative overflow-hidden group mt-6 md:mt-8 hover:shadow-[0_0_15px_rgba(108,67,255,0.8)] animate-pulse-glow"
          >
            <span className="relative z-10 flex items-center">
              Register Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </span>
            <div className="absolute inset-0 w-full h-full bg-[#7c3aed] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        )}
        
        <div className="mt-10 md:mt-16 w-full max-w-4xl">
          <div className="neo-glass p-4 sm:p-6 md:p-8 border border-[#6c43ff]/30 rounded-xl shadow-[0_0_25px_rgba(108,67,255,0.3)]">
            {/* Removed unnecessary font styling */}
            <p className="text-center text-base sm:text-lg md:text-xl mb-4 md:mb-6 text-white/90">
              Registration Opens: 14 - 03 - 2025
            </p>
            <CountdownTimer targetDate="2025-03-14T00:00:00" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
