import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import "../App.css";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar(){
    const {role, setRole} = useAuth();
    const location = useLocation();
    const {darkMode} = useTheme();

    const isActive = (path) => location.pathname === path; 

    const toggleRole = () =>{
      setRole(role === "admin" ? "user" : "admin");
    };

    return(
        <div className={`sidebar ${role} ${darkMode ? "dark" : ""}`}>
      <div className="sidebar-logo">Finance</div>

      <nav>
        <ul className="sidebar-nav">
          <li>
            <Link to="/" className={`sidebar-link ${isActive("/") ? "active" : ""}`}>
              Dashboard
            </Link>
          </li>

          {role === "admin" ? (
            <>
              <li>
                <Link to="/transactions" className={`sidebar-link ${isActive("/transactions") ? "active" : ""}`}>
                  Transactions
                </Link>
              </li>
              <li>
                <Link to="/insights" className={`sidebar-link ${isActive("/insights") ? "active" : ""}`}>
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/users" className={`sidebar-link ${isActive("/users") ? "active" : ""}`}>
                  Users
                </Link>
              </li>
              <li>
                <Link to="/settings" className={`sidebar-link ${isActive("/settings") ? "active" : ""}`}>
                  Settings
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/transactions" className={`sidebar-link ${isActive("/transactions") ? "active" : ""}`}>
                  My Transactions
                </Link>
              </li>
              <li>
                <Link to="/insights" className={`sidebar-link ${isActive("/insights") ? "active" : ""}`}>
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/profile" className={`sidebar-link ${isActive("/profile") ? "active" : ""}`}>
                  Profile
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="role-badge">
        <span className="role-text">Current Access</span>
        <div style={{ fontWeight: 600, marginBottom:"10px" }}>
          {role === "admin" ? "🛡️ Administrator" : "👁️ Viewer Mode"}
        </div>

        <button 
          onClick={toggleRole}
          className="role-switch-btn"
        >
          Switch to {role === "admin" ? "user" : "Admin"}
        </button>
      </div>
    </div>
    );
}