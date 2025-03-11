
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RegistrationData } from '@/pages/Registration';

type TeamDetailsFormProps = {
  formData: RegistrationData;
  updateFormData: (data: Partial<RegistrationData>) => void;
  onNext: () => void;
  onPrevious: () => void;
};

const collegeOptions = [
  "Select your college",
  "ABC Engineering College",
  "XYZ University",
  "PQR Institute of Technology",
  "Other"
];

const TeamDetailsForm = ({ formData, updateFormData, onNext, onPrevious }: TeamDetailsFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.teamName || !formData.collegeName || !formData.teamLeaderName || !formData.teamLeaderEmail) {
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
          <label htmlFor="teamName" className="block text-hackathon-purple font-medium">
            Team Name
          </label>
          <Input
            id="teamName"
            type="text"
            placeholder="Team name"
            value={formData.teamName}
            onChange={(e) => updateFormData({ teamName: e.target.value })}
            className="bg-[#121212] border-[#333] text-white h-12"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="collegeName" className="block text-hackathon-purple font-medium">
            College name
          </label>
          <select
            id="collegeName"
            value={formData.collegeName}
            onChange={(e) => updateFormData({ collegeName: e.target.value })}
            className="bg-[#121212] border border-[#333] text-white h-12 w-full rounded-md px-3 appearance-none cursor-pointer"
            required
          >
            {collegeOptions.map((option, index) => (
              <option key={index} value={option === "Select your college" ? "" : option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="numberOfMembers" className="block text-hackathon-purple font-medium">
            Number of Team Members
          </label>
          <Input
            id="numberOfMembers"
            type="number"
            placeholder="Eg: 3"
            min={1}
            max={4}
            value={formData.numberOfMembers}
            onChange={(e) => updateFormData({ numberOfMembers: parseInt(e.target.value) || 2 })}
            className="bg-[#121212] border-[#333] text-white h-12"
            required
          />
        </div>
        
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="teamLeaderName" className="block text-hackathon-purple font-medium">
              Team Leader Name
            </label>
            <Input
              id="teamLeaderName"
              type="text"
              placeholder="Full Name"
              value={formData.teamLeaderName}
              onChange={(e) => updateFormData({ teamLeaderName: e.target.value })}
              className="bg-[#121212] border-[#333] text-white h-12"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="teamLeaderEmail" className="block text-hackathon-purple font-medium">
              Team Leader Email
            </label>
            <Input
              id="teamLeaderEmail"
              type="email"
              placeholder="example@gmail.com"
              value={formData.teamLeaderEmail}
              onChange={(e) => updateFormData({ teamLeaderEmail: e.target.value })}
              className="bg-[#121212] border-[#333] text-white h-12"
              required
            />
          </div>
        </div>
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
        >
          Save & Continue <ChevronRight size={16} />
        </Button>
      </div>
    </form>
  );
};

export default TeamDetailsForm;
