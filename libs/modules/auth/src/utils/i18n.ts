import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../translations/en";
import skTranslations from "../translations/sk";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        ...enTranslations,
      },
    },
    sk: {
      translation: {
        ...skTranslations,
      },
    },
  },
  lng: "sk",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export const i18n = i18next;
