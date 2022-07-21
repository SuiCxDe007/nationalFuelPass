import React, { useState, useEffect } from 'react'
import Logo from '../../assets/images/new-logo.png'
import { useTranslation } from 'react-i18next'

import { Button } from 'antd'
import {
  DEFAULT_LANGUAGE_CODE,
  Languages,
  LanguagesOptions,
} from '../../assets/lngProvider'
import cookies from 'js-cookie'
import i18next from 'i18next'
import history from '../../_helpers/history'

const HeaderNew = () => {
  const [language, setLanguage] = useState<string>('en')
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
    setLanguage(currentLanguageCode)
  }, [])

  /**
   * WHEN update current language code
   * maintain the antd locallization
   */
  useEffect(() => {
    document.body.dir = currentLanguage?.dir || 'ltr'
    document.title = t('app_title')
  }, [currentLanguage, t])

  const languageHandler = (code: any) => {
    cookies.set('i18next', code)
    i18next.changeLanguage(code)

    setLanguage(code)
  }

  const navigateHandler = () => {
    history.push('/')
  }
  return (
    <>
      <div className='main-header'>
        <div className='header-content'>
          <div className='logo-container' onClick={navigateHandler}>
            <img src={Logo} alt='logo-header' />
          </div>
          <div className='language-button-container'>
            {/* <Button className='active' onClick={() => languageHandler('en')}>
              English
            </Button>
            <Button>සිංහල</Button>
            <Button>தமிழ்</Button> */}
            {LanguagesOptions.map((lan, i) => {
              return (
                <Button
                  key={i}
                  onClick={() => languageHandler(lan.value)}
                  className={language === lan.value ? 'active' : ''}
                >
                  {lan?.label}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderNew
