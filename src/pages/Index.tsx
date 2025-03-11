
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WhyParticipateSection from '@/components/WhyParticipateSection';
import PrizesSection from '@/components/PrizesSection';
import EventScheduleSection from '@/components/EventScheduleSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ProblemStatementsSection from '@/components/ProblemStatementsSection';

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      <Navbar />
      <main>
        <HeroSection />
        <WhyParticipateSection />
        <PrizesSection />
        <EventScheduleSection />
        <ProblemStatementsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
