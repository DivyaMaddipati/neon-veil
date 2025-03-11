
import React from 'react';

const EventScheduleSection = () => {
  const timelineEvents = [
    {
      title: "Registration Opens",
      date: "Now",
      color: "text-[#6c43ff]"
    },
    {
      title: "Registration Closes",
      date: "April 20",
      color: "text-[#6c43ff]"
    },
    {
      title: "Hackathon Day",
      date: "April 26",
      color: "text-[#6c43ff]"
    },
    {
      title: "Judging & Results",
      date: "Time",
      color: "text-[#6c43ff]"
    }
  ];

  return (
    <section id="schedule" className="py-20 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Event Schedule</h2>
          <p className="text-gray-400">Step-by-Step Milestones</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 transform -translate-y-1/2"></div>
          
          {/* Timeline events */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex flex-col items-center relative">
                <div className="w-6 h-6 rounded-full bg-[#6c43ff] z-10 mb-6 glow-purple relative">
                  <div className="absolute inset-0 w-full h-full rounded-full bg-[#6c43ff] animate-ping opacity-50"></div>
                </div>
                <div className={`${event.color} mb-2`}>{event.title}</div>
                <div className="text-2xl font-bold">{event.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventScheduleSection;
