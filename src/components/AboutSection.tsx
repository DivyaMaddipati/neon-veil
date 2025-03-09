
import { useEffect } from 'react';
import { Code, Users, Trophy, Zap } from 'lucide-react';

const AboutSection = () => {
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

    const elements = document.querySelectorAll('.about-animate');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="section-title about-animate opacity-0">
          About <span className="gradient-text-cyan">HackNova</span>
        </h2>
        
        <div className="max-w-3xl mx-auto text-center mb-16 about-animate opacity-0">
          <p className="text-xl text-gray-300">
            HackNova is a 48-hour hackathon that brings together the brightest minds to solve real-world challenges through technology and innovation. Whether you're a coding expert or just starting out, HackNova is the perfect platform to showcase your skills, learn from peers, and win exciting prizes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Code className="text-hackathon-cyan" size={36} />,
              title: "Code",
              description: "Build innovative solutions using the latest technologies across web, mobile, AI, and more.",
              delay: 0
            },
            {
              icon: <Users className="text-hackathon-cyan" size={36} />,
              title: "Collaborate",
              description: "Connect with fellow passionate developers, designers, and innovators from around the world.",
              delay: 100
            },
            {
              icon: <Zap className="text-hackathon-orange" size={36} />,
              title: "Create",
              description: "Turn your ideas into reality with mentorship from industry experts and tech enthusiasts.",
              delay: 200
            },
            {
              icon: <Trophy className="text-hackathon-orange" size={36} />,
              title: "Compete",
              description: "Showcase your project and compete for prizes worth $50,000+ across various categories.",
              delay: 300
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="glass p-6 rounded-xl transition-all hover:translate-y-[-5px] about-animate opacity-0"
              style={{ animationDelay: `${item.delay}ms` }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 glass p-8 rounded-xl about-animate opacity-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold gradient-text-cyan mb-2">500+</h3>
              <p className="text-lg text-gray-300">Participants</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold gradient-text-cyan mb-2">50+</h3>
              <p className="text-lg text-gray-300">Universities</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold gradient-text-orange mb-2">$50K+</h3>
              <p className="text-lg text-gray-300">In Prizes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
