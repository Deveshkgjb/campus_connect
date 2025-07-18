// src/api/jobApi.js
import axios from "axios";

const token = localStorage.getItem("token");

export const postJob = async (jobData) => {
  try {
    const res = await axios.post("http://localhost:5001/api/jobs", jobData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Job posted successfully!");
    return res.data;
  } catch (error) {
    console.error("Job posting error:", error);
    alert("Failed to post job.");
  }
};
