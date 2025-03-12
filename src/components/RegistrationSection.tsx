
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const RegistrationSection = () => {
  const { toast } = useToast();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    occupation: '',
    organization: '',
    experienceLevel: '',
    trackInterest: '',
    teamStatus: '',
    teamName: '',
    teammates: '',
    skills: [],
    projectIdea: '',
    dietaryRestrictions: '',
    tshirtSize: '',
    acceptedTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    const elements = document.querySelectorAll('.register-animate');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for the field when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    // Clear error for the field when user selects
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
    // Clear error for the field when user checks
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSkillsChange = (skill: string, checked: boolean) => {
    const updatedSkills = checked
      ? [...formData.skills, skill]
      : formData.skills.filter((s) => s !== skill);
    
    setFormData({ ...formData, skills: updatedSkills });
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    }
    
    if (step === 2) {
      if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
      if (!formData.trackInterest) newErrors.trackInterest = 'Challenge track is required';
      if (!formData.teamStatus) newErrors.teamStatus = 'Team status is required';
      if (formData.teamStatus === 'existing' && !formData.teamName.trim()) {
        newErrors.teamName = 'Team name is required';
      }
    }
    
    if (step === 3) {
      if (formData.skills.length === 0) newErrors.skills = 'Select at least one skill';
      if (!formData.tshirtSize) newErrors.tshirtSize = 'T-shirt size is required';
      if (!formData.acceptedTerms) newErrors.acceptedTerms = 'You must accept the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(formStep + 1);
      window.scrollTo(0, document.getElementById('register')?.offsetTop || 0);
    }
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(formStep)) {
      // Here you would typically send the data to your server
      console.log('Form submitted:', formData);
      toast({
        title: "Registration Successful!",
        description: "We've received your registration. Check your email for confirmation.",
        duration: 5000,
      });
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        occupation: '',
        organization: '',
        experienceLevel: '',
        trackInterest: '',
        teamStatus: '',
        teamName: '',
        teammates: '',
        skills: [],
        projectIdea: '',
        dietaryRestrictions: '',
        tshirtSize: '',
        acceptedTerms: false
      });
      setFormStep(1);
    }
  };

  return (
    <section id="register" className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[30%] left-[20%] w-64 h-64 rounded-full bg-hackathon-orange/10 blur-[100px]"></div>
        <div className="absolute bottom-[30%] right-[20%] w-64 h-64 rounded-full bg-hackathon-cyan/10 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title register-animate opacity-0">
          <span className="gradient-text-orange">Register</span> Now
        </h2>
        
        <div className="max-w-3xl mx-auto text-center mb-12 register-animate opacity-0">
          <p className="text-xl text-gray-300">
            Secure your spot in HackNova and get ready for an exciting 48-hour journey of innovation and creativity.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto glass p-8 rounded-xl mb-6 register-animate opacity-0">
          <div className="flex justify-between items-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg ${
                  formStep >= step ? 'bg-hackathon-cyan text-black' : 'bg-gray-700 text-gray-300'
                }`}>
                  {step}
                </div>
                <span className="text-sm mt-2 text-gray-300">
                  {step === 1 ? 'Personal Info' : step === 2 ? 'Hackathon Details' : 'Additional Info'}
                </span>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {formStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`bg-white/5 border-white/10 mt-1 ${errors.fullName ? 'border-red-500' : ''}`}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`bg-white/5 border-white/10 mt-1 ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`bg-white/5 border-white/10 mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                  <Label htmlFor="occupation">Occupation *</Label>
                  <Select
                    value={formData.occupation}
                    onValueChange={(value) => handleSelectChange('occupation', value)}
                  >
                    <SelectTrigger className={`bg-white/5 border-white/10 mt-1 ${errors.occupation ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select your occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="educator">Educator</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
                </div>
                
                <div>
                  <Label htmlFor="organization">University/Company (Optional)</Label>
                  <Input
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10 mt-1"
                  />
                </div>
              </div>
            )}
            
            {formStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <Label htmlFor="experienceLevel">Experience Level *</Label>
                  <Select
                    value={formData.experienceLevel}
                    onValueChange={(value) => handleSelectChange('experienceLevel', value)}
                  >
                    <SelectTrigger className={`bg-white/5 border-white/10 mt-1 ${errors.experienceLevel ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.experienceLevel && <p className="text-red-500 text-sm mt-1">{errors.experienceLevel}</p>}
                </div>
                
                <div>
                  <Label htmlFor="trackInterest">Challenge Track Interest *</Label>
                  <Select
                    value={formData.trackInterest}
                    onValueChange={(value) => handleSelectChange('trackInterest', value)}
                  >
                    <SelectTrigger className={`bg-white/5 border-white/10 mt-1 ${errors.trackInterest ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select a challenge track" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai">AI & Machine Learning</SelectItem>
                      <SelectItem value="cloud">Cloud Computing</SelectItem>
                      <SelectItem value="security">Cybersecurity</SelectItem>
                      <SelectItem value="sustainability">Sustainability</SelectItem>
                      <SelectItem value="open">Open Innovation</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.trackInterest && <p className="text-red-500 text-sm mt-1">{errors.trackInterest}</p>}
                </div>
                
                <div>
                  <Label>Team Status *</Label>
                  <RadioGroup
                    value={formData.teamStatus}
                    onValueChange={(value) => handleSelectChange('teamStatus', value)}
                    className="mt-2 space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="solo" id="solo" />
                      <Label htmlFor="solo" className="cursor-pointer">I will participate solo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="looking" id="looking" />
                      <Label htmlFor="looking" className="cursor-pointer">I need a team</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="existing" id="existing" />
                      <Label htmlFor="existing" className="cursor-pointer">I already have a team</Label>
                    </div>
                  </RadioGroup>
                  {errors.teamStatus && <p className="text-red-500 text-sm mt-1">{errors.teamStatus}</p>}
                </div>
                
                {formData.teamStatus === 'existing' && (
                  <>
                    <div>
                      <Label htmlFor="teamName">Team Name *</Label>
                      <Input
                        id="teamName"
                        name="teamName"
                        value={formData.teamName}
                        onChange={handleInputChange}
                        className={`bg-white/5 border-white/10 mt-1 ${errors.teamName ? 'border-red-500' : ''}`}
                      />
                      {errors.teamName && <p className="text-red-500 text-sm mt-1">{errors.teamName}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="teammates">Teammates' Emails (One per line, optional)</Label>
                      <Textarea
                        id="teammates"
                        name="teammates"
                        value={formData.teammates}
                        onChange={handleInputChange}
                        rows={3}
                        className="bg-white/5 border-white/10 mt-1"
                        placeholder="email1@example.com&#10;email2@example.com"
                      />
                    </div>
                  </>
                )}
                
                <div>
                  <Label htmlFor="projectIdea">Project Idea (Optional)</Label>
                  <Textarea
                    id="projectIdea"
                    name="projectIdea"
                    value={formData.projectIdea}
                    onChange={handleInputChange}
                    rows={4}
                    className="bg-white/5 border-white/10 mt-1"
                    placeholder="Briefly describe your project idea if you have one"
                  />
                </div>
              </div>
            )}
            
            {formStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <Label>Skills & Technologies *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                    {['Frontend', 'Backend', 'Mobile', 'AI/ML', 'UI/UX', 'Cloud', 'Blockchain', 'Cybersecurity', 'Game Dev', 'IoT', 'Data Science', 'AR/VR'].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox 
                          id={skill.toLowerCase().replace('/', '')}
                          checked={formData.skills.includes(skill)}
                          onCheckedChange={(checked) => handleSkillsChange(skill, checked as boolean)}
                        />
                        <Label htmlFor={skill.toLowerCase().replace('/', '')} className="cursor-pointer">{skill}</Label>
                      </div>
                    ))}
                  </div>
                  {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
                </div>
                
                <div>
                  <Label htmlFor="dietaryRestrictions">Dietary Restrictions (Optional)</Label>
                  <Input
                    id="dietaryRestrictions"
                    name="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10 mt-1"
                    placeholder="Vegetarian, vegan, allergies, etc."
                  />
                </div>
                
                <div>
                  <Label htmlFor="tshirtSize">T-Shirt Size *</Label>
                  <Select
                    value={formData.tshirtSize}
                    onValueChange={(value) => handleSelectChange('tshirtSize', value)}
                  >
                    <SelectTrigger className={`bg-white/5 border-white/10 mt-1 ${errors.tshirtSize ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select your t-shirt size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xs">XS</SelectItem>
                      <SelectItem value="s">S</SelectItem>
                      <SelectItem value="m">M</SelectItem>
                      <SelectItem value="l">L</SelectItem>
                      <SelectItem value="xl">XL</SelectItem>
                      <SelectItem value="xxl">XXL</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.tshirtSize && <p className="text-red-500 text-sm mt-1">{errors.tshirtSize}</p>}
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={formData.acceptedTerms}
                    onCheckedChange={(checked) => handleCheckboxChange('acceptedTerms', checked as boolean)}
                    className={errors.acceptedTerms ? 'border-red-500' : ''}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="terms" className="cursor-pointer">
                      I agree to the <a href="#" className="text-hackathon-cyan hover:underline">Terms & Conditions</a> and <a href="#" className="text-hackathon-cyan hover:underline">Code of Conduct</a> *
                    </Label>
                    {errors.acceptedTerms && <p className="text-red-500 text-sm">{errors.acceptedTerms}</p>}
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-between pt-4">
              {formStep > 1 && (
                <Button type="button" variant="outline" className="border-white/10" onClick={prevStep}>
                  Previous
                </Button>
              )}
              
              {formStep < 3 ? (
                <Button type="button" className="btn-primary ml-auto" onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit" className="btn-primary ml-auto">
                  Submit Registration
                </Button>
              )}
            </div>
          </form>
        </div>
        
        <div className="max-w-3xl mx-auto text-center register-animate opacity-0">
          <p className="text-gray-300">
            Registration closes on October 1, 2024. Limited spots available!
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
