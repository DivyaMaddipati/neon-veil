
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      
      // Show success animation using toast
      toast.success('Message sent successfully!', {
        duration: 3000,
        position: 'bottom-center',
      });
      
      // Reset form
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#1E1E1E]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-10 border border-white/10 rounded-xl p-10">
          
          {/* Left column - Contact information */}
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
            <p className="text-gray-400 mb-10">
              Have questions about the hackathon? Need more information? 
              Get in touch with our team, and we'll be happy to assist you.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Address</h3>
                <address className="text-gray-400 not-italic">
                  Lumbini Avenue<br />
                  Gachibowli, Hyderabad<br />
                  Telangana, India
                </address>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Phone</h3>
                <p className="text-gray-400">
                  📞 <a href="tel:+919346575094" className="hover:text-blue-400 transition-colors">INDIA: +91 93465 75094</a>
                </p>
                <p className="text-gray-400">
                  📞 <a href="tel:+601153056719" className="hover:text-blue-400 transition-colors">MALAYSIA: +60 11 5305 6719</a>
                </p>
                <p className="text-gray-400">
                  📞 <a href="tel:+19452673482" className="hover:text-blue-400 transition-colors">USA/CANADA: +1 (945) 267-3482</a>
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Email</h3>
                <p className="text-gray-400">
                  ✉️ <a href="mailto:Hello@CognitBotz.com" className="hover:text-blue-400 transition-colors">Hello@CognitBotz.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Contact form */}
          <div className="w-full md:w-1/2 bg-[#1E1E1E] rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-8 text-center uppercase tracking-wider">GET IN TOUCH</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-light text-white/80">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-transparent border-b border-white/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#8E72F1] hover:border-white/60 transition-colors h-10"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-light text-white/80">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent border-b border-white/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#8E72F1] hover:border-white/60 transition-colors h-10"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-light text-white/80">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-transparent border-b border-white/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#8E72F1] hover:border-white/60 transition-colors h-10"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-light text-white/80">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-transparent border-b border-white/40 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#8E72F1] hover:border-white/60 transition-colors min-h-[80px] resize-none"
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>
              
              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-[#8E72F1] hover:bg-[#9F85F2] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
                >
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
