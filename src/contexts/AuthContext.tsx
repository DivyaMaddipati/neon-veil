
import React, { createContext, useContext, useState, useEffect } from 'react';
import { RegistrationData } from '@/pages/Registration';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
  teamId?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  signupWithRegistration: (registrationData: RegistrationData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  // Check if token exists and validate on mount
  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        try {
          const response = await fetch('https://agentx-backend-n7j2.onrender.com/user', {
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setToken(storedToken);
          } else {
            // Token is invalid or expired
            localStorage.removeItem('authToken');
            setUser(null);
            setToken(null);
          }
        } catch (error) {
          console.error('Error validating token:', error);
          localStorage.removeItem('authToken');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    validateToken();
  }, []);

  const login = async (email: string, password: string, isAdmin = false) => {
    try {
      setLoading(true);
      const endpoint = isAdmin ? 'https://agentx-backend-n7j2.onrender.com/admin/login' : 'https://agentx-backend-n7j2.onrender.com/login';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      localStorage.setItem('authToken', data.token);
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const signup = async (userData: SignupData) => {
    try {
      setLoading(true);
      const response = await fetch('https://agentx-backend-n7j2.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }
      
      localStorage.setItem('authToken', data.token);
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const signupWithRegistration = async (registrationData: RegistrationData) => {
    try {
      setLoading(true);
      
      // First, create the user account
      const signupResponse = await fetch('https://agentx-backend-n7j2.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registrationData.email,
          password: registrationData.password,
          firstName: registrationData.firstName,
          lastName: registrationData.lastName
        }),
      });
      
      const signupData = await signupResponse.json();
      
      if (!signupResponse.ok) {
        throw new Error(signupData.error || 'Account creation failed');
      }
      
      // Store the token and user data
      localStorage.setItem('authToken', signupData.token);
      setToken(signupData.token);
      setUser(signupData.user);
      
      // Now register for the hackathon with the auth token
      const registrationResponse = await fetch('https://agentx-backend-n7j2.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${signupData.token}`
        },
        body: JSON.stringify({
          firstName: registrationData.firstName,
          lastName: registrationData.lastName,
          email: registrationData.email,
          phone: registrationData.phone,
          teamName: registrationData.teamName,
          collegeName: registrationData.collegeName,
          numberOfMembers: registrationData.numberOfMembers,
          teamLeaderName: registrationData.teamLeaderName,
          teamLeaderEmail: registrationData.teamLeaderEmail,
          members: registrationData.numberOfMembers === 2 ? [
            {
              name: registrationData.member1Name,
              email: registrationData.member1Email
            }
          ] : [],
          problemStatement: registrationData.problemStatement
        }),
      });
      
      const registrationResult = await registrationResponse.json();
      
      if (!registrationResponse.ok) {
        // If registration fails, still keep the user logged in but throw an error
        throw new Error(registrationResult.error || 'Team registration failed');
      }
      
      // Update user with team ID
      if (registrationResult.id) {
        setUser(prev => prev ? { ...prev, teamId: registrationResult.id } : null);
      }
      
      return registrationResult;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setToken(null);
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        token, 
        isAuthenticated: !!user, 
        isAdmin: user?.role === 'admin',
        login, 
        signup, 
        signupWithRegistration,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
