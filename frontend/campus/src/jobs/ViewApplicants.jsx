import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewApplicants() {
  const [applicants, setApplicants] = useState([]);
  const { jobId } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/applications/job/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setApplicants(res.data))
    .catch(err => console.error(err));
  }, [jobId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Applicants</h2>
      {applicants.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="grid gap-4">
          {applicants.map((app) => (
            <div key={app._id} className="bg-white shadow p-4 rounded">
              <p><strong>Name:</strong> {app.student.name}</p>
              <p><strong>Email:</strong> {app.student.email}</p>
              <p><strong>College:</strong> {app.student.college}</p>
              <p><strong>Skills:</strong> {app.student.skills?.join(', ')}</p>
              <p className="text-sm text-gray-500">Applied At: {new Date(app.appliedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
