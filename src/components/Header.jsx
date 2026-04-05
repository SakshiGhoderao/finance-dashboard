import {useAuth} from "../context/AuthContext";

export default function Header(){
    const {role} = useAuth();

    return(
        <div 
            style={{
                height:"60px",
                background:"#ffffff",
                display:"flex",
                alignItems:"center",
                justifyContent:"space-between",
                padding:"0 20px",
                borderBottom:"1px solid #ddd",
            }}
        >
            <h3>Dashboard</h3>
            <p>{role.toUpperCase()}</p>
        </div>
    );
}