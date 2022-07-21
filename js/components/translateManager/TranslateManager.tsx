import React, { useEffect, useState } from 'react'
import ConfigProvider from 'antd/lib/config-provider'
import { useTranslation } from 'react-i18next'
import cookies from 'js-cookie'
import i18next from 'i18next'

//need to get using props
import {
  AppLocale,
  Languages,
  DEFAULT_LANGUAGE_CODE,
} from '../../assets/lngProvider'
// import './feature-i18n.module.less';

import './i18next'
import LanguageDropdown from './LanguageDropdown'

/* eslint-disable-next-line */
export interface TranslationManagerProps {
  children?: React.ReactNode
  hasDropdown?: boolean
}

export function TranslationManager({
  children,
  hasDropdown = false,
}: TranslationManagerProps) {
  const [currentLanCode, setCurrentLanCode] = useState(DEFAULT_LANGUAGE_CODE)
  // const { children } = props;
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
    const currentLanguageCode = cookies.get('i18next') || DEFAULT_LANGUAGE_CODE
    setCurrentLanCode(currentLanguageCode)
    i18next.changeLanguage(currentLanguageCode)
  }, [])

  /**
   * WHEN update current language code
   * maintain the antd locallization
   */
  useEffect(() => {
    setCurrentLanCode(currentLanguage.code)
  }, [currentLanguage, t])

  return (
    <ConfigProvider locale={AppLocale[currentLanCode].antd}>
      {hasDropdown && <LanguageDropdown />}
      {children}
    </ConfigProvider>
  )
}
