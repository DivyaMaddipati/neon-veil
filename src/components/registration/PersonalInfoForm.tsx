
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { RegistrationData } from '@/pages/Registration';

type PersonalInfoFormProps = {
  formData: RegistrationData;
  updateFormData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onPrevious: () => void;
};

const PersonalInfoForm = ({ formData, updateFormData, onNext, onPrevious }: PersonalInfoFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Move to next step
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-hackathon-purple font-medium">
            First Name
          </label>
          <Input
            id="firstName"
            type="text"
            placeholder="First name"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            className="bg-[#121212] border-[#333] text-white h-12"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-hackathon-purple font-medium">
            Last Name
          </label>
          <Input
            id="lastName"
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            className="bg-[#121212] border-[#333] text-white h-12"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-hackathon-purple font-medium">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="bg-[#121212] border-[#333] text-white h-12"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-hackathon-purple font-medium">
            Phone Number (optional)
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 XXXXXXXXXX"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
            className="bg-[#121212] border-[#333] text-white h-12"
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit"
          className="bg-hackathon-purple hover:bg-hackathon-purple/90 text-white px-8"
        >
          Save & Continue <ChevronRight size={16} />
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
