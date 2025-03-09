
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/70 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2 text-2xl font-bold">
          <span className="gradient-text-cyan">Hack</span>
          <span className="gradient-text-orange">Nova</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <button onClick={() => scrollTo('about')} className="text-white hover:text-hackathon-cyan transition-colors">About</button>
          <button onClick={() => scrollTo('challenges')} className="text-white hover:text-hackathon-cyan transition-colors">Challenges</button>
          <button onClick={() => scrollTo('prizes')} className="text-white hover:text-hackathon-cyan transition-colors">Prizes</button>
          <button onClick={() => scrollTo('timeline')} className="text-white hover:text-hackathon-cyan transition-colors">Timeline</button>
          <button onClick={() => scrollTo('faq')} className="text-white hover:text-hackathon-cyan transition-colors">FAQ</button>
        </nav>

        <div className="hidden md:block">
          <Button onClick={() => scrollTo('register')} className="btn-primary">Register Now</Button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden glass absolute w-full transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-[400px] opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <nav className="flex flex-col gap-4 px-4">
          <button onClick={() => scrollTo('about')} className="text-white hover:text-hackathon-cyan py-2 transition-colors">About</button>
          <button onClick={() => scrollTo('challenges')} className="text-white hover:text-hackathon-cyan py-2 transition-colors">Challenges</button>
          <button onClick={() => scrollTo('prizes')} className="text-white hover:text-hackathon-cyan py-2 transition-colors">Prizes</button>
          <button onClick={() => scrollTo('timeline')} className="text-white hover:text-hackathon-cyan py-2 transition-colors">Timeline</button>
          <button onClick={() => scrollTo('faq')} className="text-white hover:text-hackathon-cyan py-2 transition-colors">FAQ</button>
          <Button onClick={() => scrollTo('register')} className="btn-primary w-full">Register Now</Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
