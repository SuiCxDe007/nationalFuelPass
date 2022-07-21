import enlang from './entries/en'
import silang from './entries/si'
import talang from './entries/ta'

// import arEGlang, { langType } from './entries/si'

// type AppLocaleType = {
//   [key: string]: langType
// }

const AppLocale: any = {
  en: enlang,
  si: silang,
  ta: talang,
}

const Languages = [
  {
    code: 'si',
    name: 'Sinhala',
    dir: 'ltr',
    country_code: 'fr',
  },
  {
    code: 'en',
    name: 'English',
    dir: 'ltr',
    country_code: 'gb',
  },
  {
    code: 'ta',
    name: 'Tamil',
    dir: 'ltr',
    country_code: 'gb',
  },
  // {
  //   code: 'ar',
  //   name: 'العربية',
  //   dir: 'rtl',
  //   country_code: 'sa',
  // },
]

const LanguagesOptions = [
  { label: 'English', value: 'en' },
  { label: 'සිංහල', value: 'si' },
  { label: 'தமிழ்', value: 'ta' },
]

const DEFAULT_LANGUAGE_CODE = 'en'

export { AppLocale, Languages, DEFAULT_LANGUAGE_CODE, LanguagesOptions }
