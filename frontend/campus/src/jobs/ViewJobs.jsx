import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5001/api/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.error("Error fetching jobs", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">Available Jobs</h2>
      {jobs.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No jobs available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {jobs.map(job => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 flex flex-col gap-2 hover:shadow-2xl transition cursor-pointer"
              onClick={() => navigate(`/jobs/${job._id}`)}
            >
              <h3 className="text-xl font-bold text-blue-700 mb-1">{job.title}</h3>
              <div className="text-sm text-gray-600 mb-2">{job.company}</div>
              <div className="text-gray-700 mb-2">{job.description}</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {Array.isArray(job.skills) && job.skills.map((skill, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">{skill}</span>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-auto">Posted by: <span className="font-medium">{job.postedBy?.companyName || job.postedBy?.name || "Unknown"}</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
