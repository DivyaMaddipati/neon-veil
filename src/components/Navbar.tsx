
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, ChevronUp, LogOut, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Define proper TypeScript interfaces for our navigation items
interface DropdownItem {
  name: string;
  href: string;
  isFullPath?: boolean;
}

interface NavLink {
  name: string;
  href: string;
  hasDropdown: boolean;
  isFullPath?: boolean;
  dropdownItems?: DropdownItem[];
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

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

  const navLinks: NavLink[] = [
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
        { name: "Register", href: "/registration", isFullPath: true },
        { name: "Sponsors", href: "#sponsors" },
      ]
    },
    { 
      name: "Contact", 
      href: "#contact", 
      hasDropdown: false 
    },
  ];

  // Add admin dashboard link for admin users
  if (isAuthenticated && isAdmin) {
    navLinks.push({
      name: "Admin",
      href: "/admin-dashboard",
      hasDropdown: false,
      isFullPath: true
    });
  }

  // Add team profile link for authenticated users
  if (isAuthenticated && !isAdmin) {
    navLinks.push({
      name: "My Team",
      href: "/team-profile",
      hasDropdown: false,
      isFullPath: true
    });
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const scrollToSection = (sectionId: string) => {
    closeMenu();
    setActiveDropdown(null);
    
    if (location.pathname !== '/') {
      window.location.href = `/${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const isHomePage = location.pathname === '/';

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-2 shadow-lg' : 'bg-black py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            AgentX
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-10">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.hasDropdown ? (
                  <button 
                    onClick={() => toggleDropdown(link.name)}
                    className="text-white flex items-center group-hover:text-hackathon-purple transition-colors duration-200"
                  >
                    {link.name}
                    {activeDropdown === link.name ? 
                      <ChevronUp className="ml-1" size={16} /> : 
                      <ChevronDown className="ml-1" size={16} />
                    }
                  </button>
                ) : (
                  <Link
                    to={link.isFullPath ? link.href : isHomePage ? link.href : `/${link.href}`}
                    onClick={(e) => {
                      if (!link.isFullPath) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    className="text-white group-hover:text-hackathon-purple transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                )}
                
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
                          item.isFullPath ? (
                            <Link
                              key={idx}
                              to={item.href}
                              className="block px-4 py-3 text-hackathon-purple hover:bg-purple-900/20 rounded-lg transition-colors duration-200 mx-1 text-sm font-medium"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {item.name}
                            </Link>
                          ) : (
                            <a
                              key={idx}
                              href={isHomePage ? item.href : `/${item.href}`}
                              onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(item.href);
                              }}
                              className="block px-4 py-3 text-hackathon-purple hover:bg-purple-900/20 rounded-lg transition-colors duration-200 mx-1 text-sm font-medium"
                            >
                              {item.name}
                            </a>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-white">
                  {user?.firstName ? `${user.firstName} ${user.lastName}` : user?.email}
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-hackathon-purple text-hackathon-purple hover:bg-hackathon-purple/10"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white border-2 border-[#9F7AEA] rounded-md px-6 py-2 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_20px_rgba(139,92,246,0.8)] font-medium">
                    <User size={16} className="mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/registration">
                  <Button className="bg-white text-black hover:bg-white/90 rounded-md px-8 lg:px-10 font-normal">
                    Register
                  </Button>
                </Link>
              </>
            )}
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
                  {link.hasDropdown ? (
                    <button 
                      className="text-xl text-white flex items-center justify-between w-full py-3 border-b border-white/10"
                      onClick={() => toggleDropdown(link.name)}
                    >
                      <span className={activeDropdown === link.name ? "text-hackathon-purple" : ""}>{link.name}</span>
                      {activeDropdown === link.name ? 
                        <ChevronUp size={20} className="text-hackathon-purple" /> : 
                        <ChevronDown size={20} />
                      }
                    </button>
                  ) : (
                    <Link
                      to={link.isFullPath ? link.href : isHomePage ? link.href : `/${link.href}`}
                      onClick={(e) => {
                        if (!link.isFullPath) {
                          e.preventDefault();
                          scrollToSection(link.href);
                        } else {
                          closeMenu();
                        }
                      }}
                      className="text-xl text-white flex items-center justify-between w-full py-3 border-b border-white/10"
                    >
                      {link.name}
                    </Link>
                  )}
                  
                  {link.hasDropdown && (
                    <div 
                      className={`overflow-hidden transition-all duration-200 bg-[#121212] rounded-lg my-1 ${
                        activeDropdown === link.name ? 'max-h-[500px] opacity-100 border border-purple-900/30' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-2 py-1">
                        {link.dropdownItems?.map((item, idx) => (
                          item.isFullPath ? (
                            <Link
                              key={idx}
                              to={item.href}
                              className="block px-4 py-3 text-hackathon-purple hover:bg-purple-900/20 rounded-lg text-sm my-1"
                              onClick={closeMenu}
                            >
                              {item.name}
                            </Link>
                          ) : (
                            <a
                              key={idx}
                              href={isHomePage ? item.href : `/${item.href}`}
                              onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(item.href);
                              }}
                              className="block px-4 py-3 text-hackathon-purple hover:bg-purple-900/20 rounded-lg text-sm my-1"
                            >
                              {item.name}
                            </a>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {isAuthenticated ? (
                <div className="pt-4 flex flex-col gap-4">
                  <div className="text-white text-center py-2">
                    {user?.firstName ? `Logged in as ${user.firstName} ${user.lastName}` : user?.email}
                  </div>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="mt-6 flex flex-col gap-4">
                  <Link to="/login" onClick={closeMenu}>
                    <Button className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white border-2 border-[#9F7AEA] shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_20px_rgba(139,92,246,0.8)]">
                      <User size={16} className="mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/registration" onClick={closeMenu}>
                    <Button className="w-full bg-white text-black hover:bg-white/90 rounded-md">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
