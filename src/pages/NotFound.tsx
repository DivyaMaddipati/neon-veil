
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-hackathon-dark px-4">
      <div className="glass p-10 rounded-xl max-w-md w-full text-center neon-cyan-glow animate-float">
        <div className="mb-6 inline-flex p-4 rounded-full bg-hackathon-orange/20 text-hackathon-orange">
          <AlertTriangle size={48} />
        </div>
        <h1 className="text-5xl font-bold mb-4 gradient-text-orange">404</h1>
        <p className="text-xl text-gray-300 mb-8">Oops! The page you're looking for ventured too far into cyberspace.</p>
        <Button onClick={() => navigate('/')} className="btn-primary w-full">
          Return to Launch Pad
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
