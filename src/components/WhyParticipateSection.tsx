
import { TrendingUp, Wifi, Trophy, Key } from 'lucide-react';

const WhyParticipateSection = () => {
  const reasons = [
    {
      icon: <TrendingUp className="w-12 h-12 text-[#6c43ff]" />,
      title: "Skill Growth",
      description: "Learn, solve real-world problems, and gain expert guidance—boost your resume!"
    },
    {
      icon: <Wifi className="w-12 h-12 text-[#6c43ff]" />,
      title: "Networking",
      description: "Connect, collaborate, and expand your network—unlock future opportunities!"
    },
    {
      icon: <Trophy className="w-12 h-12 text-[#6c43ff]" />,
      title: "Exciting Prizes",
      description: "Showcase your talent, compete with the best, and earn the recognition you deserve!"
    },
    {
      icon: <Key className="w-12 h-12 text-[#6c43ff]" />,
      title: "Opportunities",
      description: "Showcase your skills, solve challenges, and attract recruiters—unlock career opportunities!"
    }
  ];

  return (
    <section id="why-participate" className="py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why participate</h2>
          <p className="text-gray-400">A Hackathon That Takes You to the Next Level!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="bg-[#1a1a1a] rounded-lg p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-2"
            >
              <div className="mb-6 p-4 rounded-full bg-[#1a1a1a] border border-[#6c43ff]/30 shadow-[0_0_15px_rgba(108,67,255,0.3)]">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
              <p className="text-gray-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyParticipateSection;
