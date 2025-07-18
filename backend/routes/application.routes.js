const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const fs = require('fs');

// Upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = 'uploads/cvs';
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + file.originalname;
    cb(null, unique);
  }
});
const upload = multer({ storage });

// Mongo model
const Application = require('../models/Application');

// POST: Student apply to job
router.post('/apply', upload.single('cv'), async (req, res) => {
  try {
    const { name, email, phone, jobId } = req.body;
    const cvPath = req.file ? req.file.path : '';

    const application = new Application({
      name,
      email,
      phone,
      jobId,
      cv: cvPath,
    });

    await application.save();
    res.status(201).json({ message: "Application submitted" });
  } catch (error) {
    console.error("Application error:", error);
    res.status(500).json({ message: "Failed to apply" });
  }
});

module.exports = router;
