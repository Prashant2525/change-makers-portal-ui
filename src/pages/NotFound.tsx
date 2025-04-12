
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <img 
        src="/lovable-uploads/fd0ebe0a-3c85-4aca-8d20-0cb96d54fd21.png"
        alt="We For Change"
        className="mb-6 h-16"
      />
      
      <h1 className="mb-2 text-6xl font-bold text-wfc-purple">404</h1>
      <h2 className="mb-6 text-3xl font-semibold text-gray-900">Page Not Found</h2>
      <p className="mb-8 max-w-md text-gray-600">
        We couldn't find the page you're looking for. Please check the URL or return to the dashboard.
      </p>
      
      <Link
        to={isAuthenticated ? "/dashboard" : "/login"}
        className="flex items-center gap-2 rounded-md bg-wfc-purple px-6 py-3 font-medium text-white transition-colors hover:bg-wfc-purple-dark"
      >
        <HomeIcon className="h-5 w-5" />
        {isAuthenticated ? "Back to Dashboard" : "Back to Login"}
      </Link>
    </div>
  );
};

export default NotFound;
