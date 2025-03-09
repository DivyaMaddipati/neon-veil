
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ChallengesSection from '@/components/ChallengesSection';
import PrizesSection from '@/components/PrizesSection';
import TimelineSection from '@/components/TimelineSection';
import FaqSection from '@/components/FaqSection';
import RegistrationSection from '@/components/RegistrationSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ChallengesSection />
        <PrizesSection />
        <TimelineSection />
        <FaqSection />
        <RegistrationSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
