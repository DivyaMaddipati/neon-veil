
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Phone, Mail, MapPin, ArrowRight, CheckCircle } from 'lucide-react';
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
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.contact-animate');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

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
      setFormStatus('submitting');
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        
        setFormStatus('success');
        toast.success('Message sent successfully!', {
          duration: 3000,
          position: 'bottom-center',
        });
        
        setFormData({ name: '', email: '', phone: '', message: '' });
        
        setTimeout(() => setFormStatus('idle'), 3000);
      }, 1500);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/3 left-[5%] w-64 h-64 rounded-full bg-[#6c43ff]/10 blur-[80px]"></div>
        <div className="absolute bottom-1/3 right-[5%] w-64 h-64 rounded-full bg-[#ff6b00]/10 blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16 contact-animate opacity-0">
          <h2 className="cyber-font text-4xl md:text-5xl font-bold text-white mb-4 relative inline-block">
            Get in <span className="text-[#6c43ff]">Touch</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#6c43ff] to-[#ff6b00]"></div>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Have questions about the hackathon? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Section */}
          <div className="flex flex-col space-y-8 contact-animate opacity-0">
            <div className="neo-glass border border-[#6c43ff]/30 rounded-xl p-6 md:p-8">
              <h3 className="text-2xl font-bold cyber-font mb-6 text-white">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#6c43ff]/10 flex items-center justify-center shrink-0 border border-[#6c43ff]/30">
                    <MapPin className="h-5 w-5 text-[#6c43ff]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Address</h4>
                    <p className="text-gray-400 text-sm">
                      Lumbini Avenue<br />
                      Gachibowli, Hyderabad<br />
                      Telangana, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#6c43ff]/10 flex items-center justify-center shrink-0 border border-[#6c43ff]/30">
                    <Phone className="h-5 w-5 text-[#6c43ff]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Phone</h4>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm flex items-center">
                        <span className="text-xs text-gray-500 mr-2">INDIA:</span>
                        +91 93465 75094
                      </p>
                      <p className="text-gray-400 text-sm flex items-center">
                        <span className="text-xs text-gray-500 mr-2">MALAYSIA:</span>
                        +60 11 5305 6719
                      </p>
                      <p className="text-gray-400 text-sm flex items-center">
                        <span className="text-xs text-gray-500 mr-2">USA/CANADA:</span>
                        +1 (945) 267-3482
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#6c43ff]/10 flex items-center justify-center shrink-0 border border-[#6c43ff]/30">
                    <Mail className="h-5 w-5 text-[#6c43ff]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Email</h4>
                    <p className="text-gray-400 text-sm">Hello@CognitBotz.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t border-white/10 pt-6">
                <h4 className="font-semibold text-white mb-4">Follow us</h4>
                <div className="flex space-x-3">
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-full bg-[#1A1F2C] flex items-center justify-center hover:bg-[#6c43ff] transition-colors border border-white/10"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-full bg-[#1A1F2C] flex items-center justify-center hover:bg-[#6c43ff] transition-colors border border-white/10"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-9 h-9 rounded-full bg-[#1A1F2C] flex items-center justify-center hover:bg-[#6c43ff] transition-colors border border-white/10"
                  >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="contact-animate opacity-0">
            <div className="neo-glass border border-[#6c43ff]/30 rounded-xl p-6 md:p-8">
              <h3 className="text-2xl font-bold cyber-font mb-6 text-white">Send us a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="neo-input"
                    aria-invalid={!!errors.name}
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  />
                  {errors.name && <p className="absolute text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="neo-input"
                    aria-invalid={!!errors.email}
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  />
                  {errors.email && <p className="absolute text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div className="relative">
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (Optional)"
                    value={formData.phone}
                    onChange={handleChange}
                    className="neo-input"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  />
                </div>

                <div className="relative">
                  <Textarea
                    name="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    className="neo-input min-h-[120px]"
                    aria-invalid={!!errors.message}
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  />
                  {errors.message && <p className="absolute text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    className={`relative overflow-hidden group ${
                      formStatus === 'submitting' ? 'bg-[#343259] cursor-wait' : 
                      formStatus === 'success' ? 'bg-green-600' : 
                      'bg-[#6c43ff] hover:bg-[#7E59DD]'
                    } text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 min-w-[200px] h-12`}
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  >
                    {formStatus === 'submitting' ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        <span>Sending...</span>
                      </div>
                    ) : formStatus === 'success' ? (
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span>Message Sent</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        <span>Send Message</span>
                      </div>
                    )}
                    
                    {formStatus !== 'submitting' && formStatus !== 'success' && (
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#7E59DD] to-[#6c43ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
