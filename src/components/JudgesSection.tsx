
import React from 'react';
import { Twitter, Facebook, Instagram } from 'lucide-react';

type JudgeProps = {
  name: string;
  description: string;
  image: string;
  index: number;
  socials: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
};

const JudgeCard = ({ name, description, image, index, socials }: JudgeProps) => {
  return (
    <div
      className="bg-[#1A1F2C] rounded-lg overflow-hidden animate-fade-in"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="h-[200px] flex items-center justify-center overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-xl font-bold text-white mb-3">{name}</h3>
        <p className="text-gray-400 text-sm mb-5">{description}</p>
        
        <div className="flex justify-center space-x-4">
          {socials.twitter && (
            <a 
              href={socials.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-hackathon-purple hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
          )}
          {socials.facebook && (
            <a 
              href={socials.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-hackathon-purple hover:text-white transition-colors"
            >
              <Facebook size={20} />
            </a>
          )}
          {socials.instagram && (
            <a 
              href={socials.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-hackathon-purple hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const JudgesSection = () => {
  const judges = [
    {
      name: "Judge 1",
      description: "Lorem ipsum dolor sit amet, dictus eruditi probatus no mei, no laoreet apeirian suscipiatur eos. Fugit intellegat at usu, at est deleint interesset.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop",
      socials: {
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com"
      }
    },
    {
      name: "Judge 2",
      description: "Lorem ipsum dolor sit amet, dictus eruditi probatus no mei, no laoreet apeirian suscipiatur eos. Fugit intellegat at usu, at est deleint interesset.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
      socials: {
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com"
      }
    },
    {
      name: "Judge 3",
      description: "Lorem ipsum dolor sit amet, dictus eruditi probatus no mei, no laoreet apeirian suscipiatur eos. Fugit intellegat at usu, at est deleint interesset.",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=2787&auto=format&fit=crop",
      socials: {
        twitter: "https://twitter.com",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com"
      }
    },
  ];

  return (
    <section id="judges" className="bg-black py-16 md:py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">Judges</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {judges.map((judge, index) => (
            <JudgeCard 
              key={index}
              index={index}
              name={judge.name}
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
