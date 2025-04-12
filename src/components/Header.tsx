
import { Bell, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Header = ({ title }: { title: string }) => {
  const { user } = useAuth();
  
  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-wfc-purple focus:ring-2 focus:ring-wfc-purple/10"
          />
        </div>
        
        <div className="relative">
          <button className="relative rounded-full p-2 text-gray-500 hover:bg-gray-100">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-red-500"></span>
          </button>
        </div>
        
        {user?.avatar && (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-8 w-8 rounded-full object-cover"
          />
        )}
      </div>
    </header>
  );
};

export default Header;
