import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && 
          dropdownRefs.current[activeDropdown] && 
          !dropdownRefs.current[activeDropdown]?.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  const navLinks = [
    { 
      name: "Hackathon", 
      href: "#home", 
      hasDropdown: true,
      dropdownItems: [
        { name: "Prizes", href: "#prizes" },
        { name: "Schedule", href: "#schedule" },
        { name: "Problem Statements", href: "#problem-statements" },
        { name: "Judges", href: "#judges" },
        { name: "Sponsors", href: "#sponsors" },
      ]
    },
    { 
      name: "Guidelines", 
      href: "#why-participate", 
      hasDropdown: true,
      dropdownItems: [
        { name: "FAQs", href: "#faq" },
        { name: "Why Participate", href: "#why-participate" },
      ]
    },
    { 
      name: "Get Involved", 
      href: "#schedule", 
      hasDropdown: true,
      dropdownItems: [
        { name: "Registration", href: "#registration" },
        { name: "Sponsors", href: "#sponsors" },
      ]
    },
    { 
      name: "Contact", 
      href: "#contact", 
      hasDropdown: false 
    },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-2 shadow-lg' : 'bg-black py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-bold">
            AgentX
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-10">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                <button 
                  onClick={() => link.hasDropdown && toggleDropdown(link.name)}
                  className="text-white flex items-center group-hover:text-hackathon-purple transition-colors duration-200"
                >
                  {link.name}
                  {link.hasDropdown && (
                    activeDropdown === link.name ? 
                    <ChevronUp className="ml-1" size={16} /> : 
                    <ChevronDown className="ml-1" size={16} />
                  )}
                </button>
                
                {link.hasDropdown && (
                  <div 
                    ref={el => dropdownRefs.current[link.name] = el}
                    className={`absolute left-0 mt-2 w-64 rounded-xl overflow-hidden transition-all duration-300 ease-in-out origin-top-left ${
                      activeDropdown === link.name ? 'transform scale-100 opacity-100' : 'transform scale-95 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="glass bg-[#1A1F2C]/95 backdrop-blur-lg border border-purple-500/20 shadow-[0_5px_30px_rgba(108,67,255,0.25)] overflow-hidden p-1 rounded-xl">
                      <div className="py-1">
                        {link.dropdownItems?.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            className="block px-4 py-3 text-hackathon-purple hover:bg-purple-900/20 rounded-lg transition-colors duration-200 mx-1 text-sm font-medium"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8 lg:px-10 font-normal">
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
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
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link, index) => (
                <div key={index}>
                  <button 
                    className="text-xl text-white flex items-center justify-between w-full py-3 border-b border-white/10"
                    onClick={() => link.hasDropdown ? toggleDropdown(link.name) : (closeMenu())}
                  >
                    <span className={activeDropdown === link.name ? "text-hackathon-purple" : ""}>{link.name}</span>
                    {link.hasDropdown && (
                      activeDropdown === link.name ? 
                      <ChevronUp size={20} className="text-hackathon-purple" /> : 
                      <ChevronDown size={20} />
                    )}
                  </button>
                  
                  {link.hasDropdown && (
                    <div 
                      className={`overflow-hidden transition-all duration-200 bg-[#121212] rounded-lg my-1 ${
                        activeDropdown === link.name ? 'max-h-[500px] opacity-100 border border-purple-900/30' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-2 py-1">
                        {link.dropdownItems?.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            className="block px-4 py-3 text-hackathon-purple hover:bg-purple-900/20 rounded-lg text-sm my-1"
                            onClick={closeMenu}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <Button className="bg-white text-black hover:bg-white/90 rounded-full w-full mt-4 py-6">
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
