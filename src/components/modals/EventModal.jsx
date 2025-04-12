
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const EventModal = ({ isOpen, onClose, onSave, event }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "09:00",
    endTime: "12:00",
    location: "",
    organizer: "",
    description: "",
    capacity: 50,
    image: "https://images.unsplash.com/photo-1618886614638-80e3c103d465?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        date: event.date || "",
        startTime: event.startTime || "09:00",
        endTime: event.endTime || "12:00",
        location: event.location || "",
        organizer: event.organizer || "",
        description: event.description || "",
        capacity: event.capacity || 50,
        image: event.image || "",
        attendees: event.attendees || 0
      });
    } else {
      setFormData({
        title: "",
        date: "",
        startTime: "09:00",
        endTime: "12:00",
        location: "",
        organizer: "",
        description: "",
        capacity: 50,
        image: "https://images.unsplash.com/photo-1618886614638-80e3c103d465?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
        attendees: 0
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (event) {
      onSave({ ...event, ...formData });
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
            {event ? "Edit Event" : "Create New Event"}
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
                Event Title
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
                Organizer
              </label>
              <input
                type="text"
                name="organizer"
                value={formData.organizer}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
                required
              />
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

            <div className="mb-4 grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
                  required
                />
              </div>
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
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-wfc-purple focus:outline-none focus:ring-1 focus:ring-wfc-purple"
                required
              />
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
              {event ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
