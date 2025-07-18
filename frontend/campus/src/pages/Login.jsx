import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // student, startup, jobs
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/auth/login", { email, password, role });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("login successful");
      navigate("/");
    } catch (err) {
      alert("invalid credentials");
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:5001/auth/google", "_self");
  };

  return (
    <motion.div className="flex justify-center items-center h-screen bg-gray-100"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg space-y-4 w-96">
        <h2 className="text-xl font-bold text-center mb-2">Login</h2>
        {/* Role Selector */}
        <div className="flex justify-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`px-3 py-1 rounded font-medium border ${role === 'student' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 border-gray-300'} transition`}
          >
            Student Login
          </button>
          <button
            type="button"
            onClick={() => setRole('startup')}
            className={`px-3 py-1 rounded font-medium border ${role === 'startup' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 border-gray-300'} transition`}
          >
            Startup Login
          </button>
          <button
            type="button"
            onClick={() => setRole('jobs')}
            className={`px-3 py-1 rounded font-medium border ${role === 'jobs' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 border-gray-300'} transition`}
          >
            Jobs Upload Login
          </button>
        </div>
        <div className="text-center text-sm text-gray-600 mb-2">
          Selected: <span className="font-semibold text-blue-700 capitalize">{role.replace('jobs', 'jobs upload')}</span>
        </div>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded" 
          placeholder="Email" 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded" 
          placeholder="Password" 
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">Login</button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 flex items-center justify-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" className="inline-block"><g><path fill="#4285F4" d="M43.6 20.5H42V20H24v8h11.3C34.7 32.1 30.1 35 24 35c-6.1 0-11.3-4.1-13.1-9.6S5.9 15.9 12 15.9c2.7 0 5.2.9 7.1 2.4l5.7-5.7C21.1 9.7 16.7 8 12 8 5.4 8 0 13.4 0 20s5.4 12 12 12c6.6 0 12-5.4 12-12 0-.8-.1-1.5-.2-2.2z"/><path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.2-5.1C29.1 35.7 26.7 36.5 24 36.5c-4.7 0-8.7-3.2-10.1-7.5H7.1v4.7C10.5 41.1 16.7 44 24 44z"/><path fill="#FBBC05" d="M13.9 29c-1.1-3.2-1.1-6.8 0-10l-4.7-3.7C6.1 18.7 4 22.1 4 26c0 3.9 2.1 7.3 5.2 9.7l4.7-3.7z"/><path fill="#EA4335" d="M24 8c3.7 0 7.1 1.3 9.7 3.5l7.3-7.3C36.1 1.6 30.4 0 24 0 16.7 0 10.5 2.9 7.1 7.3l4.7 3.7C15.3 9.2 19.3 8 24 8z"/></g></svg>
          Sign in with Google
        </button>
        <p className="text-center text-sm">
          New? <a href="/register" className="text-blue-600">Register here</a>
        </p>
      </form>
    </motion.div>
  );
}
