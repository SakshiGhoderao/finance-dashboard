import React from "react";
import { BrowserRouter} from "react-router-dom";
import App from "./App";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext"; 
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
<BrowserRouter>
  <ThemeProvider>
    <AuthProvider>
      <App/>
    </AuthProvider>
  </ThemeProvider>
</BrowserRouter>
);