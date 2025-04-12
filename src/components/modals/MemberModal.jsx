
import { useState } from "react";
import { X } from "lucide-react";

const MemberModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Volunteer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate initials from name
    const nameParts = formData.name.split(' ');
    let initials = '';
    
    if (nameParts.length >= 2) {
      initials = nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0);
    } else {
      initials = nameParts[0].substring(0, 2);
    }
    
    onSave({
      ...formData,
      initials: initials.toUpperCase(),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add New Member</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
              required
            />
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
            >
              <option value="Volunteer">Volunteer</option>
              <option value="Coordinator">Coordinator</option>
              <option value="Manager">Manager</option>
              <option value="Administrator">Administrator</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-wfc-purple px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-wfc-purple-dark"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberModal;
