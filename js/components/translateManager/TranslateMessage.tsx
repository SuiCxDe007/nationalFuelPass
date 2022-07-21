import { useTranslation } from 'react-i18next'

/* eslint-disable-next-line */
export interface TranslateMessageProps {
  translateKey: string
  data?: any
}

export function TranslateMessage(props: TranslateMessageProps) {
  const { translateKey, data = {} } = props
  const { t } = useTranslation()

  return <>{t(translateKey, { ...data })}</>
}

export default TranslateMessage
