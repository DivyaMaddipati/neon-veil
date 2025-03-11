
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

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-2">
              <img 
                src="/public/lovable-uploads/ed0a1a66-1838-4999-b3f7-ff8ad3d77804.png" 
                alt="AI Tribe Logo" 
                className="h-12 md:h-16 mr-3 hidden md:block"
              />
            </div>
            <h1 className="hero-animate opacity-0 text-5xl sm:text-6xl md:text-7xl font-extrabold mb-2 tracking-wider font-sans">
              <span className="text-[#00b8c4] font-bold">AGENT</span>
              <span className="text-[#00b8c4] font-bold text-7xl sm:text-8xl md:text-9xl">X</span>
            </h1>
            <p className="hero-animate opacity-0 text-xl sm:text-xl md:text-2xl text-gray-300 mb-2 tracking-widest uppercase font-medium">
              BUILD &bull; AUTOMATE &bull; DISRUPT
            </p>
            <h2 className="hero-animate opacity-0 text-3xl sm:text-4xl md:text-5xl font-bold text-[#4a8ecc] mb-6 mt-4">
              AI HACKATHON 2025
            </h2>
            
            <div className="hero-animate opacity-0 bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-lg shadow-lg mb-8 w-full max-w-md">
              <h3 className="text-xl font-bold text-white mb-2">Theme:</h3>
              <p className="text-lg text-white">AI for Good: Empowering Social Impact</p>
            </div>
            
            <button 
              onClick={scrollToRegister} 
              className="hero-animate opacity-0 bg-gradient-to-r from-[#6c43ff] to-[#8d6aff] text-white font-medium py-3 px-8 md:px-10 rounded-full text-lg md:text-xl mb-12 md:mb-16 relative overflow-hidden group hover:shadow-[0_0_15px_rgba(108,67,255,0.8)]"
            >
              <span className="relative z-10 flex items-center">
                Register Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </span>
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#8d6aff] to-[#6c43ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
          
          <div className="hidden lg:flex justify-center lg:justify-end">
            <img 
              src="/public/lovable-uploads/ed0a1a66-1838-4999-b3f7-ff8ad3d77804.png" 
              alt="AI Hackathon Robot" 
              className="w-full max-w-md object-contain animate-float"
            />
          </div>
        </div>
        
        <div className="mt-10 md:mt-8 w-full max-w-4xl mx-auto">
          <div className="bg-[#2a1a4a]/80 backdrop-blur-md border border-[#6c43ff]/20 rounded-xl p-4 sm:p-6 md:p-8 shadow-[0_0_15px_rgba(108,67,255,0.2)]">
            <p className="text-center text-base sm:text-lg md:text-xl mb-4 md:mb-6 text-white/90">26 - 04 - 2025 &nbsp; Sat</p>
            <CountdownTimer targetDate="2025-04-26T00:00:00" />
          </div>
        </div>
        
        <div className="mt-16 w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#1a1a2e]/80 backdrop-blur-md border border-blue-500/20 rounded-xl p-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Powered By</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                  </div>
                  <span className="text-lg font-medium text-blue-200">COGNITBOTZ</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  </div>
                  <span className="text-lg font-medium text-blue-200">NAIPUNYA AI LABS</span>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1a1a2e]/80 backdrop-blur-md border border-blue-500/20 rounded-xl p-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Key Dates</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  </div>
                  <span className="text-base font-medium text-blue-200">Mar 14: Open for Registrations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  </div>
                  <span className="text-base font-medium text-blue-200">Mar 26: Closing Registrations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500/20 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  </div>
                  <span className="text-base font-medium text-blue-200">Apr 26: Grand Hackathon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
