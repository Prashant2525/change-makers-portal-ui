
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Calendar,
  Search,
  MapPin,
  Clock,
  Users,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Mock events data
const allEvents = [
  {
    id: 1,
    title: "Beach Cleanup Drive",
    date: "2025-04-20",
    startTime: "09:00",
    endTime: "12:00",
    location: "Sunny Beach",
    organizer: "Environmental Team",
    description: "Join us for a community effort to clean our local beaches. All cleaning supplies will be provided. Please wear comfortable clothes and sunscreen!",
    attendees: 45,
    capacity: 75,
    image: "https://images.unsplash.com/photo-1618886614638-80e3c103d465?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
  },
  {
    id: 2,
    title: "Fundraising Workshop",
    date: "2025-04-25",
    startTime: "14:00",
    endTime: "16:00",
    location: "Community Center",
    organizer: "Development Team",
    description: "Learn effective strategies for fundraising and grant writing from our experienced team members and guest speakers.",
    attendees: 28,
    capacity: 50,
    image: "https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
  },
  {
    id: 3,
    title: "Community Garden Project",
    date: "2025-05-05",
    startTime: "10:00",
    endTime: "15:00",
    location: "Downtown Garden",
    organizer: "Urban Planning Team",
    description: "Help us plant and maintain our community garden. We'll be growing vegetables that will be donated to local food banks.",
    attendees: 32,
    capacity: 60,
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
  },
  {
    id: 4,
    title: "Youth Mentorship Program Launch",
    date: "2025-05-12",
    startTime: "16:30",
    endTime: "19:00",
    location: "City Library",
    organizer: "Education Team",
    description: "Join us for the launch of our new youth mentorship program. Learn about opportunities to mentor local youth and make a difference in their lives.",
    attendees: 40,
    capacity: 80,
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
  },
  {
    id: 5,
    title: "Volunteer Appreciation Dinner",
    date: "2025-05-18",
    startTime: "18:00",
    endTime: "21:00",
    location: "Grand Hotel",
    organizer: "Leadership Team",
    description: "A special dinner to recognize and appreciate all our volunteers who have dedicated their time and effort to our cause throughout the year.",
    attendees: 75,
    capacity: 100,
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
  },
  {
    id: 6,
    title: "Community Health Fair",
    date: "2025-05-30",
    startTime: "10:00",
    endTime: "16:00",
    location: "Town Square",
    organizer: "Health Team",
    description: "Free health screenings, wellness information, and activities for the whole family. Local healthcare providers will be present to answer questions.",
    attendees: 60,
    capacity: 200,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
  },
];

// Filter options
const months = [
  "All",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
];

const Events = () => {
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("All");
  
  // Filter events based on search and month
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const eventMonth = new Date(event.date).toLocaleString('default', { month: 'long' });
    const matchesMonth = selectedMonth === "All" || eventMonth === selectedMonth;
    
    return matchesSearch && matchesMonth;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Upcoming Events</h1>
        
        {isAdmin && (
          <button className="inline-flex items-center gap-2 rounded-md bg-wfc-purple px-4 py-2 text-white transition-colors hover:bg-wfc-purple-dark">
            <Plus className="h-4 w-4" />
            <span>Create Event</span>
          </button>
        )}
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-4 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex h-10 items-center rounded-md border border-gray-200 bg-white">
            <button className="grid h-full w-10 place-items-center text-gray-500 hover:bg-gray-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="border-l border-r px-3 py-1">
              <span className="text-sm font-medium">April 2025</span>
            </div>
            <button className="grid h-full w-10 place-items-center text-gray-500 hover:bg-gray-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="relative">
            <button className="flex h-10 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-hidden rounded-lg">
        <div className="flex overflow-x-auto pb-3">
          <div className="flex gap-2">
            {months.map(month => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ${
                  selectedMonth === month
                    ? "bg-wfc-purple text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <div
                key={event.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-4">
                    <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                    <p className="text-sm text-white/80">Organized by {event.organizer}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-4 space-y-2 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Calendar className="mr-2 h-4 w-4 text-wfc-purple" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="mr-2 h-4 w-4 text-wfc-purple" />
                      {event.startTime} - {event.endTime}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="mr-2 h-4 w-4 text-wfc-purple" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="mr-2 h-4 w-4 text-wfc-purple" />
                      {event.attendees} / {event.capacity} attendees
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-gray-600 line-clamp-2">{event.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-wfc-purple"
                        style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button className="w-full rounded-md bg-wfc-purple py-2 text-sm font-medium text-white hover:bg-wfc-purple-dark">
                      {isAdmin ? "Manage Event" : "RSVP Now"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-gray-500">
              <Calendar className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-lg font-medium">No events found</h3>
              <p>Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
