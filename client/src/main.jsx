import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextHolder from "./context/ContextHolder";
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../src/language/Plants.json';
import hi from '../src/language/plantsHindi.json';
import or from '../src/language/PlantsOdia.json';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      or: { translation: or },
    },
    fallbackLng: 'en',
  });

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextHolder>
    <App />
  </ContextHolder>
);
