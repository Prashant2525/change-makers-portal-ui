
import { useState } from "react";
import { Trophy, Award, Search, Users, Clock } from "lucide-react";

// Mock data for leaderboard
const leaderboardData = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    hours: 48,
    activities: 15,
    tasks: 22,
    joined: "2024-01-15",
    rank: 1,
  },
  {
    id: 2,
    name: "Maria Garcia",
    avatar: "https://i.pravatar.cc/150?img=5",
    hours: 42,
    activities: 12,
    tasks: 18,
    joined: "2024-02-03",
    rank: 2,
  },
  {
    id: 3,
    name: "David Kim",
    avatar: "https://i.pravatar.cc/150?img=8",
    hours: 36,
    activities: 10,
    tasks: 16,
    joined: "2023-11-20",
    rank: 3,
  },
  {
    id: 4,
    name: "Sarah Williams",
    avatar: "https://i.pravatar.cc/150?img=9",
    hours: 32,
    activities: 9,
    tasks: 14,
    joined: "2023-12-05",
    rank: 4,
  },
  {
    id: 5,
    name: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=11",
    hours: 30,
    activities: 8,
    tasks: 13,
    joined: "2024-01-28",
    rank: 5,
  },
  {
    id: 6,
    name: "Jessica Taylor",
    avatar: "https://i.pravatar.cc/150?img=10",
    hours: 28,
    activities: 8,
    tasks: 12,
    joined: "2023-10-15",
    rank: 6,
  },
  {
    id: 7,
    name: "Robert Brown",
    avatar: "https://i.pravatar.cc/150?img=12",
    hours: 26,
    activities: 7,
    tasks: 11,
    joined: "2024-02-10",
    rank: 7,
  },
  {
    id: 8,
    name: "Emily Davis",
    avatar: "https://i.pravatar.cc/150?img=6",
    hours: 24,
    activities: 7,
    tasks: 10,
    joined: "2023-09-22",
    rank: 8,
  },
  {
    id: 9,
    name: "Thomas Wilson",
    avatar: "https://i.pravatar.cc/150?img=15",
    hours: 22,
    activities: 6,
    tasks: 9,
    joined: "2024-01-05",
    rank: 9,
  },
  {
    id: 10,
    name: "Lisa Martinez",
    avatar: "https://i.pravatar.cc/150?img=7",
    hours: 20,
    activities: 6,
    tasks: 8,
    joined: "2023-11-30",
    rank: 10,
  },
];

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"hours" | "activities" | "tasks">("hours");
  
  // Sort and filter leaderboard data
  const filteredData = leaderboardData
    .filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b[sortBy] - a[sortBy])
    .map((member, index) => ({ ...member, rank: index + 1 }));
  
  // Top 3 members for highlight
  const topThree = filteredData.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
        
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-4 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
          />
        </div>
      </div>
      
      <div className="rounded-xl bg-gradient-to-r from-wfc-purple to-wfc-purple-light p-6 text-white">
        <h2 className="mb-6 text-center text-xl font-semibold">Top Contributors</h2>
        <div className="flex flex-col items-center justify-center gap-8 sm:flex-row">
          {topThree.map((member, index) => (
            <div 
              key={member.id} 
              className={`flex flex-col items-center ${
                index === 0 ? "order-2 transform scale-110" : index === 1 ? "order-1" : "order-3"
              }`}
            >
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-20 w-20 rounded-full border-4 border-white object-cover"
                />
                <div 
                  className={`absolute -bottom-2 -right-2 grid h-8 w-8 place-content-center rounded-full text-sm font-bold ${
                    index === 0 
                      ? "bg-yellow-500 text-yellow-900" 
                      : index === 1 
                        ? "bg-gray-300 text-gray-800" 
                        : "bg-amber-700 text-amber-100"
                  }`}
                >
                  {member.rank}
                </div>
              </div>
              <h3 className="mt-3 font-semibold">{member.name}</h3>
              <p className="text-white/80">
                {member.hours} hours
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex gap-2 border-b p-4">
          <button
            onClick={() => setSortBy("hours")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium ${
              sortBy === "hours" ? "bg-wfc-purple text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Clock className="h-4 w-4" />
            Hours
          </button>
          <button
            onClick={() => setSortBy("activities")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium ${
              sortBy === "activities" ? "bg-wfc-purple text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Users className="h-4 w-4" />
            Activities
          </button>
          <button
            onClick={() => setSortBy("tasks")}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium ${
              sortBy === "tasks" ? "bg-wfc-purple text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Trophy className="h-4 w-4" />
            Tasks
          </button>
        </div>
        
        <div className="divide-y">
          {filteredData.map(member => (
            <div 
              key={member.id}
              className="flex items-center justify-between gap-4 p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="text-lg font-bold text-gray-400">
                  {member.rank}
                </div>
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">
                    Joined {new Date(member.joined).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="hidden items-center gap-6 md:flex">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold">{member.hours}</span>
                  <span className="text-sm text-gray-500">hours</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold">{member.activities}</span>
                  <span className="text-sm text-gray-500">activities</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-gray-500" />
                  <span className="font-semibold">{member.tasks}</span>
                  <span className="text-sm text-gray-500">tasks</span>
                </div>
              </div>
              
              <div className="md:hidden">
                <div className="flex items-center gap-1.5">
                  {sortBy === "hours" && (
                    <>
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="font-semibold">{member.hours}</span>
                      <span className="text-sm text-gray-500">hours</span>
                    </>
                  )}
                  {sortBy === "activities" && (
                    <>
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="font-semibold">{member.activities}</span>
                      <span className="text-sm text-gray-500">activities</span>
                    </>
                  )}
                  {sortBy === "tasks" && (
                    <>
                      <Trophy className="h-4 w-4 text-gray-500" />
                      <span className="font-semibold">{member.tasks}</span>
                      <span className="text-sm text-gray-500">tasks</span>
                    </>
                  )}
                </div>
              </div>
              
              {member.rank <= 3 && (
                <Award className={`h-5 w-5 ${
                  member.rank === 1 ? "text-yellow-500" : 
                  member.rank === 2 ? "text-gray-400" : "text-amber-700"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
