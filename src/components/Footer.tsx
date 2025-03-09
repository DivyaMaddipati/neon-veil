
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-16 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-hackathon-cyan/50 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 text-2xl font-bold mb-4">
              <span className="gradient-text-cyan">Hack</span>
              <span className="gradient-text-orange">Nova</span>
            </a>
            <p className="text-gray-300 mb-6">
              A 48-hour journey of innovation, creativity, and technological breakthroughs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-hackathon-cyan transition-colors">About</a></li>
              <li><a href="#challenges" className="text-gray-300 hover:text-hackathon-cyan transition-colors">Challenges</a></li>
              <li><a href="#prizes" className="text-gray-300 hover:text-hackathon-cyan transition-colors">Prizes</a></li>
              <li><a href="#timeline" className="text-gray-300 hover:text-hackathon-cyan transition-colors">Timeline</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-hackathon-cyan transition-colors">FAQ</a></li>
              <li><a href="#register" className="text-gray-300 hover:text-hackathon-cyan transition-colors">Register</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-hackathon-cyan transition-colors">Starter Kits</a></li>
              <li><a href="#" className="text-gray-300 hover:text-hackathon-cyan transition-colors">Workshops</a></li>
              <li><a href="#" className="text-gray-300 hover:text-hackathon-cyan transition-colors">Sponsors</a></li>
              <li><a href="#" className="text-gray-300 hover:text-hackathon-cyan transition-colors">Partners</a></li>
              <li><a href="#" className="text-gray-300 hover:text-hackathon-cyan transition-colors">Code of Conduct</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Email: <a href="mailto:info@hacknova.tech" className="hover:text-hackathon-cyan transition-colors">info@hacknova.tech</a></li>
              <li className="text-gray-300">Support: <a href="mailto:support@hacknova.tech" className="hover:text-hackathon-cyan transition-colors">support@hacknova.tech</a></li>
              <li className="text-gray-300">Sponsorship: <a href="mailto:sponsors@hacknova.tech" className="hover:text-hackathon-cyan transition-colors">sponsors@hacknova.tech</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; 2024 HackNova. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-hackathon-cyan transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-hackathon-cyan transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-hackathon-cyan transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
