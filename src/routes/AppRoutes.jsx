import { Routes, Route, useLocation} from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";

import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Insights from "../pages/Insights";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes(){
    const location = useLocation();

    return(
        <AnimatePresence mode="wait">
                <Routes location={location}>
                    <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>}/>
                    <Route path="/transactions" element={<PageWrapper><Transactions /></PageWrapper>} />
                    <Route path="/insights" element={<PageWrapper><Insights /></PageWrapper>} />

                    {/*admin only*/}
                    <Route path="/users" element={
                        <ProtectedRoute allowedRole="admin">
                            <PageWrapper><Users/></PageWrapper>
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
        </AnimatePresence>
    );
}

const PageWrapper = ({children}) => (
     <motion.div
        key={location.pathname}
        initial={{opacity:0, y:20 }}
        animate={{opacity:1, y:0}}
        exit={{opacity:0, y:-20}}
        transition={{duration:0.3}}
    >
        {children}
    </motion.div>
            
)