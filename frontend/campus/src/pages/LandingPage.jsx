import { Link } from "react-router-dom";
import StartupLanding from "../startup/StartupLanding";
import StudentLanding from "../Students/StudentLanding";

export default function LandingPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isStartup = user?.role === "startup";

  if (!user) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        padding: "2rem"
      }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 700, marginBottom: "1rem" }}>
          Welcome to Sharda Campus Portal
        </h1>
        <p style={{ fontSize: "1.25rem", maxWidth: 600, textAlign: "center", marginBottom: "2rem" }}>
          Discover jobs, connect with startups, and manage your campus journey all in one place. Whether you're a student or a startup, we've got you covered!
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/login" style={{
            background: "#fff",
            color: "#764ba2",
            padding: "0.75rem 2rem",
            borderRadius: "30px",
            fontWeight: 600,
            textDecoration: "none",
            fontSize: "1.1rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            Login
          </Link>
          <Link to="/register" style={{
            background: "#764ba2",
            color: "#fff",
            padding: "0.75rem 2rem",
            borderRadius: "30px",
            fontWeight: 600,
            textDecoration: "none",
            fontSize: "1.1rem",
            border: "2px solid #fff"
          }}>
            Register
          </Link>
        </div>
      </div>
    );
  }

  return isStartup ? <StartupLanding /> : <StudentLanding />;
}
