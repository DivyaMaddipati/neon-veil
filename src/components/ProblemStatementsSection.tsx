
import React from 'react';
import { 
  Lightbulb, 
  Brain, 
  AlertTriangle, 
  Bot, 
  TrafficCone, 
  Newspaper, 
  Server 
} from 'lucide-react';

const ProblemCard = ({ title, description, icon, index }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div 
      className="bg-[#1A1F2C] p-3 rounded-lg border border-gray-700 hover:border-hackathon-purple/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(108,67,255,0.3)] h-full animate-fade-in"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="flex flex-col h-full">
        <div className="mb-2">
          {icon}
        </div>
        <h3 className="text-base md:text-lg font-bold text-[#9b87f5] mb-1.5">
          {title}
        </h3>
        <p className="text-gray-400 text-xs">
          {description}
        </p>
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
    <section id="problem-statements" className="bg-black py-16 md:py-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">Problem Statements</h2>
        <p className="text-gray-400 text-center mb-10 max-w-3xl mx-auto text-sm">
          The hackathon presents diverse challenges across multiple domains, allowing participants 
          to apply their skills to real-world problems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
