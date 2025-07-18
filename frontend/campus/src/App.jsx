import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import CollegesList from "./pages/CollegesList";
import PrivateRoute from "./components/PrivateRoute";
import UserProfilePage from "./pages/UserProfilePage";
import StartupList from "./startup/StartupList";
import PostJob from "./jobs/PostJob";
import ViewJobs from "./jobs/ViewJobs";
import ViewApplicants from "./jobs/ViewApplicants";
import JobDetail from "./jobs/JobDetail";

function App() {
  const user = localStorage.getItem("user");

  return (
    <BrowserRouter>
      <Routes>
        {/* 🌐 Public Landing Page */}
        <Route path="/" element={<LandingPage />} />
        {/* 🔐 Auth Routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/dashboard" />}
        />

        {/* All other routes are protected */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/colleges"
          element={
            <PrivateRoute>
              <CollegesList />
            </PrivateRoute>
          }
        />
        <Route
          path="/startups"
          element={
            <PrivateRoute>
              <StartupList />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs/post"
          element={
            <PrivateRoute>
              <PostJob />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <ViewJobs />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs/:jobId"
          element={
            <PrivateRoute>
              <JobDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/applicants/:jobId"
          element={
            <PrivateRoute>
              <ViewApplicants />
            </PrivateRoute>
          }
        />
        {/* Catch-all: redirect unknown routes to login or dashboard */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
