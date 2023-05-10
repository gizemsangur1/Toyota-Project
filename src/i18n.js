import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import XHR from "i18next-http-backend";
import langaugeEn from "./locales/en/translation.json";
import langaugeTR from "./locales/tr/translation.json";

const options = {
  order: ['querystring', 'navigator'],
  lookupQuerystring: 'lng'
}
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng:"tr",
    detection: options,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    load: "languageOnly",
    caches: [],
  
  });

 i18n.changeLanguage();
