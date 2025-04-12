
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const ActivityModal = ({ isOpen, onClose, onSave, activity }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "Environment",
    date: "",
    location: "",
    hours: 2,
    description: "",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    status: "ongoing"
  });

  useEffect(() => {
    if (activity) {
      setFormData({
        title: activity.title || "",
        category: activity.category || "Environment",
        date: activity.date || "",
        location: activity.location || "",
        hours: activity.hours || 2,
        description: activity.description || "",
        image: activity.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        status: activity.status || "ongoing",
        participants: activity.participants || 0
      });
    } else {
      setFormData({
        title: "",
        category: "Environment",
        date: "",
        location: "",
        hours: 2,
        description: "",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        status: "ongoing",
        participants: 0
      });
    }
  }, [activity]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity) {
      onSave({ ...activity, ...formData });
    } else {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {activity ? "Edit Activity" : "Create New Activity"}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Activity Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
              >
                <option value="Environment">Environment</option>
                <option value="Education">Education</option>
                <option value="Community Service">Community Service</option>
                <option value="Health">Health</option>
                <option value="Arts">Arts</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Hours
              </label>
              <input
                type="number"
                name="hours"
                min="1"
                max="24"
                value={formData.hours}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="col-span-1 mb-4 md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="col-span-1 mb-4 md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
              />
              <p className="mt-1 text-xs text-gray-500">
                Leave empty to use default image
              </p>
            </div>
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
              {activity ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityModal;
