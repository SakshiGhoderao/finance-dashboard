import React,{useState} from "react";
import {useAuth} from "../context/AuthContext";
import "../App.css";

export default function Users(){
    const{role} = useAuth();

    const[allUsers, setAllUsers] = useState([
        {id:1, name:"Sakshi", email:"sakshi@example.com", role:"admin", status:"Active"},
        {id:2, name:"Virat", email:"virat@example.com", role:"user", status:"Active"},
        {id:3, name:"Amit", email:"amit@example.com", role:"user", status:"Inactive"},
    ]);

    const isAdmin = role === "admin";

    const toggleSuspend = (id) => {
        setAllUsers(allUsers.map(u => {
            if(u.id === id) {
                const newStatus = u.status === "Active" ? "Inactive" : "Active";
                return{...u, status: newStatus};
            }
            return u;
        }));
    };

    const handleEdit = (user) =>{
        const newName = prompt("Enter new name for " + user.name, user.name);
        if(newName) {
            setAllUsers(allUsers.map(u =>
                u.id === user.id ? {...u, name: newName} : u
            ));
        }
    };


    //--admin view--//
    if(isAdmin) {
        return(
            <div className="dashboard-container">
                <header className="dashboard-header">
                    <h1 style={{fontSize:"2rem", fontWeight:"800"}}>User Management</h1>
                    <p style={{color:"#64748b"}}>Manage permissions and account status</p>
                </header>

                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ROLE</th>
                            <th>STATUS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allUsers.map((u) => (
                            <tr key={u.id} style={{opacity:u.status === "Inactive"? 0.6 :1 }}>
                                <td style={{fontWeight:"600"}}>{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    <span className="type-tag" style={{background:"#e0e7ff", color:"#4338ca"}}>
                                        {u.role.toUpperCase()}
                                    </span>
                                </td>

                                <td>
                                    <span style={{color:u.status === "Active" ? "#10b981" : "#ef4444" }}>
                                        {u.status}
                                    </span>
                                </td>

                                <td>
                                    <button className="action-btn edit" onClick={() => handleEdit(u)}>Edit</button>
                                    <button className="action-btn delete" style={{color:u.status === "Active" ? "#ef4444" : "#10b981"}} 
                                        onClick={() => toggleSuspend(u.id)}
                                    >
                                        {u.status === "Active" ? "Suspend" : "Activate"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

}