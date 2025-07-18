import { useState } from "react";
import axios from "axios";

export default function JobApplication({ jobId }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cv: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [cvName, setCvName] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "cv" && files && files[0]) {
      setFormData((prev) => ({ ...prev, cv: files[0] }));
      setCvName(files[0].name);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.cv) {
      setError("Please fill all fields and upload your CV.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("cv", formData.cv);
    data.append("jobId", jobId);

    try {
      await axios.post("http://localhost:5001/api/applications/apply", data);
      setSuccess("Application Submitted!");
      setFormData({ name: "", email: "", phone: "", cv: null });
      setCvName("");
    } catch (err) {
      setError("Failed to apply. Please try again.");
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Apply for this Job</h2>
      {success && <div className="mb-4 text-green-600 font-medium text-center">{success}</div>}
      {error && <div className="mb-4 text-red-600 font-medium text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Upload CV</label>
          <input
            type="file"
            name="cv"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            required
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {cvName && <div className="text-xs text-gray-600 mt-1">Selected: {cvName}</div>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded bg-blue-600 text-white font-semibold transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {loading ? "Submitting..." : "Apply Now"}
        </button>
      </form>
    </div>
  );
}
