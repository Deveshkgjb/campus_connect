import { useState } from "react";

export default function UserInfo() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });

  function getInitials(name) {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  }

  function handleUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (ev) {
        const updatedUser = { ...user, profilePic: ev.target.result };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      };
      reader.readAsDataURL(file);
    }
  }

  if (!user || !user.name) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="bg-white text-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 w-full max-w-md">
        <div className="flex items-center gap-3 mb-6">
          {user.profilePic
            ? <img src={user.profilePic} alt="avatar" className="w-16 h-16 rounded-full object-cover" />
            : <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-2xl">{getInitials(user.name)}</div>
          }
          <div>
            <div className="font-semibold text-lg">{user.name || "User"}</div>
            <div className="text-xs text-gray-500">{user.email || "No email"}</div>
          </div>
        </div>
        <div className="mb-4">
          <div className="font-medium text-sm">Skills:</div>
          <div className="text-xs text-gray-700">{Array.isArray(user.skills) ? user.skills.join(", ") : user.skills || "N/A"}</div>
        </div>
        {/* Upload button (for profile pic) */}
        <label className="block mt-4">
          <span className="text-xs font-medium">Upload Profile Picture</span>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-xs mt-1"
            onChange={handleUpload}
          />
        </label>
      </div>
    </div>
  );
}
    
