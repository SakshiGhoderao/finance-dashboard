import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({children}){
    const [darkMode, setDarkMode] = useState(() => {
        if(typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark";
        }
        return false;
    })

    useEffect(() => {
        const root = document.documentElement;

        if(darkMode){
            root.classList.add("dark");
            root.classList.remove("light");
            localStorage.setItem("theme", "dark");
        } else{
            root.classList.add("light");
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    },[darkMode]);

    return(
        <ThemeContext.Provider value={{darkMode, setDarkMode}}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}