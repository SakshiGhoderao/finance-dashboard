import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AppRoutes from "../routes/AppRoutes";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {motion} from "framer-motion";

export default function MainLayout(){
    const {role} = useAuth();
    const {darkMode} = useTheme();
    return(
        <div style={{display:"flex"}}>
            <Sidebar />

            <motion.div 
                key={role + darkMode}
                initial={{opacity:0, x:30}}
                animate={{opacity:1, x:0}}
                transition={{type:"spring", stiffness:80}}
                className={`main-content ${role} ${darkMode ? "dark" : "light"}`}
                
            >
                <Header />

                <div style={{padding:"20px"}}>
                    <AppRoutes/>
                </div>
            </motion.div>
        </div>
    );
}