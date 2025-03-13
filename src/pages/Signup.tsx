
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      toast.error('All fields are required');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await signup({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      
      toast.success('Sign up successful!');
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error instanceof Error ? error.message : 'Sign up failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-md">
          <h1 className="text-4xl font-bold text-white text-center mb-8">Sign Up</h1>
          
          <div className="bg-[#1A1F2C] rounded-xl p-8 shadow-lg border border-hackathon-purple/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-hackathon-purple font-medium">
                  First Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
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
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
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
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#121212] border-[#333] text-white h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-hackathon-purple font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-[#121212] border-[#333] text-white h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-hackathon-purple font-medium">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-[#121212] border-[#333] text-white h-12"
                  required
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-hackathon-purple hover:bg-hackathon-purple/90 text-white h-12 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </Button>
              
              <div className="text-center text-white mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-hackathon-purple hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
