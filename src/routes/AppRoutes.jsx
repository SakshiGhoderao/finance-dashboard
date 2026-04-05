import { Routes, Route, useLocation} from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";

import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Insights from "../pages/Insights";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectdRoute";

export default function AppRoutes(){
    const location = useLocation();

    return(
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{opacity:0, y:20 }}
                animate={{opacity:1, y:0}}
                exit={{opacity:0, y:-20}}
                transition={{duration:0.3}}
            >
                <Routes location={location}>
                    <Route path="/" element={<Dashboard />}/>
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/insights" element={<Insights />} />

                    {/*admin only*/}
                    <Route path="/users" element={
                        <ProtectedRoute allowedRole="admin">
                            <Users/>
                        </ProtectedRoute>
                    }
                    />
                    <Route path="/settings" element={
                        <ProtectedRoute allowedRole="admin">
                            <Settings/>
                        </ProtectedRoute>
                    } 
                    />
                    {/*user only*/}
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    );
}
