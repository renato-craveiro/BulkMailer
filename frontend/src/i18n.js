/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: i18n configuration for BulkMailer frontend. Sets up language resources and default language for translations.
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import pt from "./locales/pt.json";

// Define translation resources for supported languages
const resources = {
  en: { translation: en },
  pt: { translation: pt }
};

// Initialize i18n with React integration and language settings
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "pt",          // default language
    fallbackLng: "en",  // fallback if key is missing
    interpolation: { escapeValue: false }
  });

// Export configured i18n instance for use in the app
export default i18n;