
import React from 'react';
import { Lightbulb, Brain, AlertTriangle } from 'lucide-react';

const ProblemCard = ({ title, description, icon, index }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div 
      className="bg-[#1A1F2C] p-8 rounded-lg border border-gray-700 hover:border-hackathon-purple/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(108,67,255,0.3)] h-full"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="flex flex-col h-full">
        {icon}
        <h3 className="text-2xl md:text-3xl font-bold text-hackathon-purple mb-4">
          {title}
        </h3>
        <p className="text-gray-400 text-lg">
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
      icon: <Lightbulb className="h-12 w-12 text-hackathon-purple mb-4" />
    },
    {
      title: "AI-Powered Career Guidance",
      description: "Build a platform that suggests career paths based on skills, interests, and job trends.",
      icon: <Brain className="h-12 w-12 text-hackathon-purple mb-4" />
    },
    {
      title: "Real-Time Disaster Alert System",
      description: "Build an AI and IoT-powered system to detect disasters and send real-time alerts to affected areas.",
      icon: <AlertTriangle className="h-12 w-12 text-hackathon-purple mb-4" />
    }
  ];

  return (
    <section id="problem-statements" className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-4">Problem Statements</h2>
        <p className="text-gray-400 text-center mb-16 max-w-4xl mx-auto text-lg">
          The hackathon presents diverse challenges across multiple domains, allowing participants 
          to apply their skills to real-world problems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
