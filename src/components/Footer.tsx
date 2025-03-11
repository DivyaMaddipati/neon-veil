
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div>
            <Link to="/" className="text-3xl font-bold">
              AgentX
            </Link>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#why-participate" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#schedule" className="text-gray-400 hover:text-white transition-colors">
                  Schedule
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-hackathon-purple shrink-0 mt-1" />
                <span className="text-gray-400">
                  Lumbini Avenue, Gachibowli, Hyderabad, Telangana, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-hackathon-purple shrink-0" />
                <span className="text-gray-400">+91 93465 75094</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-hackathon-purple shrink-0" />
                <span className="text-gray-400">Hello@CognitBotz.com</span>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Social Media</h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-hackathon-purple transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://www.facebook.com/people/Cognitbotz-solutions/100070451876131/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-hackathon-purple transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-hackathon-purple transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
            
            <h3 className="text-lg font-semibold mb-4">Sponsors & Partners:</h3>
            <div className="flex flex-wrap gap-4">
              {/* Placeholder for sponsor logos */}
              <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-xs text-gray-400">S1</span>
              </div>
              <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-xs text-gray-400">S2</span>
              </div>
              <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-xs text-gray-400">S3</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800 text-gray-400 text-sm text-center">
          <p>&copy; 2025 AgentX. All rights Reserved. | Privacy Policy | Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
