import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({children, allowedRole}){
    const {role} = useAuth();

    if(role !== allowedRole) {
        return <Navigate to="/" />
    }

    return children;
}