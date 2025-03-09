
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Hackathon", href: "#home", hasDropdown: true },
    { name: "Guide Lines", href: "#why-participate", hasDropdown: true },
    { name: "Get Involved", href: "#schedule", hasDropdown: true },
    { name: "Contact", href: "#contact", hasDropdown: false },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-2 shadow-lg' : 'bg-black py-4'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-bold">
            AgentX
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="text-white flex items-center"
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className="ml-1" size={16} />}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-10 font-normal">
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-black z-40 transition-all duration-300 ease-in-out transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } ${isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ top: '60px' }}
        >
          <div className="container mx-auto px-4 py-8">
            <nav className="flex flex-col space-y-6">
              {navLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="text-xl text-white flex items-center justify-between"
                  onClick={closeMenu}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={16} />}
                </a>
              ))}
              <Button className="bg-white text-black hover:bg-white/90 rounded-full w-full mt-4">
                Login
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
