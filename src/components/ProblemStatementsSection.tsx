import React, { useState } from 'react';
import { 
  Lightbulb, 
  Brain, 
  AlertTriangle, 
  Bot, 
  TrafficCone, 
  Newspaper, 
  Server,
  ArrowRight 
} from 'lucide-react';

type ProblemCardProps = { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  index: number;
};

const ProblemCard = ({ title, description, icon, index }: ProblemCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="h-[280px] perspective-1000 group animate-fade-in font-roboto"
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden neo-glass border border-[#6c43ff]/30 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-[0_0_15px_rgba(108,67,255,0.2)] hover:shadow-[0_0_25px_rgba(108,67,255,0.4)] transition-all duration-300">
          <div className="flex justify-center mb-5 transform transition-transform duration-500 group-hover:scale-110">
            <div className="p-3 rounded-full bg-[#1A1F2C] border border-[#6c43ff]/40 shadow-[0_0_10px_rgba(108,67,255,0.3)]">
              {icon}
            </div>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-[#9b87f5] mb-2">
            {title}
          </h3>
          <p className="text-gray-400 text-sm">Click to view details</p>
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#6c43ff] to-[#ff6b00] w-0 group-hover:w-full transition-all duration-500 rounded-b-xl"></div>
        </div>
        
        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 neo-glass-dark border border-[#6c43ff]/30 rounded-xl p-6 flex flex-col items-start justify-between shadow-[0_0_15px_rgba(108,67,255,0.2)]">
          <div>
            <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#6c43ff] to-[#ff6b00] bg-clip-text text-transparent mb-4">
              {title}
            </h3>
            <p className="text-gray-300 text-sm">
              {description}
            </p>
          </div>
          <button className="mt-4 text-sm text-[#6c43ff] hover:text-white flex items-center self-end transition-colors">
            Learn more <ArrowRight className="ml-1 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProblemStatementsSection = () => {
  const problemStatements = [
    {
      title: "Smart Waste Management System",
      description: "Develop an AI-based solution to detect and categorize waste, optimize garbage collection, and promote recycling.",
      icon: <Lightbulb className="h-8 w-8 text-hackathon-purple" />
    },
    {
      title: "AI-Powered Career Guidance",
      description: "Build a platform that suggests career paths based on skills, interests, and job trends.",
      icon: <Brain className="h-8 w-8 text-hackathon-purple" />
    },
    {
      title: "Real-Time Disaster Alert System",
      description: "Build an AI and IoT-powered system to detect disasters and send real-time alerts to affected areas.",
      icon: <AlertTriangle className="h-8 w-8 text-hackathon-purple" />
    },
    {
      title: "Automated Mental Health Support",
      description: "Design a chatbot or app that provides mental health support, relaxation techniques, and expert guidance.",
      icon: <Bot className="h-8 w-8 text-hackathon-purple" />
    },
    {
      title: "AI-Based Resume Screener for Recruiters",
      description: "Develop an AI tool that scans resumes, matches candidates with job roles, and ranks applicants efficiently.",
      icon: <Brain className="h-8 w-8 text-hackathon-purple" />
    },
    {
      title: "Decentralized Data Storage System",
      description: "Develop a blockchain-based secure storage solution for privacy-focused, decentralized data management.",
      icon: <Server className="h-8 w-8 text-hackathon-purple" />
    },
    {
      title: "Voice Assistant for the Visually Impaired",
      description: "Build an AI-powered assistant to help visually impaired users with navigation, reading, and daily tasks.",
      icon: <Bot className="h-8 w-8 text-hackathon-purple" />
    },
    {
      title: "Smart Traffic Management System",
      description: "Use AI and IoT to optimize traffic signals, reduce congestion, and provide real-time traffic updates.",
      icon: <TrafficCone className="h-8 w-8 text-hackathon-purple" />
    },
    {
      title: "AI-Powered Fake News Detector",
      description: "Create an AI tool that verifies news, detects misinformation, and provides credibility scores.",
      icon: <Newspaper className="h-8 w-8 text-hackathon-purple" />
    }
  ];

  return (
    <section id="problem-statements" className="relative bg-black py-16 md:py-20 overflow-hidden font-roboto">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-50">
        <div className="absolute top-[10%] right-[10%] w-64 h-64 rounded-full bg-[#6c43ff]/10 blur-[80px]"></div>
        <div className="absolute bottom-[20%] left-[5%] w-64 h-64 rounded-full bg-[#ff6b00]/10 blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block">
            Problem <span className="text-[#6c43ff]">Statements</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#6c43ff] to-[#ff6b00]"></div>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-sm md:text-base">
            The hackathon presents diverse challenges across multiple domains, allowing participants 
            to apply their skills to real-world problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemStatements.map((problem, index) => (
            <ProblemCard 
              key={index}
              index={index}
              title={problem.title}
              description={problem.description}
              icon={problem.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemStatementsSection;
