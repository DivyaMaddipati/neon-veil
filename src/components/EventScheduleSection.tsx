
import React from 'react';
import { Calendar, Clock, Flag, Trophy, CalendarCheck } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const EventScheduleSection = () => {
  const isMobile = useIsMobile();
  
  const timelineEvents = [
    {
      title: "Registration Opens",
      date: "March 14, 2025",
      color: "bg-gradient-to-br from-[#6c43ff] to-[#8d6aff]",
      icon: <Calendar className="w-5 h-5" />
    },
    {
      title: "Registration Closes",
      date: "March 26, 2025",
      color: "bg-gradient-to-br from-[#6c43ff] to-[#8d6aff]",
      icon: <Clock className="w-5 h-5" />
    },
    {
      title: "Hackathon Day",
      date: "April 26, 2025",
      color: "bg-gradient-to-br from-[#6c43ff] to-[#8d6aff]",
      icon: <Flag className="w-5 h-5" />
    },
    {
      title: "Judging & Results",
      date: "April 26, 2025",
      color: "bg-gradient-to-br from-[#6c43ff] to-[#8d6aff]",
      icon: <Trophy className="w-5 h-5" />
    }
  ];

  return (
    <section id="schedule" className="py-16 md:py-24 bg-black relative overflow-hidden">
      {/* Refined background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6c43ff]/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#6c43ff]/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block">
            <span className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wider text-[#a090e9] bg-[#2a1a4a] uppercase mb-4 inline-block">
              Event Schedule
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text-purple">
            Mark Your Calendar
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Join us on this exciting journey from registration to the grand finale. Save these important dates!
          </p>
        </div>

        {isMobile ? (
          // Mobile Timeline (Vertical)
          <div className="max-w-md mx-auto space-y-6 relative px-4">
            <div className="absolute left-8 top-[52px] bottom-8 w-px bg-gradient-to-b from-[#6c43ff]/10 via-[#6c43ff] to-[#6c43ff]/10"></div>
            
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex gap-6 relative group">
                <div className="relative z-10">
                  <div className={`${event.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-[#6c43ff]/20 group-hover:scale-110 transition-transform duration-300`}>
                    {event.icon}
                  </div>
                </div>
                
                <div className="flex-1 neo-glass rounded-xl p-4 border border-[#6c43ff]/20 group-hover:border-[#6c43ff]/40 transition-all duration-300">
                  <h3 className="font-bold text-lg text-white mb-2">{event.title}</h3>
                  <p className="text-[#a090e9] text-sm">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Desktop Timeline (Horizontal)
          <div className="hidden md:block max-w-5xl mx-auto relative">
            <div className="absolute top-[52px] left-0 w-full h-px bg-gradient-to-r from-[#6c43ff]/10 via-[#6c43ff] to-[#6c43ff]/10"></div>
            
            <div className="grid grid-cols-4 gap-8">
              {timelineEvents.map((event, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div className="relative mb-8">
                    <div className={`${event.color} w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-[#6c43ff]/20 group-hover:scale-110 transition-transform duration-300`}>
                      {event.icon}
                    </div>
                  </div>
                  
                  <div className="neo-glass p-6 rounded-xl w-full text-center border border-[#6c43ff]/20 group-hover:border-[#6c43ff]/40 transition-all duration-300">
                    <h3 className="font-bold text-xl mb-3 text-white">{event.title}</h3>
                    <p className="text-[#a090e9]">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-12 md:mt-16 text-center">
          <Button 
            className="bg-[#6c43ff] hover:bg-[#5c35e8] text-white px-8 py-6 rounded-xl font-medium text-lg group transition-all duration-300 hover:shadow-[0_0_20px_rgba(108,67,255,0.3)]"
          >
            <span className="flex items-center gap-2">
              Add to Calendar
              <CalendarCheck className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventScheduleSection;
