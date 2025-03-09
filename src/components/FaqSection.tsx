
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  
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
      question: "Who can participate in HackNova?",
      answer: "HackNova is open to students, professionals, and anyone passionate about technology and innovation. Whether you're a coding expert or a beginner, you're welcome to join. Participants under 18 will need parental consent."
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
    <section id="faq" className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute bottom-[20%] right-[20%] w-64 h-64 rounded-full bg-hackathon-cyan/10 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title faq-animate opacity-0">
          Frequently Asked <span className="gradient-text-cyan">Questions</span>
        </h2>
        
        <div className="max-w-3xl mx-auto text-center mb-16 faq-animate opacity-0">
          <p className="text-xl text-gray-300">
            Got questions about HackNova? Find your answers here.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-animate opacity-0">
              <button
                onClick={() => toggleFaq(index)}
                className={`glass w-full text-left p-6 rounded-xl transition-all duration-300 ${
                  openIndex === index ? 'shadow-[0_0_15px_rgba(0,212,255,0.3)]' : ''
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="text-hackathon-cyan flex-shrink-0" size={24} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                  )}
                </div>
                
                <div className={`mt-4 text-gray-300 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p>{faq.answer}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center faq-animate opacity-0">
          <p className="text-lg mb-4">
            Still have questions? Contact our support team.
          </p>
          <a href="mailto:support@hacknova.tech" className="text-hackathon-cyan hover:underline">
            support@hacknova.tech
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
