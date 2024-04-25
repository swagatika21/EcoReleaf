import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextHolder from "./context/ContextHolder";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextHolder>
    <App />
  </ContextHolder>
);
