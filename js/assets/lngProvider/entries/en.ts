import en from 'antd/lib/locale/en_US'
import message from '../locales/en/translation.json'

export type langType = {
  message: any
  antd: any
  locale: any
}

const lang: langType = {
  message: {
    ...message,
  },
  antd: en,
  locale: 'en',
}

export default lang
