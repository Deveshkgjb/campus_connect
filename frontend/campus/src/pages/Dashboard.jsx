import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return null;

  const cards = [
    {
      title: "View Students",
      description: "Browse students across different colleges.",
      action: () => navigate("/students"),
      roles: ["student", "startup"],
    },
    {
      title: "Explore Jobs",
      description: "Find job and internship opportunities.",
      action: () => navigate("/jobs"),
      roles: ["student"],
    },
    {
      title: "Post Jobs",
      description: "Add a new job or internship.",
      action: () => navigate("/jobs"),
      roles: ["startup"],
    },
    {
      title: "Find Partners",
      description: "Find student co-founders or technical partners.",
      action: () => navigate("/students"),
      roles: ["startup"],
    },
    {
      title: "AI Assistant 🤖",
      description: "Chat with your smart assistant.",
      action: () => navigate("/assistant"),
      roles: ["student", "startup"],
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800">
            Welcome, {user.name} 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Role: <strong>{user.role}</strong> | College: {user.college}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards
            .filter((card) => card.roles.includes(user.role))
            .map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-all"
                onClick={card.action}
              >
                <h3 className="text-lg font-semibold text-blue-800 mb-1">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600">{card.description}</p>
              </motion.div>
            ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="text-sm text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
}
