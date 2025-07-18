const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'startup'], default: 'student' },
  college: String,
  skills: [String],
  bio: String,
  // optionally: cv, linkedin, github
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
