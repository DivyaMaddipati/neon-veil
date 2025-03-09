
import { useEffect } from 'react';
import { Brain, Cloud, ShieldCheck, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChallengesSection = () => {
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

    const elements = document.querySelectorAll('.challenge-animate');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const challenges = [
    {
      icon: <Brain size={32} />,
      title: "AI & Machine Learning",
      description: "Develop innovative solutions using AI and ML to solve complex problems in healthcare, finance, or education.",
      color: "cyan"
    },
    {
      icon: <Cloud size={32} />,
      title: "Cloud Computing",
      description: "Create scalable and efficient cloud-based applications that address modern infrastructure challenges.",
      color: "orange"
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Cybersecurity",
      description: "Build tools and systems to enhance digital security and protect user privacy in an interconnected world.",
      color: "cyan"
    },
    {
      icon: <Globe size={32} />,
      title: "Sustainability",
      description: "Develop tech solutions that address environmental challenges and promote sustainable practices.",
      color: "orange"
    }
  ];

  return (
    <section id="challenges" className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/3 right-[10%] w-64 h-64 rounded-full bg-hackathon-cyan/10 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title challenge-animate opacity-0">
          <span className="gradient-text-orange">Challenge</span> Tracks
        </h2>
        
        <div className="max-w-3xl mx-auto text-center mb-16 challenge-animate opacity-0">
          <p className="text-xl text-gray-300">
            Choose from our curated challenge tracks or propose your own innovative solution. Each track offers unique problems to solve with technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {challenges.map((challenge, index) => (
            <div 
              key={index} 
              className={`challenge-animate opacity-0 glass p-8 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] ${
                challenge.color === 'cyan' ? 'hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]' : 'hover:shadow-[0_0_15px_rgba(255,107,0,0.3)]'
              }`}
            >
              <div className={`mb-6 inline-flex p-3 rounded-lg ${
                challenge.color === 'cyan' ? 'bg-hackathon-cyan/20 text-hackathon-cyan' : 'bg-hackathon-orange/20 text-hackathon-orange'
              }`}>
                {challenge.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{challenge.title}</h3>
              <p className="text-gray-300 mb-6">{challenge.description}</p>
              <Button variant="outline" className="border-white/10 hover:bg-white/5 transition-colors">
                Learn More
              </Button>
            </div>
          ))}
        </div>
        
        <div className="text-center challenge-animate opacity-0">
          <p className="text-lg text-gray-300 mb-6">
            Don't see a track that matches your idea? No problem!
          </p>
          <Button className="btn-primary">Submit Your Own Challenge</Button>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;
