
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { RegistrationData } from '@/pages/Registration';
import { useState } from 'react';
import { toast } from 'sonner';

type PersonalInfoFormProps = {
  formData: RegistrationData;
  updateFormData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onPrevious: () => void;
};

const PersonalInfoForm = ({ formData, updateFormData, onNext, onPrevious }: PersonalInfoFormProps) => {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Validate password
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    try {
      setIsCheckingEmail(true);
      
      // Check if email is already registered
      const response = await fetch('http://localhost:5000/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 409) {
          toast.error('This email is already registered. Please login instead.');
          return;
        } else {
          throw new Error(data.error || 'Failed to check email');
        }
      }
      
      // Move to next step
      onNext();
    } catch (error) {
      console.error('Email check error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to check email');
    } finally {
      setIsCheckingEmail(false);
    }
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
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="password" className="block text-hackathon-purple font-medium">
            Password
          </label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password (minimum 6 characters)"
            value={formData.password}
            onChange={(e) => updateFormData({ password: e.target.value })}
            className="bg-[#121212] border-[#333] text-white h-12"
            required
          />
          <p className="text-white/60 text-sm mt-1">
            You'll use this password to login to your account later.
          </p>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit"
          className="bg-hackathon-purple hover:bg-hackathon-purple/90 text-white px-8"
          disabled={isCheckingEmail}
        >
          {isCheckingEmail ? 'Checking...' : 'Save & Continue'} <ChevronRight size={16} className={isCheckingEmail ? 'ml-2 animate-spin' : 'ml-2'} />
        </Button>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
