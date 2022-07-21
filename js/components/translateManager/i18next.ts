import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationsEn from '../../assets/lngProvider/locales/en/translation.json'
import translationsSi from '../../assets/lngProvider/locales/si/translation.json'
import translationsTa from '../../assets/lngProvider/locales/ta/translation.json'
import { DEFAULT_LANGUAGE_CODE } from '../../assets/lngProvider'
// .use(Backend)
// .use(LanguageDetector)

i18next
  // .use(HttpApi)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // supportedLngs: ["en", "ar", "fr"],
    fallbackLng: DEFAULT_LANGUAGE_CODE,
    debug: true,
    // Options for language detector
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    // react: { useSuspense: false },
    // backend: {
    //   loadPath: '/assets/locales/{{lng}}/translation.json',
    // },
    resources: {
      en: { translation: translationsEn },
      si: { translation: translationsSi },
      ta: { translation: translationsTa },
    },
  })

export default i18next
