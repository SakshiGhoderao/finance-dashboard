import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { role, currentUser, transactions } = useAuth();
  const { darkMode, setDarkMode } = useTheme();

  const isAdmin = role === "admin";

  // Simple function to simulate data export
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transactions));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "transactions_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    alert("Exporting all platform data...");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px" }}>
      <h1 style={{ marginBottom: "20px", fontWeight: "800" }}>Settings</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        
        {/* LEFT COLUMN: BASIC SETTINGS */}
        <div>
          {/* PROFILE CARD */}
          <div style={cardStyle}>
            <h3 style={{ color: "#3b82f6", marginBottom: "15px" }}>Profile Info</h3>
            <p><b>Name:</b> {isAdmin ? "System Admin" : (currentUser?.name || "User")}</p>
            <p><b>Role:</b> <span style={{ textTransform: "uppercase", fontSize: "0.8rem", color: "#6366f1" }}>{role}</span></p>
          </div>

          {/* THEME TOGGLE */}
          <div style={cardStyle}>
            <h3 style={{ marginBottom: "15px" }}>Appearance</h3>
            <button
              style={{
                ...buttonStyle,
                width: "100%",
                background: darkMode ? "#111827" : "#e5e7eb",
                color: darkMode ? "#fff" : "#000",
                border: "1px solid #d1d5db"
              }}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "🌙 Dark Mode " : "☀️ Light Mode"}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: ADMIN EXCLUSIVE */}
        {isAdmin && (
          <div>
            <div style={{ ...cardStyle, borderLeft: "5px solid #3b82f6" }}>
              <h3 style={{ color: "#1e293b", marginBottom: "15px" }}>🛡️ Admin Controls</h3>
              
              <div style={itemStyle}>
                <span>System Maintenance</span>
                <input type="checkbox" />
              </div>

              <button 
                onClick={handleExport}
                style={{ ...buttonStyle, width: "100%", marginTop: "15px", background: "#3b82f6" }}
              >
                📥 Export Global Data (JSON)
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

// 🎨 UPDATED STYLES
const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  marginBottom: "20px",
  transition: "0.3s",
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0",
  fontSize: "0.9rem",
  borderBottom: "1px solid #f1f5f9"
};

const buttonStyle = {
  padding: "12px 15px",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "0.2s",
};