
import React, { useState, useEffect } from 'react';
import { Twitter, Facebook, Instagram, ExternalLink } from 'lucide-react';

type JudgeProps = {
  name: string;
  description: string;
  shortDescription: string;
  role: string;
  image: string;
  index: number;
  socials: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
};

const JudgeCard = ({ name, description, shortDescription, role, image, index, socials }: JudgeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div
      className="relative group animate-fade-in"
      style={{
        animationDelay: `${index * 0.15}s`,
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="neo-glass border border-[#6c43ff]/30 rounded-xl overflow-hidden h-full">
        <div className="relative h-[220px] overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] to-transparent opacity-80"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-4 text-left">
            <h3 className="text-xl font-bold text-white mb-1 cyber-font">{name}</h3>
            <p className="text-[#6c43ff] text-sm font-medium">{role}</p>
          </div>
        </div>
        
        <div className="p-4 text-left relative">
          <div className="absolute -top-6 right-4 flex space-x-2">
            {socials.twitter && (
              <a 
                href={socials.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-[#6c43ff] hover:text-white hover:bg-[#6c43ff] transition-colors"
              >
                <Twitter size={14} />
              </a>
            )}
            {socials.facebook && (
              <a 
                href={socials.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-[#6c43ff] hover:text-white hover:bg-[#6c43ff] transition-colors"
              >
                <Facebook size={14} />
              </a>
            )}
            {socials.instagram && (
              <a 
                href={socials.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-[#6c43ff] hover:text-white hover:bg-[#6c43ff] transition-colors"
              >
                <Instagram size={14} />
              </a>
            )}
          </div>
          
          <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-40' : 'max-h-16'}`}>
            <p className="text-gray-400 text-sm line-clamp-2 group-hover:line-clamp-none">
              {isExpanded ? description : shortDescription}
            </p>
          </div>
          
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#1A1F2C] to-transparent"></div>
          )}
          
          <button 
            className="mt-3 text-xs text-[#6c43ff] hover:text-white flex items-center group"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? 'Read less' : 'Read more'} 
            <ExternalLink size={12} className="ml-1 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const JudgesSection = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.judges-animate');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
  
  const judges = [
    {
      name: "Dr. Sarah Chen",
      role: "AI Research Scientist",
      shortDescription: "Leading AI researcher specializing in machine learning algorithms...",
      description: "Leading AI researcher specializing in machine learning algorithms with over 15 years of experience at tech giants. Published author with multiple patents in AI technology. Currently leads a research team focused on next-gen AI applications.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
      socials: {
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com"
      }
    },
    {
      name: "James Rodriguez",
      role: "Tech Entrepreneur",
      shortDescription: "Serial entrepreneur who has founded three successful tech startups...",
      description: "Serial entrepreneur who has founded three successful tech startups in the blockchain and AI space. Angel investor supporting promising tech ventures. Known for mentoring young entrepreneurs and promoting innovation in emerging markets.",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=2787&auto=format&fit=crop",
      socials: {
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com"
      }
    },
    {
      name: "Prof. Raj Patel",
      role: "Cybersecurity Expert",
      shortDescription: "Renowned cybersecurity specialist and professor of computer science...",
      description: "Renowned cybersecurity specialist and professor of computer science with expertise in network security, cryptography, and ethical hacking. Regularly consults with government agencies on cybersecurity matters. Author of multiple books on digital security.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop",
      socials: {
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com"
      }
    },
    {
      name: "Aisha Johnson",
      role: "Cloud Computing Pioneer",
      shortDescription: "Industry leader in cloud architecture and infrastructure solutions...",
      description: "Industry leader in cloud architecture and infrastructure solutions with experience at major tech corporations. Specializes in scalable systems and performance optimization. Frequently speaks at tech conferences about the future of cloud computing.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2788&auto=format&fit=crop",
      socials: {
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com"
      }
    },
  ];

  return (
    <section id="judges" className="bg-black py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[30%] right-[15%] w-64 h-64 rounded-full bg-[#6c43ff]/10 blur-[80px]"></div>
        <div className="absolute bottom-[20%] left-[15%] w-64 h-64 rounded-full bg-[#ff6b00]/10 blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16 judges-animate opacity-0">
          <h2 className="cyber-font text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block">
            Expert <span className="text-[#6c43ff]">Judges</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#6c43ff] to-[#ff6b00]"></div>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our distinguished panel of judges brings expertise from diverse technological domains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {judges.map((judge, index) => (
            <JudgeCard 
              key={index}
              index={index}
              name={judge.name}
              role={judge.role}
              shortDescription={judge.shortDescription}
              description={judge.description}
              image={judge.image}
              socials={judge.socials}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JudgesSection;
