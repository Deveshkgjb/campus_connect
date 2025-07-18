const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  jobId: String,
  cv: String,
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
