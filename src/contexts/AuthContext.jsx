
import { createContext, useContext, useState } from "react";

const defaultUser = {
  id: 1,
  name: "Jane Doe",
  email: "jane@weforchange.org",
  role: "admin",
  avatar: "https://i.pravatar.cc/150?img=1"
};

const memberUser = {
  id: 2,
  name: "John Smith",
  email: "john@weforchange.org",
  role: "member",
  avatar: "https://i.pravatar.cc/150?img=2"
};

const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
  isAdmin: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const login = async (email, password) => {
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
