
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

type Sponsor = {
  name: string;
  description?: string;
  logo: string;
  url: string;
};

const SponsorsSection = () => {
  const sponsors: Sponsor[] = [
    {
      name: "CognitBotz",
      description: "YOUR AI AUTOMATION PARTNER",
      logo: "/faviconone.ico",
      url: "https://example.com/cognitbotz"
    },
    {
      name: "Naipunya AI Labs",
      description: "",
      logo: "https://placehold.co/300x100/1A1F2C/4CAF50/png?text=Naipunya+AI+Labs",
      url: "https://example.com/naipunya"
    }
  ];

  return (
    <section id="sponsors" className="bg-black py-16 md:py-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Sponsors</h2>
        <p className="text-gray-400 text-center mb-10 max-w-3xl mx-auto text-sm">
          Our event is proudly supported by these innovative companies at the forefront of technology.
        </p>

        <div className="space-y-8">
          {sponsors.map((sponsor, index) => (
            <div 
              key={index}
              className="bg-[#1A1F2C] rounded-lg overflow-hidden shadow-md border border-gray-800 hover:border-hackathon-purple/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(108,67,255,0.3)]"
            >
              <div className="p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1">
                  <img 
                    src={sponsor.logo} 
                    alt={`${sponsor.name} logo`} 
                    className="max-w-full h-auto max-h-16"
                  />
                  {sponsor.description && (
                    <p className="text-gray-400 text-xs mt-2">{sponsor.description}</p>
                  )}
                </div>
                <Button 
                  onClick={() => window.open(sponsor.url, '_blank')}
                  className="bg-transparent border border-white hover:bg-white/10 text-white transition-all flex items-center gap-2 px-8"
                >
                  About <ExternalLink size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
