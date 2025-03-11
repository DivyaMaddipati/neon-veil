import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

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
      
      toast.success('Message sent successfully!', {
        duration: 3000,
        position: 'bottom-center',
      });
      
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#1E1E1E]">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="flex flex-col space-y-8">
          <h2 className="text-4xl font-bold text-center tracking-wider">GET IN TOUCH</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="relative">
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-white/40 rounded-none px-0 py-2 text-white placeholder:text-white/60 focus:border-[#8E72F1] focus:ring-0 transition-colors"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="absolute text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-white/40 rounded-none px-0 py-2 text-white placeholder:text-white/60 focus:border-[#8E72F1] focus:ring-0 transition-colors"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="absolute text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div className="relative">
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-white/40 rounded-none px-0 py-2 text-white placeholder:text-white/60 focus:border-[#8E72F1] focus:ring-0 transition-colors"
                />
              </div>

              <div className="relative">
                <Textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-white/40 rounded-none px-0 py-2 text-white placeholder:text-white/60 focus:border-[#8E72F1] focus:ring-0 transition-colors resize-none min-h-[80px]"
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="absolute text-xs text-red-500 mt-1">{errors.message}</p>}
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button 
                type="submit" 
                className="bg-[#8E72F1] hover:bg-[#9F85F2] text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 min-w-[200px]"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
