import React, { useEffect } from 'react';
import { Trophy, Medal } from 'lucide-react';

const PrizesSection = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.prize-animate').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section id="prizes" className="py-20 md:py-24 bg-black relative px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 right-[15%] w-72 h-72 rounded-full bg-[#ffb700]/10 blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-[15%] w-72 h-72 rounded-full bg-[#c0c0c0]/10 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 prize-animate opacity-0">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block">
            <span className="text-[#ffb700]">Prizes</span> & Rewards
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#ffb700] to-[#ff6b00]"></div>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">Excellence deserves recognition. Compete to win these amazing prizes!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* First Prize */}
          <div className="prize-animate opacity-0 order-1 md:order-1 transform md:scale-110 z-10">
            <div className="neo-glass-premium border border-[#ffb700]/40 rounded-xl p-8 flex flex-col items-center text-center relative h-full transform hover:scale-105 transition-all duration-300 group">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#ffb700] to-[#ff6b00] text-white text-xs px-4 py-1 rounded-full font-bold uppercase tracking-wider">
                Top Prize
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-b from-[#ffb700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              
              <div className="gold-medal-glow relative mb-6 w-28 h-28 flex items-center justify-center">
                <Trophy className="w-24 h-24 text-[#ffb700]" strokeWidth={1} />
                <div className="absolute inset-0 bg-[#ffb700]/20 rounded-full blur-lg opacity-50 animate-pulse-slow"></div>
              </div>
              
              <h3 className="text-2xl font-bold mb-1 text-[#ffb700]">1st Prize</h3>
              <div className="text-4xl md:text-5xl font-bold text-white mb-4 shimmer-gold">₹1,00,000</div>
              
              <p className="text-gray-400 text-sm">For the most innovative and impactful solution</p>
              
              <div className="mt-4 pt-4 border-t border-[#ffb700]/20 w-full">
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb700] mr-2"></span>
                    Gold certification
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb700] mr-2"></span>
                    Direct job offers
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb700] mr-2"></span>
                    Tech merchandise
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Second Prize */}
          <div className="prize-animate opacity-0 order-2 md:order-2">
            <div className="neo-glass border border-[#c0c0c0]/40 rounded-xl p-6 flex flex-col items-center text-center relative h-full transform hover:scale-105 transition-all duration-300 group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#c0c0c0]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              
              <div className="silver-medal-glow relative mb-6 w-24 h-24 flex items-center justify-center">
                <Medal className="w-20 h-20 text-[#c0c0c0]" strokeWidth={1} />
                <div className="absolute inset-0 bg-[#c0c0c0]/20 rounded-full blur-lg opacity-50 animate-pulse-slow"></div>
              </div>
              
              <h3 className="text-2xl font-bold mb-1 text-[#c0c0c0]">2nd Prize</h3>
              <div className="text-3xl md:text-4xl font-bold text-white mb-4 shimmer-silver">₹60,000</div>
              
              <p className="text-gray-400 text-sm">Runner up team with exceptional innovation</p>
              
              <div className="mt-4 pt-4 border-t border-[#c0c0c0]/20 w-full">
                <ul className="text-sm text-gray-300 space-y-2">
                  <li className="flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c0c0c0] mr-2"></span>
                    Silver certification
                  </li>
                  <li className="flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c0c0c0] mr-2"></span>
                    Internship opportunities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
