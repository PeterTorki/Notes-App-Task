/**
 * Realised by Ahmed Sbai
 * https://github.com/sbaiahmed1
 * @format
 * @flow strict-local
 */
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en} from './en';
import {ar} from './ar';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
