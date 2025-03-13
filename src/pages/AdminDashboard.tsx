
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Registration {
  teamName: string;
  collegeName: string;
  teamLeaderName: string;
  teamLeaderEmail: string;
  numberOfMembers: number;
  members: { name: string; email: string }[];
  problemStatement: string;
  registrationDate: string;
  status: string;
}

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isAdmin, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated or not an admin
    if (!isAuthenticated || !isAdmin) {
      toast.error('You must be logged in as an admin to access this page');
      navigate('/login');
      return;
    }

    // Fetch registrations
    const fetchRegistrations = async () => {
      try {
        const response = await fetch('http://localhost:5000/registrations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch registrations');
        }
        
        const data = await response.json();
        setRegistrations(data.registrations);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        toast.error('Failed to load registrations');
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [isAuthenticated, isAdmin, navigate, token]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
          
          <div className="bg-[#1A1F2C] rounded-xl p-8 shadow-lg border border-hackathon-purple/20">
            <h2 className="text-2xl font-bold text-hackathon-purple mb-6">Registrations</h2>
            
            {loading ? (
              <div className="text-center py-8">
                <p className="text-white">Loading registrations...</p>
              </div>
            ) : registrations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-white">No registrations found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead className="bg-hackathon-purple/20 border-b border-hackathon-purple/30">
                    <tr>
                      <th className="py-3 px-4 text-left">Team Name</th>
                      <th className="py-3 px-4 text-left">College</th>
                      <th className="py-3 px-4 text-left">Team Leader</th>
                      <th className="py-3 px-4 text-left">Members</th>
                      <th className="py-3 px-4 text-left">Problem</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map((reg, index) => (
                      <tr key={index} className="border-b border-gray-700">
                        <td className="py-3 px-4">{reg.teamName}</td>
                        <td className="py-3 px-4">{reg.collegeName}</td>
                        <td className="py-3 px-4">{reg.teamLeaderName}</td>
                        <td className="py-3 px-4">{reg.numberOfMembers}</td>
                        <td className="py-3 px-4">{reg.problemStatement || 'N/A'}</td>
                        <td className="py-3 px-4">
                          {new Date(reg.registrationDate).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded ${
                            reg.status === 'approved' 
                              ? 'bg-green-900/30 text-green-400' 
                              : reg.status === 'rejected'
                              ? 'bg-red-900/30 text-red-400'
                              : 'bg-yellow-900/30 text-yellow-400'
                          }`}>
                            {reg.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
