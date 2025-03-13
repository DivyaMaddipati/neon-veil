
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RegistrationSteps from '@/components/RegistrationSteps';
import PersonalInfoForm from '@/components/registration/PersonalInfoForm';
import TeamDetailsForm from '@/components/registration/TeamDetailsForm';
import MemberDetailsForm from '@/components/registration/MemberDetailsForm';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export type RegistrationData = {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  
  // Team Details
  teamName: string;
  collegeName: string;
  numberOfMembers: number;
  teamLeaderName: string;
  teamLeaderEmail: string;
  
  // Member Details
  member1Name: string;
  member1Email: string;
  problemStatement: string;
  termsAccepted: boolean;
};

const Registration = () => {
  const navigate = useNavigate();
  const { signupWithRegistration } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RegistrationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    teamName: '',
    collegeName: '',
    numberOfMembers: 1,
    teamLeaderName: '',
    teamLeaderEmail: '',
    member1Name: '',
    member1Email: '',
    problemStatement: '',
    termsAccepted: false
  });

  const updateFormData = (data: Partial<RegistrationData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // First, create a user account
      if (!formData.password) {
        toast.error('Please set a password for your account');
        setIsSubmitting(false);
        return;
      }
      
      // Prepare data according to number of members
      const submissionData = {
        ...formData,
        // Only include member details if team size is 2
        members: formData.numberOfMembers === 2 ? [
          {
            name: formData.member1Name,
            email: formData.member1Email
          }
        ] : []
      };
      
      // Register the user with their team data
      await signupWithRegistration(submissionData);
      
      toast.success('Registration successful! You are now logged in.');
      navigate('/team-profile');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">Registration Form</h1>
          
          <RegistrationSteps currentStep={currentStep} />
          
          <div className="mt-12 bg-[#1A1F2C] rounded-xl p-8 shadow-lg border border-hackathon-purple/20">
            {currentStep === 1 && (
              <PersonalInfoForm 
                formData={formData} 
                updateFormData={updateFormData} 
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}
            
            {currentStep === 2 && (
              <TeamDetailsForm 
                formData={formData} 
                updateFormData={updateFormData} 
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}
            
            {currentStep === 3 && (
              <MemberDetailsForm 
                formData={formData} 
                updateFormData={updateFormData}
                onSubmit={handleSubmit}
                onPrevious={handlePrevious}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Registration;
