
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-10 border border-white/10 rounded-xl p-10">
          {/* Left column - Contact information */}
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
            <p className="text-gray-400 mb-10">
              Lorem ipsum dolor sit amet, doctus eripuit probatus no mei, no laoreet apeirian suscipiunt eos. Fugit intellegat ut usu, ut est deleifnit interesset. Debet labore ad duo. Erat iriure ea sit. Mea an expetenda scripserit, vis fugit similique id
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
                <p className="text-gray-400">INDIA: +91 93465 75094</p>
                <p className="text-gray-400">MALAYSIA: +60 11 5305 6719</p>
                <p className="text-gray-400">USA/CANADA: +1 (945) 267-3482</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Email</h3>
                <p className="text-gray-400">Hello@CognitBotz.com</p>
              </div>
            </div>
          </div>

          {/* Right column - Contact form */}
          <div className="w-full md:w-1/2 bg-[#1a1a1a] rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">GET IN TOUCH</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-transparent border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#6c43ff]"
                  required
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#6c43ff]"
                  required
                />
              </div>
              
              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-transparent border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#6c43ff]"
                />
              </div>
              
              <div>
                <Textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-transparent border-b border-white/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#6c43ff] min-h-[80px]"
                  required
                />
              </div>
              
              <div className="text-center pt-4">
                <Button 
                  type="submit" 
                  className="bg-[#6c43ff] hover:bg-[#5c35e8] text-white px-10 py-2 rounded-full"
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
