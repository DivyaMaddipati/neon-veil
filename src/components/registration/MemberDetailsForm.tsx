
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft } from 'lucide-react';
import { RegistrationData } from '@/pages/Registration';

type MemberDetailsFormProps = {
  formData: RegistrationData;
  updateFormData: (data: Partial<RegistrationData>) => void;
  onSubmit: () => void;
  onPrevious: () => void;
};

const problemStatementOptions = [
  "Select a problem statement",
  "Cyber Security",
  "AI & Machine Learning",
  "Blockchain",
  "IoT Solutions",
  "Cloud Computing"
];

const MemberDetailsForm = ({ formData, updateFormData, onSubmit, onPrevious }: MemberDetailsFormProps) => {
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Validate form
    const isValid = 
      formData.member1Name.trim() !== '' && 
      formData.member1Email.trim() !== '' &&
      formData.problemStatement.trim() !== '' &&
      formData.termsAccepted;
    
    setIsFormValid(isValid);
  }, [formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      alert('Please fill in all required fields and accept the terms and conditions');
      return;
    }
    
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="member1Name" className="block text-hackathon-purple font-medium">
            Member 1 Name
          </label>
          <Input
            id="member1Name"
            type="text"
            placeholder="Full Name"
            value={formData.member1Name}
            onChange={(e) => updateFormData({ member1Name: e.target.value })}
            className="bg-[#121212] border-[#333] text-white h-12"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="member1Email" className="block text-hackathon-purple font-medium">
            Member 1 Email
          </label>
          <Input
            id="member1Email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.member1Email}
            onChange={(e) => updateFormData({ member1Email: e.target.value })}
            className="bg-[#121212] border-[#333] text-white h-12"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="member2Name" className="block text-hackathon-purple font-medium">
            Member 2 Name
          </label>
          <Input
            id="member2Name"
            type="text"
            placeholder="Full Name"
            value={formData.member2Name}
            onChange={(e) => updateFormData({ member2Name: e.target.value })}
            className="bg-[#121212] border-[#333] text-white h-12"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="member2Email" className="block text-hackathon-purple font-medium">
            Member 2 Email
          </label>
          <Input
            id="member2Email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.member2Email}
            onChange={(e) => updateFormData({ member2Email: e.target.value })}
            className="bg-[#121212] border-[#333] text-white h-12"
          />
        </div>
        
        <div className="space-y-2 col-span-1 md:col-span-2">
          <label htmlFor="problemStatement" className="block text-hackathon-purple font-medium">
            Problem Statement
          </label>
          <select
            id="problemStatement"
            value={formData.problemStatement}
            onChange={(e) => updateFormData({ problemStatement: e.target.value })}
            className="bg-[#121212] border border-[#333] text-white h-12 w-full rounded-md px-3 appearance-none cursor-pointer"
            required
          >
            {problemStatementOptions.map((option, index) => (
              <option key={index} value={option === "Select a problem statement" ? "" : option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          checked={formData.termsAccepted}
          onCheckedChange={(checked) => 
            updateFormData({ termsAccepted: checked === true })
          }
          className="data-[state=checked]:bg-hackathon-purple data-[state=checked]:border-hackathon-purple h-5 w-5"
        />
        <label
          htmlFor="terms"
          className="text-sm text-gray-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the Terms & Conditions
        </label>
      </div>
      
      <div className="flex justify-between">
        <Button 
          type="button"
          onClick={onPrevious}
          className="bg-transparent border border-hackathon-purple hover:bg-hackathon-purple/10 text-hackathon-purple"
        >
          <ChevronLeft size={16} /> Previous
        </Button>
        
        <Button 
          type="submit"
          className="bg-hackathon-purple hover:bg-hackathon-purple/90 text-white px-8"
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default MemberDetailsForm;
