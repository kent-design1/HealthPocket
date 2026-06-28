import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from './locales/en.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import it from './locales/it.json';

const resources = {
    en: { translation: en },
    de: { translation: de },
    fr: { translation: fr },
    it: { translation: it },
};

// What language is the phone set to? Use it if we support it, else English.
const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';
const supported = ['en', 'de', 'fr', 'it'];
const startLanguage = supported.includes(deviceLanguage) ? deviceLanguage : 'en';

i18n.use(initReactI18next).init({
    resources,
    lng: startLanguage,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
});

export default i18n;