const express = require('express');
const User = require('../models/user');
const startup = require('../models/startup');
const router = express.Router();

router.put("/update/:id", async (req, res) => {
    const updated = await startup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  });
  

// Get all students
router.get('/all', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
