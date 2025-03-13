
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await login(email, password, isAdmin);
      
      toast.success(`${isAdmin ? 'Admin' : 'User'} login successful!`);
      navigate(isAdmin ? '/admin-dashboard' : '/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-md">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            {isAdmin ? 'Admin Login' : 'Login'}
          </h1>
          
          <div className="bg-[#1A1F2C] rounded-xl p-8 shadow-lg border border-hackathon-purple/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-hackathon-purple font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#121212] border-[#333] text-white h-12"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isAdmin"
                  checked={isAdmin}
                  onChange={() => setIsAdmin(!isAdmin)}
                  className="rounded bg-[#121212] border-[#333] text-hackathon-purple focus:ring-hackathon-purple"
                />
                <label htmlFor="isAdmin" className="text-white">
                  Login as Administrator
                </label>
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-hackathon-purple hover:bg-hackathon-purple/90 text-white h-12 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
              
              {!isAdmin && (
                <div className="text-center text-white mt-4">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-hackathon-purple hover:underline">
                    Sign up
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
