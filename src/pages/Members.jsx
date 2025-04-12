
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Search, 
  Plus, 
  Mail, 
  Calendar, 
  Trash2, 
  AlertCircle,
  UserPlus
} from "lucide-react";
import MemberModal from "@/components/modals/MemberModal";
import { Navigate } from "react-router-dom";

// Mock data for members
const initialMembers = [
  {
    id: 1,
    name: "John Doe",
    initials: "JD",
    email: "john.doe@example.com",
    role: "Volunteer",
    status: "active",
    joinedDate: "2024-11-15",
    lastActive: "2025-04-11"
  },
  {
    id: 2,
    name: "Jane Smith",
    initials: "JS",
    email: "jane.smith@example.com",
    role: "Coordinator",
    status: "active",
    joinedDate: "2024-08-05",
    lastActive: "2025-04-10"
  },
  {
    id: 3,
    name: "Mike Johnson",
    initials: "MJ",
    email: "mike.johnson@example.com",
    role: "Volunteer",
    status: "inactive",
    joinedDate: "2024-09-20",
    lastActive: "2025-01-25"
  },
  {
    id: 4,
    name: "Sarah Williams",
    initials: "SW",
    email: "sarah.williams@example.com",
    role: "Coordinator",
    status: "active",
    joinedDate: "2024-10-12",
    lastActive: "2025-04-09"
  },
  {
    id: 5,
    name: "David Brown",
    initials: "DB",
    email: "david.brown@example.com",
    role: "Volunteer",
    status: "inactive",
    joinedDate: "2024-12-03",
    lastActive: "2025-02-15"
  },
  {
    id: 6,
    name: "Emily Davis",
    initials: "ED",
    email: "emily.davis@example.com",
    role: "Volunteer",
    status: "active",
    joinedDate: "2025-01-20",
    lastActive: "2025-04-12"
  }
];

const calculateInactiveDays = (lastActiveDate) => {
  const last = new Date(lastActiveDate);
  const today = new Date();
  return Math.floor((today - last) / (1000 * 60 * 60 * 24));
};

const Members = () => {
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState(initialMembers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  
  // Redirect if not admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const filteredMembers = members.filter(member => {
    if (!searchTerm) return true;
    
    return member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.role.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  const handleAddMember = (newMember) => {
    const highestId = Math.max(...members.map(member => member.id), 0);
    const memberToAdd = {
      id: highestId + 1,
      ...newMember,
      status: "active",
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0]
    };
    
    setMembers([...members, memberToAdd]);
    setIsModalOpen(false);
  };
  
  const handleRemoveMember = (memberId) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      setMembers(members.filter(member => member.id !== memberId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Members Management</h1>
        <p className="text-gray-500">View, add, and manage organization members</p>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-4 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
          />
        </div>
        
        <button 
          onClick={() => {
            setCurrentMember(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 rounded-md bg-wfc-purple px-4 py-2 text-white transition-colors hover:bg-wfc-purple-dark"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add Member</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {filteredMembers.length > 0 ? (
          filteredMembers.map(member => {
            const inactiveDays = calculateInactiveDays(member.lastActive);
            const isInactiveWarning = member.status === "inactive" || inactiveDays > 30;
            
            return (
              <div 
                key={member.id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`grid h-12 w-12 place-items-center rounded-md bg-wfc-purple text-white ${member.status === "inactive" ? "opacity-60" : ""}`}>
                      {member.initials}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900">{member.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Mail className="h-3 w-3" />
                        <span>{member.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-auto flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>Joined {new Date(member.joinedDate).toLocaleDateString()}</span>
                    </div>
                    
                    {isInactiveWarning && (
                      <div className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">
                        {inactiveDays} days inactive
                      </div>
                    )}

                    <span className={`rounded-full px-3 py-1 text-xs ${
                      member.status === "active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {member.status === "active" ? "Active" : "Inactive"}
                    </span>

                    <div className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800">
                      {member.role}
                    </div>
                    
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <AlertCircle className="mb-4 h-12 w-12 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900">No members found</h3>
            <p className="text-gray-500">Try adjusting your search or add new members</p>
          </div>
        )}
      </div>
      
      <MemberModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentMember(null);
        }}
        onSave={handleAddMember}
      />
    </div>
  );
};

export default Members;
