
import React from 'react';
import { Calendar, Clock, Flag, Trophy } from 'lucide-react';

const EventScheduleSection = () => {
  const timelineEvents = [
    {
      title: "Registration Opens",
      date: "March 14, 2025",
      color: "bg-[#6c43ff]",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      title: "Registration Closes",
      date: "March 26, 2025",
      color: "bg-[#6c43ff]",
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: "Hackathon Day",
      date: "April 26, 2025",
      color: "bg-[#6c43ff]",
      icon: <Flag className="w-5 h-5" />
    },
    {
      title: "Judging & Results",
      date: "April 26, 2025",
      color: "bg-[#6c43ff]",
      icon: <Trophy className="w-5 h-5" />
    }
  ];

  return (
    <section id="schedule" className="py-20 bg-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6c43ff]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6c43ff]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-purple">Event Timeline</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Mark your calendars with these important dates and join us on this exciting journey from registration to the grand finale.</p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute top-[42px] left-0 w-full h-1 bg-gradient-to-r from-[#6c43ff]/20 via-[#6c43ff] to-[#6c43ff]/20 rounded-full"></div>
          
          {/* Timeline events */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative mb-10">
                  {/* Glowing dot */}
                  <div className={`${event.color} w-8 h-8 rounded-full flex items-center justify-center z-10 mb-6 shadow-[0_0_15px_rgba(108,67,255,0.6)] relative`}>
                    <div className="text-white">{event.icon}</div>
                    <div className="absolute inset-0 w-full h-full rounded-full bg-[#6c43ff] animate-pulse-glow opacity-60"></div>
                  </div>
                  
                  {/* Line connector for mobile (visible on smaller screens) */}
                  {index < timelineEvents.length - 1 && (
                    <div className="absolute top-4 left-[calc(100%+10px)] w-[calc(100%-20px)] h-px bg-gradient-to-r from-[#6c43ff] to-[#6c43ff]/20 md:hidden"></div>
                  )}
                </div>
                
                {/* Card content */}
                <div className="glass p-4 rounded-lg w-full h-full text-center transform hover:scale-105 transition-transform duration-300 border-t-2 border-[#6c43ff]">
                  <h3 className="font-bold text-xl mb-2 text-white">{event.title}</h3>
                  <p className="text-[#a090e9]">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <button className="btn-primary">
            Save These Dates
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventScheduleSection;
