import { useEffect } from 'react'
// import './language-dropdown.module.less'
import Space from 'antd/lib/space'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import {
  Languages,
  DEFAULT_LANGUAGE_CODE,
  LanguagesOptions,
} from '../../assets/lngProvider'
import i18next from 'i18next'
import { Radio } from 'antd'

/* eslint-disable-next-line */
export interface LanguageDropdownProps {}

export function LanguageDropdown(props: LanguageDropdownProps) {
  const currentLanguageCode = cookies.get('i18next') || DEFAULT_LANGUAGE_CODE

  /**
   * WHEN every render
   * get language object using currentLanguageCode
   */
  const currentLanguage: any = Languages.find(
    (l) => l.code === currentLanguageCode
  )
  const { t } = useTranslation()

  /**
   * WHEN component mounting
   * update the language code
   */
  useEffect(() => {
    // const currentLanguageCode = (cookies.get('i18next') || 'en') as 'en' | 'ts';
    const currentLanguageCode = cookies.get('i18next') || DEFAULT_LANGUAGE_CODE
    i18next.changeLanguage(currentLanguageCode)
  }, [])

  /**
   * WHEN update current language code
   * maintain the antd locallization
   */
  useEffect(() => {
    document.body.dir = currentLanguage?.dir || 'ltr'
    document.title = t('app_title')
  }, [currentLanguage, t])

  /**
   * Language change handler
   * @param language languageCode : en | ar | fr
   */
  const changeLanguage = (e: any) => {
    cookies.set('i18next', e.target.value)
    i18next.changeLanguage(e.target.value)
  }

  return (
    <Space
      wrap
      style={{
        position: 'absolute',
        right: 0,
      }}
    >
      <Radio.Group
        options={LanguagesOptions}
        onChange={changeLanguage}
        value={currentLanguageCode}
        optionType='button'
        buttonStyle='solid'
      />
    </Space>
  )
}

export default LanguageDropdown
