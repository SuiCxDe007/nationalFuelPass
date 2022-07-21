import { useCallback, useEffect, useState } from 'react'
import type { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  getProfile,
  resetprofileData,
  sendQrToMobile,
} from '../modules/login/loginSlice'
import Dashboard from './Dashboard'
import DashboardQR from './DashboardQR'
import { Modal, Spin } from 'antd'
import { useTranslation } from 'react-i18next'
import html2canvas from 'html2canvas'
import downloadjs from 'downloadjs'
// import { IDashboard } from '../modules/dashboard/interface'

const error = (msg: any) => {
  Modal.error({
    title: 'Registration Failed',
    content: msg,
  })
}

const success = (msg: any) => {
  Modal.success({
    title: 'Success',
    content: msg,
  })
}

const LoginDashboard: FC<any> = (props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [isQR, setIsQR] = useState<boolean>(false)
  const getQRCodeInfoData = useAppSelector((state) => state.login.profileData)
  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false)
  const [isTimer, setIsTimer] = useState<boolean>(false)
  const [waiting, setWaiting] = useState<boolean>(false)

  useEffect(() => {
    /**
     * Check Dashboard flow | QR flow
     */
    const isDashboard =
      props.location.pathname === '/dashboard' ||
      props.location.pathname === '/dashboard/qr'

    /**
     * Check IF login
     * call getProfileByToken
     */
    if (localStorage.loginToken && isDashboard) {
      dispatch(
        getProfile({
          data: 'login',
          failCallBack: getProfileFailedHandler,
          successCallBack: getProfileSuccessCallBack,
        })
      )
    }

    const isQRData: boolean = props.match.path === '/dashboard/qr'
    setIsQR(isQRData)

    const isRegisterSuccessData = localStorage.getItem('isRegisterSuccess')
    setIsRegisterSuccess(isRegisterSuccessData === 'true')
  }, [])

  const getProfileFailedHandler = (data: any) => {
    setWaiting(false)
    error(t('something_went_wrong'))
  }

  const getProfileSuccessCallBack = () => {
    setWaiting(false)
  }

  const qrCodeDownloadHandler = useCallback(async (data: any) => {
    const itemNo = data?.itemNo
    const canvas: any = await html2canvas(document.getElementById('qr-code')!)
    const dataURL = canvas.toDataURL('image/png')
    downloadjs(dataURL, `${itemNo}.png`, 'image/png')
  }, [])

  const sendQRToMobileHandler = () => {
    setWaiting(true)

    dispatch(
      sendQrToMobile({
        successCallBack: successCallBack,
        failCallBack: failCallBack,
      })
    )
  }

  const retryHandler = () => {
    dispatch(
      getProfile({
        data: 'retry',
        failCallBack: getProfileFailedHandler,
        successCallBack: getProfileSuccessCallBack,
      })
    )
  }

  const successCallBack = (msg: any) => {
    success(t('send_qr_mobile_success'))
    setIsTimer(true)
    setWaiting(false)
  }

  const failCallBack = (msg: any) => {
    setWaiting(false)
    error(t(msg))
  }

  const logoutHandler = () => {
    dispatch(resetprofileData())
    localStorage.clear()
    props.history.push('/')
  }

  const timeOverHandler = () => {
    setIsTimer(false)
  }

  return (
    <Spin spinning={waiting || getQRCodeInfoData.pending}>
      {isQR ? (
        <DashboardQR
          getQRCodeInfoData={getQRCodeInfoData}
          isDashboard={true}
          isQR={isQR}
          sendQRToMobileHandler={sendQRToMobileHandler}
          qrCodeDownloadHandler={qrCodeDownloadHandler}
          logoutHandler={logoutHandler}
          retryHandler={retryHandler}
          isTimer={isTimer}
          timeOverHandler={timeOverHandler}
          {...props}
        />
      ) : (
        <Dashboard
          getQRCodeInfoData={getQRCodeInfoData}
          isDashboard={true}
          isQR={isQR}
          sendQRToMobileHandler={sendQRToMobileHandler}
          qrCodeDownloadHandler={qrCodeDownloadHandler}
          logoutHandler={logoutHandler}
          isRegisterSuccess={isRegisterSuccess}
          retryHandler={retryHandler}
          isTimer={isTimer}
          timeOverHandler={timeOverHandler}
          // {...props}
        />
      )}
    </Spin>
  )
}

export default LoginDashboard
