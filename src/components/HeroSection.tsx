
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
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
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-20">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-hackathon-cyan/10 blur-[100px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-64 h-64 rounded-full bg-hackathon-orange/10 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="space-y-6">
              <h2 className="hero-animate opacity-0 inline-block text-lg md:text-xl px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="text-hackathon-cyan font-semibold">48-Hour Hackathon</span> • Oct 15-17, 2024
              </h2>
              
              <h1 ref={titleRef} className="hero-animate opacity-0 text-4xl md:text-5xl lg:text-6xl font-extrabold !leading-tight">
                Unleash <span className="gradient-text-cyan">Innovation</span>
                <br />
                Forge <span className="gradient-text-orange">Tomorrow</span>
              </h1>
              
              <p className="hero-animate opacity-0 text-lg text-gray-300 max-w-xl">
                Join 500+ hackers from around the world in building revolutionary 
                solutions to real-world challenges. Code. Create. Connect.
              </p>
              
              <div className="hero-animate opacity-0 flex flex-wrap gap-4 pt-2">
                <Button onClick={scrollToRegister} className="btn-primary group">
                  Register Now 
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/5 transition-colors">
                  Learn More
                </Button>
              </div>
              
              <div className="hero-animate opacity-0 flex flex-col sm:flex-row sm:items-center gap-4 mt-8 pt-4 border-t border-white/10">
                <div className="flex items-center">
                  <Calendar className="mr-2 text-hackathon-cyan" size={20} />
                  <span>October 15-17, 2024</span>
                </div>
                <div className="hidden sm:block h-6 w-px bg-white/20"></div>
                <div className="flex items-center">
                  <MapPin className="mr-2 text-hackathon-orange" size={20} />
                  <span>Virtual & Tech Campus Arena</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="glass w-full max-w-md p-8 rounded-xl neon-cyan-glow animate-float">
              <h3 className="text-2xl font-bold mb-6 text-center gradient-text-cyan">Countdown to HackNova</h3>
              <CountdownTimer targetDate="2024-10-15T09:00:00" />
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="mb-4 text-gray-300">Limited spots available</p>
                <Button onClick={scrollToRegister} className="btn-primary w-full">Secure Your Spot</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
