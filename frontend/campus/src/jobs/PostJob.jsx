import React, { useState } from "react";
import { postJob } from "../api/JobApi";

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = {
      ...formData,
      skills: formData.skills.split(",").map((s) => s.trim()),
    };
    await postJob(jobData);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" onChange={handleChange} placeholder="Job Title" className="w-full p-2 border rounded" />
        <input name="company" onChange={handleChange} placeholder="Company Name" className="w-full p-2 border rounded" />
        <input name="location" onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded" />
        <textarea name="description" onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" />
        <input name="skills" onChange={handleChange} placeholder="Skills (comma separated)" className="w-full p-2 border rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Post Job</button>
      </form>
    </div>
  );
}
