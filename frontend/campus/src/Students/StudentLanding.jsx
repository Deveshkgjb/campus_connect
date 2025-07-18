import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function StudentLanding() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  function getInitials(name) {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  }

  // Animated count-up for stats
  function useCountUp(end, duration = 1200) {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let start = 0;
      const increment = end / (duration / 16);
      let raf;
      function update() {
        start += increment;
        if (start < end) {
          setCount(Math.floor(start));
          raf = requestAnimationFrame(update);
        } else {
          setCount(end);
        }
      }
      update();
      return () => cancelAnimationFrame(raf);
    }, [end, duration]);
    return count;
  }

  const stats = [
    { title: "Active Students", value: 50000 },
    { title: "Partner Companies", value: 2500 },
    { title: "Universities", value: 800 },
    { title: "Job Opportunities", value: 15000 },
  ];

  const featureCards = [
    {
      title: "Explore Colleges",
      desc: "Discover top universities and their programs",
      icon: (
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="url(#grad1)" /><path d="M7 10l5-3 5 3-5 3-5-3z" fill="#fff" /><defs><linearGradient id="grad1" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#667eea"/><stop offset="1" stopColor="#764ba2"/></linearGradient></defs></svg>
      ),
      onClick: () => navigate("/colleges"),
    },
    {
      title: "Join Startups",
      desc: "Connect with innovative startup companies",
      icon: (
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="url(#grad2)" /><path d="M12 7v5l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><defs><linearGradient id="grad2" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#ffb347"/><stop offset="1" stopColor="#ffcc33"/></linearGradient></defs></svg>
      ),
      onClick: () => navigate("/startups")
    },
    {
      title: "Find Jobs",
      desc: "Browse thousands of career opportunities",
      icon: (
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="url(#grad3)" /><path d="M8 12h8M8 16h8M8 8h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><defs><linearGradient id="grad3" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#43cea2"/><stop offset="1" stopColor="#185a9d"/></linearGradient></defs></svg>
      ),
      onClick: () => navigate("/jobs")
    },
    {
      title: "Network",
      desc: "Connect with fellow students and professionals",
      icon: (
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="url(#grad4)" /><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#fff"/><defs><linearGradient id="grad4" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#ff6a00"/><stop offset="1" stopColor="#ee0979"/></linearGradient></defs></svg>
      ),
      onClick: () => navigate("/students")
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 font-sans flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-16 md:py-24 relative z-10">
        {/* Left: Headline & CTA */}
        <div className="md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome, <span className="text-yellow-300">{user?.name?.split(" ")[0] || "Student"}</span>!
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-white/90 mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Your campus journey starts here. Discover, connect, and grow with opportunities tailored for you.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              className="bg-gradient-to-r from-yellow-300 to-pink-400 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition text-lg"
              onClick={() => navigate("/jobs")}
            >
              Find Jobs
            </button>
            <button
              className="bg-white/20 border border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/30 transition text-lg"
              onClick={() => navigate("/colleges")}
            >
              Explore Colleges
            </button>
          </div>
        </div>
        {/* Right: SVG Illustration */}
        <div className="md:w-1/2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative"
          >
            <svg width="320" height="240" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="160" cy="200" rx="120" ry="30" fill="#fff" fillOpacity="0.15" />
              <rect x="60" y="60" width="200" height="100" rx="30" fill="url(#paint0_linear)" />
              <circle cx="100" cy="110" r="18" fill="#fff" fillOpacity="0.7" />
              <rect x="140" y="90" width="80" height="16" rx="8" fill="#fff" fillOpacity="0.5" />
              <rect x="140" y="120" width="60" height="12" rx="6" fill="#fff" fillOpacity="0.3" />
              <defs>
                <linearGradient id="paint0_linear" x1="60" y1="60" x2="260" y2="160" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#667eea" />
                  <stop offset="1" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
            {/* Glassmorphism User Card */}
            <motion.div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl px-8 py-4 flex flex-col items-center border border-white/40"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg mb-2 border-4 border-white/40">
                {getInitials(user?.name)}
              </div>
              <div className="text-lg font-semibold text-white drop-shadow mb-1">{user?.name || "Student User"}</div>
              <div className="text-sm text-white/80 mb-2">{user?.email || "student@email.com"}</div>
              <div className="flex gap-3">
                <button className="bg-white/20 border border-white text-white px-4 py-1 rounded-full text-xs hover:bg-white/30 transition" onClick={() => navigate("/profile")}>Profile</button>
                <button className="bg-white/20 border border-white text-white px-4 py-1 rounded-full text-xs hover:bg-white/30 transition" onClick={() => navigate("/dashboard")}>Dashboard</button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-16 px-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            className="bg-white/20 rounded-2xl p-8 shadow-lg backdrop-blur-md border border-white/30"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
          >
            <div className="text-3xl md:text-4xl font-extrabold text-white mb-2">
              {useCountUp(stat.value).toLocaleString()}+
            </div>
            <div className="text-md md:text-lg text-white/80">{stat.title}</div>
          </motion.div>
        ))}
      </div>

      {/* Feature Grid */}
      <div className="bg-white/90 py-16 px-6 rounded-t-3xl shadow-2xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-10">What can you do?</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureCards.map((card, i) => (
            <motion.div
              whileHover={{ scale: 1.07, boxShadow: "0 8px 32px rgba(76, 81, 255, 0.15)" }}
              key={i}
              className="bg-gradient-to-br from-white via-gray-50 to-purple-100 border border-purple-100 p-8 rounded-2xl shadow-lg flex flex-col items-center text-center cursor-pointer hover:shadow-2xl transition"
              onClick={card.onClick}
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="font-semibold text-xl text-purple-700 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-gradient-to-r from-purple-700 to-pink-500 text-white text-center">
        <div className="mb-2 font-bold text-lg">Sharda Campus Portal</div>
        <div className="mb-2">Empowering students to connect, collaborate, and create their future.</div>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:text-yellow-300 transition">Twitter</a>
          <a href="#" className="hover:text-yellow-300 transition">LinkedIn</a>
          <a href="#" className="hover:text-yellow-300 transition">Instagram</a>
        </div>
        <div className="mt-2 text-xs text-white/70">&copy; {new Date().getFullYear()} Sharda Campus. All rights reserved.</div>
      </footer>
    </div>
  );
}
