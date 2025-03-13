
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface TeamData {
  teamName: string;
  collegeName: string;
  teamLeaderName: string;
  teamLeaderEmail: string;
  numberOfMembers: number;
  members: { name: string; email: string }[];
  problemStatement: string;
  status: string;
  registrationDate: string;
}

const TeamProfile = () => {
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
      return;
    }

    const fetchTeamData = async () => {
      if (!token) return;
      
      try {
        setIsLoading(true);
        const response = await fetch('https://agentx-backend-n7j2.onrender.com/team-profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch team data');
        }
        
        const data = await response.json();
        setTeamData(data.team);
      } catch (error) {
        console.error('Error fetching team data:', error);
        toast.error('Failed to load team data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && token) {
      fetchTeamData();
    }
  }, [isAuthenticated, token, navigate]);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'text-green-500';
      case 'rejected':
        return 'text-red-500';
      case 'pending':
      default:
        return 'text-yellow-500';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8">My Team Dashboard</h1>
          
          {isLoading ? (
            <div className="bg-[#1A1F2C] rounded-xl p-8 shadow-lg border border-hackathon-purple/20 space-y-6">
              <Skeleton className="h-8 w-3/4 bg-gray-700" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-32 bg-gray-700" />
                <Skeleton className="h-32 bg-gray-700" />
              </div>
              <Skeleton className="h-40 bg-gray-700" />
            </div>
          ) : teamData ? (
            <div className="bg-[#1A1F2C] rounded-xl p-8 shadow-lg border border-hackathon-purple/20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{teamData.teamName}</h2>
                  <p className="text-gray-400">{teamData.collegeName}</p>
                </div>
                <div className={`px-4 py-2 rounded-full ${getStatusColor(teamData.status)} border border-current font-medium mt-2 md:mt-0`}>
                  Status: {teamData.status.charAt(0).toUpperCase() + teamData.status.slice(1)}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#121212] p-5 rounded-lg border border-hackathon-purple/10">
                  <h3 className="text-xl font-semibold text-hackathon-purple mb-3">Team Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-400">Team Leader</p>
                      <p className="text-white">{teamData.teamLeaderName}</p>
                      <p className="text-gray-400 text-sm">{teamData.teamLeaderEmail}</p>
                    </div>
                    
                    {teamData.members.length > 0 && (
                      <div>
                        <p className="text-gray-400">Team Members</p>
                        {teamData.members.map((member, index) => (
                          <div key={index} className="text-white">
                            {member.name}
                            <p className="text-gray-400 text-sm">{member.email}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div>
                      <p className="text-gray-400">Registration Date</p>
                      <p className="text-white">
                        {new Date(teamData.registrationDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-[#121212] p-5 rounded-lg border border-hackathon-purple/10">
                  <h3 className="text-xl font-semibold text-hackathon-purple mb-3">Challenge Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-400">Selected Problem Statement</p>
                      <p className="text-white">{teamData.problemStatement}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400">Progress Tracking</p>
                      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                        <div className="bg-hackathon-purple h-2.5 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                      <p className="text-white text-sm mt-1">Phase 1: Ideation</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#121212] p-5 rounded-lg border border-hackathon-purple/10 mb-8">
                <h3 className="text-xl font-semibold text-hackathon-purple mb-3">Next Steps</h3>
                <ol className="space-y-3 text-white list-decimal pl-4">
                  <li>Complete the ideation phase by submitting your concept document</li>
                  <li>Prepare for the first check-in with mentors (scheduled for next week)</li>
                  <li>Begin working on your prototype</li>
                </ol>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 justify-end">
                <Button variant="outline" className="border-hackathon-purple text-hackathon-purple hover:bg-hackathon-purple/10">
                  Contact Organizer
                </Button>
                <Button className="bg-hackathon-purple hover:bg-hackathon-purple/90 text-white">
                  Submit Deliverable
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-[#1A1F2C] rounded-xl p-8 shadow-lg border border-hackathon-purple/20 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">No Team Registration Found</h2>
              <p className="text-gray-400 mb-6">You haven't registered a team for the hackathon yet.</p>
              <Link to="/registration">
                <Button className="bg-hackathon-purple hover:bg-hackathon-purple/90 text-white">
                  Complete Registration
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamProfile;
