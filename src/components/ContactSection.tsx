
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
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Section */}
          <div className="flex flex-col space-y-6">
            <h2 className="text-4xl font-bold tracking-wider">CONTACT US</h2>
            <p className="text-white/80 leading-relaxed">
              Have questions about the hackathon? Want to partner with us? 
              We'd love to hear from you.
            </p>
            <div className="space-y-4 mt-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-[#8E72F1]/10 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8E72F1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-white/60">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-[#8E72F1]/10 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8E72F1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <path d="m22 6-10 7L2 6"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-white/60">info@hackathon.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-[#8E72F1]/10 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8E72F1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Location</h3>
                  <p className="text-white/60">123 Innovation Street<br />Tech City, TC 12345</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
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
                    className="w-full bg-transparent border-0 border-b border-white/40 rounded-none px-0 py-2 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-[#8E72F1] transition-all duration-300"
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
                    className="w-full bg-transparent border-0 border-b border-white/40 rounded-none px-0 py-2 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-[#8E72F1] transition-all duration-300"
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
                    className="w-full bg-transparent border-0 border-b border-white/40 rounded-none px-0 py-2 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-[#8E72F1] transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <Textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-white/40 rounded-none px-0 py-2 text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-[#8E72F1] transition-all duration-300 resize-none min-h-[80px]"
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
      </div>
    </section>
  );
};

export default ContactSection;
