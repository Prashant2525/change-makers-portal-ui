
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Filter,
  Plus,
  Search,
  Trash2
} from "lucide-react";
import TaskModal from "@/components/modals/TaskModal";

// Mock data
const initialTasks = [
  {
    id: 1,
    title: "Update social media content",
    description: "Create and schedule posts for the upcoming community cleanup event",
    status: "pending",
    dueDate: "2025-04-15",
    priority: "high",
    adminOnly: false,
  },
  {
    id: 2,
    title: "Submit monthly report",
    description: "Compile and submit the monthly activity report",
    status: "pending",
    dueDate: "2025-04-18",
    priority: "medium",
    adminOnly: false,
  },
  {
    id: 3,
    title: "Review new member applications",
    description: "Review and approve pending membership applications",
    status: "pending",
    dueDate: "2025-04-20",
    priority: "low",
    adminOnly: true,
  },
  {
    id: 4,
    title: "Prepare for community meeting",
    description: "Create agenda and materials for upcoming meeting",
    status: "completed",
    dueDate: "2025-04-10",
    priority: "high",
    adminOnly: false,
  },
  {
    id: 5,
    title: "Contact local businesses for donations",
    description: "Reach out to at least 5 businesses for the fundraiser",
    status: "pending",
    dueDate: "2025-04-18",
    priority: "medium",
    adminOnly: false,
  },
  {
    id: 6,
    title: "Prepare monthly newsletter",
    description: "Compile stories and updates for the April newsletter",
    status: "completed",
    dueDate: "2025-04-10",
    priority: "medium",
    adminOnly: false,
  },
];

const Tasks = () => {
  const { isAdmin } = useAuth();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Filter tasks based on user role, status filter, and search term
  const filteredTasks = tasks
    .filter(task => isAdmin || !task.adminOnly) // Filter by role
    .filter(task => { // Filter by status
      if (filter === "all") return true;
      return task.status === filter;
    })
    .filter(task => { // Filter by search
      if (!searchTerm.trim()) return true;
      return task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             task.description.toLowerCase().includes(searchTerm.toLowerCase());
    });

  const handleStatusChange = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === "completed" ? "pending" : "completed" } 
        : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  const handleAddTask = (newTask) => {
    const highestId = Math.max(...tasks.map(task => task.id), 0);
    const taskToAdd = {
      id: highestId + 1,
      ...newTask,
      status: "pending"
    };
    
    setTasks([...tasks, taskToAdd]);
    setIsModalOpen(false);
  };
  
  const handleEditTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
    setIsModalOpen(false);
    setCurrentTask(null);
  };
  
  const openEditModal = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };
  
  const getPriorityBadgeClasses = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-amber-100 text-amber-600";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
        
        <button 
          onClick={() => {
            setCurrentTask(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-md bg-wfc-purple px-4 py-2 text-white transition-colors hover:bg-wfc-purple-dark"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Task</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-4 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
            />
          </div>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 rounded-md border border-gray-100 bg-white shadow-lg z-10">
              <div className="p-2">
                <button
                  onClick={() => {
                    setFilter("all");
                    setIsDropdownOpen(false);
                  }}
                  className={`block w-full rounded px-3 py-1.5 text-left text-sm ${filter === "all" ? "bg-wfc-purple text-white" : "hover:bg-gray-50"}`}
                >
                  All Tasks
                </button>
                <button
                  onClick={() => {
                    setFilter("pending");
                    setIsDropdownOpen(false);
                  }}
                  className={`block w-full rounded px-3 py-1.5 text-left text-sm ${filter === "pending" ? "bg-wfc-purple text-white" : "hover:bg-gray-50"}`}
                >
                  Pending
                </button>
                <button
                  onClick={() => {
                    setFilter("completed");
                    setIsDropdownOpen(false);
                  }}
                  className={`block w-full rounded px-3 py-1.5 text-left text-sm ${filter === "completed" ? "bg-wfc-purple text-white" : "hover:bg-gray-50"}`}
                >
                  Completed
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Task
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Priority
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <tr key={task.id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-500">{task.description}</div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityBadgeClasses(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      task.status === "completed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      {task.status === "completed" ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3" />
                          <span>Pending</span>
                        </>
                      )}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleStatusChange(task.id)}
                        className="text-wfc-purple hover:text-wfc-purple-dark"
                      >
                        {task.status === "completed" ? "Mark Incomplete" : "Mark Complete"}
                      </button>
                      
                      {(isAdmin || !task.adminOnly) && (
                        <>
                          <button
                            onClick={() => openEditModal(task)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                  <AlertCircle className="mx-auto mb-2 h-5 w-5" />
                  <p>No tasks found matching your criteria</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setCurrentTask(null);
        }} 
        onSave={currentTask ? handleEditTask : handleAddTask}
        task={currentTask}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default Tasks;
