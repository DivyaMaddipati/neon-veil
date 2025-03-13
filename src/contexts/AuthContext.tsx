
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, isAdmin?: boolean) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
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
          const response = await fetch('http://localhost:5000/user', {
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
      const endpoint = isAdmin ? 'http://localhost:5000/admin/login' : 'http://localhost:5000/login';
      
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
      const response = await fetch('http://localhost:5000/signup', {
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
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
