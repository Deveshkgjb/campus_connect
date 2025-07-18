// routes/job.routes.js
const express = require("express");
const router = express.Router();
const Job = require("../models/job"); // adjust path if needed

// ✅ GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find(); // or add filters later
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

module.exports = router;
