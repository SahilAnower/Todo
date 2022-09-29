import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/Auth";
import css from "./index.css";

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
