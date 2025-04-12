
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "member";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const defaultUser: User = {
  id: 1,
  name: "Jane Doe",
  email: "jane@weforchange.org",
  role: "admin",
  avatar: "https://i.pravatar.cc/150?img=1"
};

const memberUser: User = {
  id: 2,
  name: "John Smith",
  email: "john@weforchange.org",
  role: "member",
  avatar: "https://i.pravatar.cc/150?img=2"
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
  isAdmin: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const login = async (email: string, password: string) => {
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock login logic
    if (email.includes("admin")) {
      setUser(defaultUser);
    } else {
      setUser(memberUser);
    }
  };
  
  const logout = () => {
    setUser(null);
  };
  
  const isAuthenticated = user !== null;
  const isAdmin = user?.role === "admin";
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
