import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function StartupLanding() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  function getInitials(name) {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  }

  const startupCards = [
    {
      title: "Post Jobs",
      desc: "List job openings for students and colleges",
      icon: "📢",
      onClick: () => navigate("/jobs/post"),
    },
    {
      title: "View Applicants",
      desc: "Check who applied to your jobs",
      icon: "📄",
      onClick: () => navigate("/applicants"),
    },
    {
      title: "Connect with Colleges",
      desc: "Build partnerships with universities",
      icon: "🏫",
      onClick: () => navigate("/colleges"),
    },
    {
      title: "Analytics",
      desc: "See engagement & applicant insights",
      icon: "📊",
      onClick: () => navigate("/dashboard"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-pink-600 text-white font-sans">
      {/* Navbar */}
      <div className="flex items-center justify-between px-8 py-4 bg-white/10 backdrop-blur-md shadow-md">
        <h1 className="text-xl font-bold flex items-center gap-2 text-white">
          🚀 Startup Panel
        </h1>
        <nav className="flex gap-6 text-sm text-white">
          <a href="/dashboard">Dashboard</a>
          <a href="/jobs/post">Post Jobs</a>
          <a href="/applicants">Applicants</a>
          <a href="/colleges">Colleges</a>
          <a href="/jobs">Jobs</a> {/* ✅ Newly Added Link */}
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-sm">{user?.email}</span>
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white font-bold">
            {getInitials(user?.name)}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center px-4 py-12 md:py-20">
        <motion.h1
          className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome, {user?.name || "Founder"}!
        </motion.h1>
        <p className="text-md md:text-lg text-white/90 max-w-xl mx-auto">
          Manage your hiring, connect with colleges, and grow your startup.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="bg-white text-gray-800 py-12 px-6 rounded-t-3xl">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {startupCards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 p-6 border border-gray-200 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              onClick={card.onClick}
            >
              <div className="text-3xl mb-2">{card.icon}</div>
              <h3 className="font-semibold text-lg">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
