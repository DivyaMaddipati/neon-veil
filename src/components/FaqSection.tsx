import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, MessageSquareMore } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useNavigate } from 'react-router-dom';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();
  
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

    const elements = document.querySelectorAll('.faq-animate');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  const faqs = [
    {
      question: "Who can participate in AgentX?",
      answer: "AgentX is open to students, professionals, and anyone passionate about technology and innovation. Whether you're a coding expert or a beginner, you're welcome to join. Participants under 18 will need parental consent."
    },
    {
      question: "Do I need to have a team to register?",
      answer: "No, you can register individually and find teammates during our team formation event before the hackathon begins. Teams can have up to 4 members. We also have a dedicated Discord channel to help you find teammates with complementary skills."
    },
    {
      question: "What should I bring to the hackathon?",
      answer: "For in-person participants: laptop, chargers, any hardware you plan to use, and personal items for the 48-hour event. For virtual participants: ensure you have a stable internet connection and the necessary development environment set up on your computer."
    },
    {
      question: "Is there a registration fee?",
      answer: "No, participation in HackNova is completely free, thanks to our sponsors and partners who make this event possible."
    },
    {
      question: "Can I work on a pre-existing project?",
      answer: "No, all projects must be built from scratch during the hackathon. However, you can come prepared with ideas and plan your approach beforehand. Using open-source libraries and frameworks is allowed and encouraged."
    },
    {
      question: "Will there be mentors available during the event?",
      answer: "Yes, we'll have industry experts and experienced developers as mentors throughout the event. They'll be available to provide guidance, technical support, and feedback on your projects."
    },
    {
      question: "How will the projects be judged?",
      answer: "Projects will be evaluated based on innovation, technical complexity, practicality, presentation quality, and alignment with the chosen challenge track. Our panel of judges includes industry professionals, academia representatives, and sponsors."
    },
    {
      question: "What happens if I need technical support during the hackathon?",
      answer: "We have a dedicated technical support team available 24/7 during the event. You can reach them through our Discord channel or help desk for immediate assistance with any technical issues."
    }
  ];

  return (
    <section id="faq" className="py-20 md:py-24 relative overflow-hidden font-roboto">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-[#6c43ff]/10 blur-[80px]"></div>
        <div className="absolute bottom-1/4 right-[10%] w-64 h-64 rounded-full bg-[#ff6b00]/10 blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16 faq-animate opacity-0">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block">
            <span className="text-[#6c43ff]">FAQ</span>s
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#6c43ff] to-[#ff6b00]"></div>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Got questions about AgentX? Find your answers here.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openIndex === index}
              onOpenChange={() => toggleFaq(index)}
              className="faq-animate opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div 
                ref={el => faqRefs.current[index] = el}
                className={`neo-glass border border-[#6c43ff]/30 rounded-xl transition-all duration-300 ${
                  openIndex === index 
                    ? 'shadow-[0_0_20px_rgba(108,67,255,0.3)] border-[#6c43ff]/60' 
                    : 'hover:border-[#6c43ff]/40 hover:shadow-[0_0_15px_rgba(108,67,255,0.15)]'
                }`}
              >
                <CollapsibleTrigger className="w-full text-left p-6 focus:outline-none">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{faq.question}</h3>
                    {openIndex === index ? (
                      <ChevronUp className="text-[#6c43ff] flex-shrink-0" size={24} />
                    ) : (
                      <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-6 pt-2 text-gray-300">
                  <div className="animate-slideDown">
                    <p>{faq.answer}</p>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
