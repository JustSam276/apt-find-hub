
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/lib/mockData';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  signup: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in via localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // This is a mock implementation. In a real app, you would verify with a backend
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find user by email (in a real app, this would be handled by the backend)
      const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (user) {
        // In a real app, you would validate the password here
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  const signup = async (
    name: string, 
    email: string, 
    password: string, 
    role: UserRole
  ): Promise<boolean> => {
    // This is a mock implementation. In a real app, you would create a user in your backend
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if email already exists
      const existingUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (existingUser) {
        toast({
          title: "Signup failed",
          description: "Email already in use",
          variant: "destructive",
        });
        return false;
      }
      
      // Create new user (this would normally be done by the backend)
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        createdAt: new Date(),
      };
      
      // In a real app, the backend would add the user to the database
      // For demo purposes, we'll just log in with the new user
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      toast({
        title: "Account created",
        description: `Welcome, ${newUser.name}!`,
      });
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
