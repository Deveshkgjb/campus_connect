const express = require('express');
const cors = require('cors');
require('dotenv').config(); // ✅ First load env

const mongoose = require('mongoose');
 // ✅ Then require mongoose

const app = express();

app.use(cors());
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

  const jobRoutes=require("./routes/job.routes");
  app.use('/api/jobs',jobRoutes)


// API Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/students', require('./routes/student.routes'));
app.use('/api/startups', require('./routes/startup.routes'));

app.use('/api/applications', require('./routes/application.routes'));
app.use('/api/jobs', require('./routes/job.routes'));
app.use('/api/applications', require('./routes/application.routes'));
app.use('/api/applications', require('./routes/application.routes'));


// Health check route
app.get('/', (req, res) => res.send('Campus Connect Backend Running'));

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const startupRoutes = require('./routes/startup.routes');
app.use('/api/startups', startupRoutes);
 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

