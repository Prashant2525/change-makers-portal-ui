
import { useAuth } from "@/contexts/AuthContext";
import {
  Clock,
  Calendar,
  Award,
  ArrowUp,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, isAdmin } = useAuth();

  // Mock data
  const upcomingEvents = [
    {
      id: 1,
      title: "Beach Cleanup Drive",
      date: "2025-04-20",
      location: "Sunny Beach",
    },
    {
      id: 2,
      title: "Fundraising Workshop",
      date: "2025-04-25",
      location: "Community Center",
    },
  ];

  const pendingTasks = [
    {
      id: 101,
      title: "Complete volunteer survey",
      dueDate: "2025-04-15",
      priority: "High",
    },
    {
      id: 102,
      title: "Submit monthly report",
      dueDate: "2025-04-18",
      priority: "Medium",
    },
    {
      id: 103,
      title: "Review new member applications",
      dueDate: "2025-04-20",
      priority: "Low",
      adminOnly: true,
    },
  ];

  const activityStats = [
    { value: 24, label: "Hours Contributed" },
    { value: 8, label: "Events Attended" },
    { value: 12, label: "Tasks Completed" },
  ];

  // Filter tasks based on user role
  const filteredTasks = isAdmin
    ? pendingTasks
    : pendingTasks.filter(task => !task.adminOnly);

  return (
    <div className="space-y-6">
      <div className="animate-fade-in rounded-2xl bg-gradient-to-r from-wfc-purple to-wfc-purple-light p-6 text-white">
        <h2 className="text-2xl font-bold">
          Welcome back, {user?.name}!
        </h2>
        <p className="mt-1 opacity-90">
          {isAdmin
            ? "Monitor your organization's activities and manage resources."
            : "Track your contributions and stay updated with upcoming events."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activityStats.map((stat, index) => (
          <div key={index} className="stat-card animate-scale-in">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-medium text-green-600">
              <ArrowUp className="h-3 w-3" />
              <span>12% increase</span>
              <span className="text-gray-500">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="dashboard-card">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-wfc-purple" />
              <h3 className="text-lg font-semibold">Pending Tasks</h3>
            </div>
            <Link to="/tasks" className="text-sm font-medium text-wfc-purple hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredTasks.length === 0 ? (
              <p className="py-4 text-center text-gray-500">No pending tasks</p>
            ) : (
              filteredTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500">Due {task.dueDate}</p>
                  </div>
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium 
                      ${task.priority === "High" ? "bg-red-100 text-red-600" : ""} 
                      ${task.priority === "Medium" ? "bg-amber-100 text-amber-600" : ""}
                      ${task.priority === "Low" ? "bg-green-100 text-green-600" : ""}
                    `}
                  >
                    {task.priority}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-wfc-purple" />
              <h3 className="text-lg font-semibold">Upcoming Events</h3>
            </div>
            <Link to="/events" className="text-sm font-medium text-wfc-purple hover:underline">
              View All
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.location}</p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-wfc-purple" />
            <h3 className="text-lg font-semibold">Top Contributors</h3>
          </div>
          <Link to="/leaderboard" className="text-sm font-medium text-wfc-purple hover:underline">
            Full Leaderboard
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { name: "Alex Johnson", hours: 48, position: 1 },
            { name: "Maria Garcia", hours: 42, position: 2 },
            { name: "David Kim", hours: 36, position: 3 },
          ].map((contributor, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3"
            >
              <div
                className={`grid h-9 w-9 place-content-center rounded-full text-white 
                  ${i === 0 ? "bg-yellow-500" : ""} 
                  ${i === 1 ? "bg-gray-400" : ""}
                  ${i === 2 ? "bg-amber-700" : ""}
                `}
              >
                {contributor.position}
              </div>
              <div>
                <p className="font-medium">{contributor.name}</p>
                <p className="text-sm text-gray-500">{contributor.hours} hours</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isAdmin && (
        <div className="dashboard-card bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
            <div>
              <h3 className="text-lg font-semibold">Admin Quick Actions</h3>
              <p className="text-gray-500">Manage organization settings and resources</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="primary-btn">
                Add New Member
              </button>
              <button className="secondary-btn">
                Generate Reports
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
