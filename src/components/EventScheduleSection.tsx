
import React from 'react';
import { Calendar, Clock, Flag, Trophy } from 'lucide-react';

const EventScheduleSection = () => {
  const timelineEvents = [
    {
      title: "Registration Opens",
      date: "March 14, 2025",
      color: "bg-gradient-to-r from-[#6c43ff] to-[#8d6aff]",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      title: "Registration Closes",
      date: "March 26, 2025",
      color: "bg-gradient-to-r from-[#6c43ff] to-[#8d6aff]",
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: "Hackathon Day",
      date: "April 26, 2025",
      color: "bg-gradient-to-r from-[#6c43ff] to-[#8d6aff]",
      icon: <Flag className="w-5 h-5" />
    },
    {
      title: "Judging & Results",
      date: "April 26, 2025",
      color: "bg-gradient-to-r from-[#6c43ff] to-[#8d6aff]",
      icon: <Trophy className="w-5 h-5" />
    }
  ];

  return (
    <section id="schedule" className="py-16 md:py-24 bg-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#6c43ff]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-[#6c43ff]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block mb-3">
            <span className="text-xs font-semibold tracking-wider text-[#a090e9] uppercase bg-[#2a1a4a] px-3 py-1 rounded-full">Important Dates</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text-purple">Event Timeline</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">Mark your calendars with these important dates and join us on this exciting journey from registration to the grand finale.</p>
        </div>

        {/* Mobile view (stacked vertical timeline) */}
        <div className="md:hidden max-w-xs mx-auto space-y-8 relative">
          <div className="absolute left-4 top-8 bottom-8 w-1 bg-gradient-to-b from-[#6c43ff]/20 via-[#6c43ff] to-[#6c43ff]/20 rounded-full"></div>
          
          {timelineEvents.map((event, index) => (
            <div key={index} className="flex items-start space-x-6">
              <div className="relative mt-2">
                <div className={`${event.color} w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(108,67,255,0.6)] relative`}>
                  <div className="text-white">{event.icon}</div>
                  <div className="absolute inset-0 w-full h-full rounded-full bg-[#6c43ff] animate-pulse-glow opacity-60"></div>
                </div>
              </div>
              
              <div className="glass p-4 rounded-lg flex-1 transform hover:translate-x-1 transition-transform duration-300 border-l-2 border-[#6c43ff]">
                <h3 className="font-bold text-lg text-white">{event.title}</h3>
                <p className="text-[#a090e9] text-sm">{event.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop view (horizontal timeline) */}
        <div className="hidden md:block max-w-5xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute top-[42px] left-0 w-full h-1 bg-gradient-to-r from-[#6c43ff]/20 via-[#6c43ff] to-[#6c43ff]/20 rounded-full"></div>
          
          {/* Timeline events */}
          <div className="grid grid-cols-4 gap-6 lg:gap-8">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative mb-8">
                  {/* Glowing dot */}
                  <div className={`${event.color} w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(108,67,255,0.6)] relative`}>
                    <div className="text-white">{event.icon}</div>
                    <div className="absolute inset-0 w-full h-full rounded-full bg-[#6c43ff] animate-pulse-glow opacity-60"></div>
                  </div>
                </div>
                
                {/* Card content */}
                <div className="glass p-4 rounded-lg w-full h-full text-center transform hover:scale-105 transition-all duration-300 border-t-2 border-[#6c43ff] hover:shadow-[0_8px_20px_rgba(108,67,255,0.2)]">
                  <h3 className="font-bold text-xl mb-2 text-white">{event.title}</h3>
                  <p className="text-[#a090e9]">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to action */}
        <div className="mt-12 md:mt-16 text-center">
          <button className="btn-primary group relative overflow-hidden px-8 py-3">
            <span className="relative z-10 flex items-center">
              Save These Dates
              <Calendar className="ml-2 w-4 h-4 group-hover:ml-3 transition-all duration-300" />
            </span>
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#8d6aff] to-[#6c43ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventScheduleSection;
