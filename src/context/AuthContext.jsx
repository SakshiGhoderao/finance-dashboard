import { createContext,useContext, useState } from "react";
import transactionsData from "../data/transactions";



const AuthContext = createContext();

export function AuthProvider({ children}){
    // change this to user
    const [role, setRole] = useState("admin");

    const [transactions, setTransactions] = useState(transactionsData);

    const currentUser ={
        id:1,
        name:"Sakshi"
    };

    return(
        <AuthContext.Provider value={{role,setRole,currentUser,transactions, setTransactions}}>
            {children}
        </AuthContext.Provider>
    );
}

//custom hook
export function useAuth(){
    return useContext(AuthContext);
}