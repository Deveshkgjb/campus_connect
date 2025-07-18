import React, { useState } from "react";
import axios from "axios";

const StartupForm = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        ownerId: currentUser._id, // assuming user is logged in and role is 'startup'
      };

      const res = await axios.post("http://localhost:5001/api/startups/create", payload);

      if (res.data.success) {
        setSuccess(true);
        setFormData({
          name: "",
          description: "",
          website: "",
          location: "",
        });
      }
    } catch (err) {
      console.error("Failed to submit startup:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded-xl bg-white">
      <h2 className="text-xl font-bold mb-4">Register Your Startup 🚀</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Startup Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Startup Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
          required
        />

        <input
          type="url"
          name="website"
          placeholder="Website (https://...)"
          value={formData.website}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {success && (
        <p className="text-green-600 mt-4">Startup registered successfully! 🎉</p>
      )}
    </div>
  );
};

export default StartupForm;
