
import { useEffect } from 'react';

const TimelineSection = () => {
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

    const elements = document.querySelectorAll('.timeline-animate');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const timelineEvents = [
    {
      day: "Before the Hackathon",
      events: [
        {
          time: "Sept 15",
          title: "Registration Opens",
          description: "Sign up early to secure your spot in the hackathon."
        },
        {
          time: "Oct 10",
          title: "Team Formation",
          description: "Connect with other participants and form your dream team."
        },
        {
          time: "Oct 14",
          title: "Pre-Hackathon Workshop",
          description: "Join our workshop to learn about the tools and technologies you'll be using."
        }
      ]
    },
    {
      day: "Day 1: October 15",
      events: [
        {
          time: "9:00 AM",
          title: "Opening Ceremony",
          description: "Welcome address, sponsor introductions, and hackathon guidelines."
        },
        {
          time: "10:30 AM",
          title: "Challenge Announcement",
          description: "Detailed presentation of each challenge track and requirements."
        },
        {
          time: "12:00 PM",
          title: "Hacking Begins",
          description: "Start working on your projects. Mentors available for guidance."
        },
        {
          time: "3:00 PM",
          title: "Tech Talk: AI & ML",
          description: "Industry experts share insights on artificial intelligence."
        },
        {
          time: "8:00 PM",
          title: "Progress Check-in",
          description: "Submit your initial project idea and progress."
        }
      ]
    },
    {
      day: "Day 2: October 16",
      events: [
        {
          time: "10:00 AM",
          title: "Workshop: UI/UX Design",
          description: "Learn how to create engaging user experiences for your project."
        },
        {
          time: "2:00 PM",
          title: "Mentor Sessions",
          description: "Schedule one-on-one sessions with industry mentors."
        },
        {
          time: "6:00 PM",
          title: "Tech Talk: Cybersecurity",
          description: "Discover best practices for securing your applications."
        },
        {
          time: "9:00 PM",
          title: "Game Night",
          description: "Take a break and have fun with fellow participants."
        }
      ]
    },
    {
      day: "Day 3: October 17",
      events: [
        {
          time: "10:00 AM",
          title: "Final Submissions Reminder",
          description: "Last check-ins and preparation for project submission."
        },
        {
          time: "12:00 PM",
          title: "Hacking Ends",
          description: "Submit your final project and prepare for presentations."
        },
        {
          time: "1:00 PM",
          title: "Project Presentations",
          description: "Present your solution to judges and other participants."
        },
        {
          time: "5:00 PM",
          title: "Judging & Deliberation",
          description: "Judges evaluate projects based on innovation, execution, and impact."
        },
        {
          time: "7:00 PM",
          title: "Closing Ceremony",
          description: "Announcement of winners and prize distribution."
        }
      ]
    }
  ];

  return (
    <section id="timeline" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="section-title timeline-animate opacity-0">
          Event <span className="gradient-text-orange">Timeline</span>
        </h2>
        
        <div className="max-w-3xl mx-auto text-center mb-16 timeline-animate opacity-0">
          <p className="text-xl text-gray-300">
            The 48-hour journey from idea to implementation. Here's what to expect during HackNova.
          </p>
        </div>
        
        <div className="space-y-12">
          {timelineEvents.map((day, dayIndex) => (
            <div key={dayIndex} className="timeline-animate opacity-0">
              <h3 className="text-2xl font-bold mb-6 gradient-text-cyan">{day.day}</h3>
              
              <div className="relative border-l-2 border-hackathon-cyan/30 pl-8 ml-4 space-y-10">
                {day.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="relative">
                    <div className="absolute -left-[42px] h-6 w-6 bg-hackathon-cyan/20 border-2 border-hackathon-cyan rounded-full">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-hackathon-cyan rounded-full"></div>
                    </div>
                    
                    <div className="glass p-6 rounded-xl">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                        <h4 className="text-xl font-bold">{event.title}</h4>
                        <span className="text-hackathon-cyan font-medium px-3 py-1 bg-hackathon-cyan/10 rounded-full text-sm">
                          {event.time}
                        </span>
                      </div>
                      <p className="text-gray-300">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
