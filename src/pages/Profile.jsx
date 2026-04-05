import React from "react";
import{useAuth} from "../context/AuthContext";
import "../App.css";

export default function Profile(){
    const {currentUser, role} = useAuth();

    const isAdmin = role === "admin";
    const displayName = isAdmin ? "System Admin" : (currentUser?.name || "Sakshi");
    const displayRole = isAdmin ? "Administrator" : "Standard User";
    const displayId = isAdmin ? "#000" : (currentUser?.id || "#001");
    const avatarLetter = displayName.charAt(0).toUpperCase();

    return(
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1 style={{fontSize:"2rem", fontWeight:"800"}}>My Profile</h1>
            </header>

            <div style={profileCardStyle}>
                <div style={avatarStyle}>{avatarLetter}</div>

                <div style={{textAlign:"center", marginTop:"15px"}}>
                    <h2 style={{margin:0}}>{displayName}</h2>
                    <p style={{color:"#64748b"}}>{displayRole}</p>
                </div>

                <hr style={{margin:"20px 0", border:"0.5px solid #f1f5f9"}} />

                <div style={{fontSize:"0.9rem", color:"#475569"}}>
                    <p><strong>User ID:</strong>{displayId}</p>
                    <p><strong>Status:</strong><span style={{color:"#10b981"}}>Active</span></p>
                </div>

                <button className="btn-add" style={{width:"100%", marginTop:"10px"}}>
                    Edit Profile
                </button>
            </div>
        </div>
    )
}

const profileCardStyle = {
    background:"#fff",
    padding:"40px",
    borderRadius:"15px",
    boxShadow:"0 4px 20px rgba(0,0,0,0.05)",
    width:"100%",
    maxWidth:"400px",
    margin:"40px auto",
};

const avatarStyle = {
    width: "80px",
    height: "80px",
    background: "#3b82f6",
    color: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    margin: "0 auto",
};