import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./Styles/global.css";
import ContextHolder from "./context/ContextHolder";
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextHolder>
    <App />
  </ContextHolder>
);
