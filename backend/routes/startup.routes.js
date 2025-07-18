// routes/startup.routes.js
const express = require('express');
const router = express.Router();
const Startup = require('../models/Startup');
const StartupRegister = require('../models/StartupRegister');
const User = require('../models/User');

// 1. Create a new startup (startup person)
router.post('/create', async (req, res) => {
  try {
    const { name, description, website, location, ownerId } = req.body;
    const startup = new Startup({ name, description, website, location, ownerId });
    await startup.save();
    res.json({ success: true, startup });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create startup' });
  }
});

// 2. Get all startups (students can see)
router.get('/', async (req, res) => {
  const startups = await Startup.find();
  res.json(startups);
});

// 3. Apply to a startup (student)
router.post('/apply', async (req, res) => {
  try {
    const { studentId, startupId, message } = req.body;
    const application = new StartupRegister({ studentId, startupId, message });
    await application.save();
    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: 'Application failed' });
  }
});

// 4. Startup person sees who applied
router.get('/applicants/:startupId', async (req, res) => {
  const { startupId } = req.params;
  const applications = await StartupRegister.find({ startupId }).populate('studentId');
  res.json(applications); // includes full student bio
});

module.exports = router;
