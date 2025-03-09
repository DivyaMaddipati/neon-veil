
import { useEffect, useState } from 'react';
import { Award, Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrizesSection = () => {
  const [visibleIndex, setVisibleIndex] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('.prize-animate');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const prizes = [
    {
      icon: <Award size={48} />,
      title: "Grand Prize",
      value: "$20,000",
      benefits: [
        "Cash prize of $10,000",
        "Access to investor network",
        "6-month business incubation program",
        "Tech stack credits worth $10,000",
        "Media coverage package"
      ],
      color: "cyan"
    },
    {
      icon: <Sparkles size={48} />,
      title: "Runner Up",
      value: "$10,000",
      benefits: [
        "Cash prize of $5,000",
        "3-month mentorship program",
        "Tech stack credits worth $5,000",
        "Feature in tech publications"
      ],
      color: "orange"
    },
    {
      icon: <Gift size={48} />,
      title: "Category Winners",
      value: "$5,000 Each",
      benefits: [
        "Cash prize of $2,500",
        "Tech stack credits worth $2,500",
        "Mentorship sessions",
        "Recognition in industry channels"
      ],
      color: "cyan"
    }
  ];

  return (
    <section id="prizes" className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute bottom-1/4 left-[15%] w-64 h-64 rounded-full bg-hackathon-orange/10 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title prize-animate opacity-0">
          <span className="gradient-text-cyan">Prizes</span> & Rewards
        </h2>
        
        <div className="max-w-3xl mx-auto text-center mb-16 prize-animate opacity-0">
          <p className="text-xl text-gray-300">
            Compete for a prize pool worth over $50,000, including cash prizes, mentorship opportunities, and tech resources.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {prizes.map((prize, index) => (
            <div
              key={index}
              className={`prize-animate opacity-0 glass p-8 rounded-xl text-center transition-all duration-300 ${
                visibleIndex === index ? 'transform scale-105' : ''
              } hover:transform hover:scale-[1.05] ${
                prize.color === 'cyan' ? 'hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]' : 'hover:shadow-[0_0_20px_rgba(255,107,0,0.4)]'
              }`}
              onMouseEnter={() => setVisibleIndex(index)}
              onMouseLeave={() => setVisibleIndex(-1)}
            >
              <div className={`mx-auto mb-6 inline-flex p-4 rounded-full ${
                prize.color === 'cyan' ? 'bg-hackathon-cyan/20 text-hackathon-cyan' : 'bg-hackathon-orange/20 text-hackathon-orange'
              }`}>
                {prize.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{prize.title}</h3>
              <div className={`text-3xl font-bold mb-6 ${
                prize.color === 'cyan' ? 'gradient-text-cyan' : 'gradient-text-orange'
              }`}>
                {prize.value}
              </div>
              <ul className="text-left space-y-3 mb-6">
                {prize.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className={`inline-block mr-2 mt-1 h-2 w-2 rounded-full ${
                      prize.color === 'cyan' ? 'bg-hackathon-cyan' : 'bg-hackathon-orange'
                    }`}></span>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center prize-animate opacity-0">
          <p className="text-lg text-gray-300 mb-6">
            Plus, special sponsor prizes and recruitment opportunities!
          </p>
          <Button className={`btn-${Math.random() > 0.5 ? 'primary' : 'secondary'}`}>View All Prizes</Button>
        </div>
      </div>
    </section>
  );
};

export default PrizesSection;
