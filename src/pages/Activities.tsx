
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Search,
} from "lucide-react";

// Mock activities data
const allActivities = [
  {
    id: 1,
    title: "Beach Cleanup",
    category: "Environment",
    date: "2025-04-18",
    location: "Ocean Beach Park",
    participants: 45,
    hours: 3,
    description: "Join us for a community beach cleanup to remove trash and debris from our local shoreline.",
    image: "https://images.unsplash.com/photo-1618886614638-80e3c103d465?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    title: "Food Drive",
    category: "Community Service",
    date: "2025-04-25",
    location: "Community Center",
    participants: 30,
    hours: 4,
    description: "Help collect and distribute food to those in need in our community.",
    image: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    title: "Mentoring Program",
    category: "Education",
    date: "2025-05-02",
    location: "City Library",
    participants: 20,
    hours: 2,
    description: "Volunteer to mentor underserved youth and help them develop important skills.",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    title: "Tree Planting",
    category: "Environment",
    date: "2025-05-15",
    location: "City Park",
    participants: 50,
    hours: 5,
    description: "Help enhance our urban forest by planting trees throughout the city park.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
];

// Mock categories for filters
const categories = [
  "All",
  "Environment",
  "Education",
  "Community Service",
  "Health",
  "Arts",
];

const Activities = () => {
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Filter activities based on search and category
  const filteredActivities = allActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        activity.description.toLowerCase().includes(searchTerm.toLowerCase());
                        
    const matchesCategory = selectedCategory === "All" || activity.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
        
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search activities..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-4 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
          />
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2">
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ${
                selectedCategory === category
                  ? "bg-wfc-purple text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredActivities.length > 0 ? (
          filteredActivities.map(activity => (
            <div
              key={activity.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-wfc-purple bg-opacity-10 px-2.5 py-0.5 text-xs font-medium text-wfc-purple">
                    {activity.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="mr-1 h-3 w-3" />
                    {activity.hours} hours
                  </div>
                </div>
                
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{activity.title}</h3>
                <p className="mb-3 text-sm text-gray-600 line-clamp-2">{activity.description}</p>
                
                <div className="mb-3 space-y-1.5 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    {new Date(activity.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    {activity.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    {activity.participants} participants
                  </div>
                </div>
                
                <button className="flex w-full items-center justify-center gap-1 rounded-md bg-wfc-purple py-2 text-sm font-medium text-white hover:bg-wfc-purple-dark">
                  {isAdmin ? "Manage Activity" : "Sign Up"}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500">
            <p className="text-lg font-medium">No activities found matching your criteria</p>
            <p className="mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
