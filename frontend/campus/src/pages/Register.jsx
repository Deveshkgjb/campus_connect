import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    college: "",
    skills: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const payload = { ...formData, skills: formData.skills.split(",") };
      await axios.post("http://localhost:5001/api/auth/register", payload);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => {
        if (formData.role === 'jobs') {
          navigate("/startup-form");
        } else {
          navigate("/login");
        }
      }, 1500);
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-2xl space-y-5 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">Register</h2>
        {/* Role Selector */}
        <div className="flex justify-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => handleRoleChange('student')}
            className={`px-4 py-2 rounded-full font-medium border ${formData.role === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 border-gray-300'} transition`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('startup')}
            className={`px-4 py-2 rounded-full font-medium border ${formData.role === 'startup' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 border-gray-300'} transition`}
          >
            Startup
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('jobs')}
            className={`px-4 py-2 rounded-full font-medium border ${formData.role === 'jobs' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 border-gray-300'} transition`}
          >
            Jobs Upload
          </button>
        </div>
        <div className="text-center text-sm text-gray-600 mb-2">
          Selected: <span className="font-semibold text-blue-700 capitalize">{formData.role.replace('jobs', 'jobs upload')}</span>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {/* Show college only for students */}
        {formData.role === 'student' && (
          <input
            type="text"
            name="college"
            placeholder="College"
            value={formData.college}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        )}
        {/* Show skills for student and jobs upload */}
        {(formData.role === 'student' || formData.role === 'jobs') && (
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={formData.skills}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        )}
        {success && <div className="text-green-600 text-center font-medium">{success}</div>}
        {error && <div className="text-red-600 text-center font-medium">{error}</div>}
        <button
          className="bg-blue-600 text-white px-4 py-3 rounded w-full hover:bg-blue-700 font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </motion.div>
  );
}