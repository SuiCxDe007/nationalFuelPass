import type { FC } from 'react'
import { Modal } from 'antd'
import { useTranslation } from 'react-i18next'

const TokenRetryModal: FC<any> = (props) => {
  const { t } = useTranslation()

  return (
    <>
      <Modal
        title={t('retry_title')}
        visible={props.visible}
        onOk={props.retryTokenHandler}
        onCancel={props.toggleHandler}
        cancelButtonProps={{ style: { display: 'none' } }}
        width={600}
        confirmLoading={props.confirmLoading}
        okText={t('retry')}
      >
        <p>{t('retry_content')}</p>
      </Modal>
    </>
  )
}

export default TokenRetryModal
