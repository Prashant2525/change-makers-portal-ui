
import { useState, FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { User, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await login(email, password);
      toast({
        title: "Success",
        description: "Login successful! Welcome back.",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full md:w-1/2 flex-col items-center justify-center px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <img
              src="/lovable-uploads/fd0ebe0a-3c85-4aca-8d20-0cb96d54fd21.png"
              alt="We For Change"
              className="h-12 mx-auto"
            />
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              LOGIN
            </h1>
            <p className="mt-2 text-gray-600">
              Sign in to access the member portal
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4 rounded-md">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 text-gray-900 focus:border-wfc-purple focus:outline-none focus:ring-2 focus:ring-wfc-purple/20"
                  required
                />
              </div>
              
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="block w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-10 text-gray-900 focus:border-wfc-purple focus:outline-none focus:ring-2 focus:ring-wfc-purple/20"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-lg bg-wfc-purple py-3 px-4 text-sm font-medium text-white hover:bg-wfc-purple-dark focus:outline-none focus:ring-2 focus:ring-wfc-purple focus:ring-offset-2"
              >
                {isLoading ? "Signing in..." : "Login"}
              </button>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              <p>
                For testing, use:
                <br />
                <span className="font-medium">admin@weforchange.org / password</span> for Admin
                <br />
                <span className="font-medium">member@weforchange.org / password</span> for Member
              </p>
            </div>
          </form>
        </div>
      </div>
      
      <div className="hidden w-1/2 bg-wfc-purple md:block">
        <div className="flex h-full flex-col items-center justify-center px-8 text-white">
          <div className="max-w-md text-center">
            <h2 className="mb-6 text-4xl font-bold">
              Very good works are waiting for you
            </h2>
            <p className="text-lg opacity-90">
              Join our community of changemakers and contribute to projects that make a real difference in the world.
            </p>
          </div>
          <img 
            src="/lovable-uploads/d357fab8-e110-4b68-96f7-8601e135d6bb.png" 
            alt="People working together" 
            className="mt-8 max-w-sm rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
