import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { LogoutOutlined, CheckCircleFilled } from '@ant-design/icons'
import { Col, Row, Button, Alert } from 'antd'
import TranslateMessage from '../components/translateManager/TranslateMessage'
import QRCodeGenerator from '../components/qrCodeGenerator/QRCodeGenerator'
import {
  isDisplayExpiresOn,
  SEND_QR_TO_MOBILE_TIME,
} from '../constants/Constants'
import { useTranslation } from 'react-i18next'
import Lottie from 'react-lottie-player'

import lottie from '../assets/lottie/two-way-traffic.json'
import lottieLoading from '../assets/lottie/loading.json'
import Timer from '../components/timer/Timer'

const Dashboard: FC<any> = (props) => {
  const { t } = useTranslation()
  // const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false)

  // useEffect(() => {
  //   const isRegisterSuccessData = localStorage.getItem('isRegisterSuccess')
  //   setIsRegisterSuccess(isRegisterSuccessData === 'true')
  // }, [])

  if (props.getQRCodeInfoData.hasError) {
    return (
      <>
        <div className='dashboard-container'>
          <Row>
            <Col span={24}>
              <div className='logout-container' onClick={props.logoutHandler}>
                <LogoutOutlined /> {/* LOGOUT */}{' '}
                <TranslateMessage translateKey={'logout'} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className='dashboard-header'>
                <TranslateMessage translateKey={'app_name'} />
              </div>
            </Col>
          </Row>
          <Row className='qr-row'>
            <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
            <Col xs={{ span: 24 }} md={{ span: 16 }} style={{ padding: 40 }}>
              <div className='lottie-wrapper'>
                <Lottie
                  loop
                  animationData={lottie}
                  play
                  style={{ width: 100, height: 100 }}
                />
              </div>
              <Alert message={t('something_went_wrong')} type='info' showIcon />

              <Button
                className='dashboard-retry-btn'
                onClick={() => props.retryHandler()}
              >
                <TranslateMessage translateKey={'retry'} />
              </Button>
            </Col>
            <Col xs={{ span: 0 }} md={{ span: 4 }}></Col>
          </Row>
        </div>
      </>
    )
  } else if (props.getQRCodeInfoData.loading) {
    return (
      <>
        <div className='dashboard-container'>
          <Row>
            <Col span={24}>
              <div className='logout-container' onClick={props.logoutHandler}>
                <LogoutOutlined /> {/* LOGOUT */}{' '}
                <TranslateMessage translateKey={'logout'} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className='dashboard-header'>
                <TranslateMessage translateKey={'app_name'} />
              </div>
            </Col>
          </Row>
          <Row className='qr-row'>
            <Col xs={{ span: 24 }} md={{ span: 24 }} style={{ padding: 40 }}>
              <div className='lottie-wrapper'>
                <Lottie
                  loop
                  animationData={lottieLoading}
                  play
                  style={{ width: 50, height: 50 }}
                />
              </div>
            </Col>
          </Row>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='dashboard-container'>
          <Row>
            <Col span={24}>
              <div className='logout-container' onClick={props.logoutHandler}>
                <LogoutOutlined /> {/* LOGOUT */}{' '}
                <TranslateMessage translateKey={'logout'} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className='dashboard-header'>
                <TranslateMessage translateKey={'app_name'} />
              </div>
            </Col>
          </Row>
          <Row className='qr-row'>
            {props.isRegisterSuccess && (
              <Col span={24}>
                <div className='register-success'>
                  <CheckCircleFilled />{' '}
                  <TranslateMessage translateKey={'registration_successful'} />
                </div>
              </Col>
            )}
            <Col xs={{ span: 24 }} md={{ span: 8 }}>
              <div className='qr-container'>
                <QRCodeGenerator qrData={props.getQRCodeInfoData?.data} />
                <Button
                  className='send-qr'
                  onClick={props.sendQRToMobileHandler}
                  disabled={props.isTimer}
                >
                  {props.isTimer ? (
                    <div className='in-line-content'>
                      <TranslateMessage translateKey={'sent_qr_to_my_mobile'} />

                      <Timer
                        initialMinute={SEND_QR_TO_MOBILE_TIME.minute}
                        initialSeconds={SEND_QR_TO_MOBILE_TIME.seconds}
                        timeOverHandler={props.timeOverHandler}
                      />
                    </div>
                  ) : (
                    <TranslateMessage translateKey={'sent_qr_to_my_mobile'} />
                  )}
                </Button>
                <Button
                  className='download-qr'
                  onClick={() =>
                    props.qrCodeDownloadHandler(props.getQRCodeInfoData?.data)
                  }
                >
                  <TranslateMessage translateKey={'download_qr'} />
                </Button>
              </div>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 16 }}>
              <div className='qr-text'>
                <div className='qr-text-header'>
                  <span>{props.getQRCodeInfoData?.data?.itemNo}</span>
                </div>
                <div className='eligible-week'>
                  <TranslateMessage translateKey={'eligible_weekly_quota'} />:{' '}
                  <span className='litres'>
                    {(props.getQRCodeInfoData?.data?.quota?.[0].eligibleQuota &&
                      props.getQRCodeInfoData?.data?.quota?.[0].eligibleQuota.toFixed(
                        3
                      )) ||
                      '0.000'}{' '}
                    L
                  </span>
                </div>
                <div className='balance-week'>
                  <TranslateMessage translateKey={'balance_weekly_quota'} />:{' '}
                  <span className='litres'>
                    {(props.getQRCodeInfoData?.data?.quota?.[0]
                      .remainingQuota &&
                      props.getQRCodeInfoData?.data?.quota?.[0].remainingQuota.toFixed(
                        3
                      )) ||
                      '0.000'}{' '}
                    L
                  </span>
                  {/* Expirer on section */}
                  {isDisplayExpiresOn && (
                    <span className='expire-date'>
                      {' '}
                      ( <TranslateMessage translateKey={'expire_on'} /> -{' '}
                      {`${
                        props.getQRCodeInfoData?.data?.quota?.[0]
                          .quotaExpire?.[0] || 0
                      }-${
                        props.getQRCodeInfoData?.data?.quota?.[0]
                          .quotaExpire?.[1] || 0
                      }-${
                        props.getQRCodeInfoData?.data?.quota?.[0]
                          .quotaExpire?.[2] || 0
                      } `}
                      )
                    </span>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </>
    )
  }
}

export default Dashboard
