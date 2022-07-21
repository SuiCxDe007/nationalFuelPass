import { FC, useEffect, useState } from 'react'
import { Col, Row, Button, Form, Spin, Modal } from 'antd'
import { LeftCircleOutlined, RedoOutlined } from '@ant-design/icons'
import TranslateMessage from '../components/translateManager/TranslateMessage'
import { Form as FormikForm, Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { consumerLogin, consumerLoginVerify } from '../modules/login/loginSlice'
import { ValidateField } from '../components/CustomComponents'
import { CustomInput } from '../components/makeFields/CustomFormFields'
import LoginHeader from '../components/header/LoginHeader'
import { getRandamNumber } from '../utils/services'
import { useTranslation } from 'react-i18next'
import { OTP_NUMBER_REGEX } from '../constants/Validations'
import Timer from '../components/timer/Timer'
import { OTP_RESEND_TIME } from '../constants/Constants'

const error = (msg: any) => {
  Modal.error({
    title: 'Login Failed',
    content: msg,
  })
}

const success = (msg: any) => {
  Modal.success({
    title: 'Success',
    content: msg,
  })
}

const Otp: FC<any> = (props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [waiting, setWaiting] = useState<boolean>(false)
  const [mobileNo, setMobileNo] = useState<number | null>()
  const [isQR, setIsQR] = useState<boolean>(false)
  const [isTimer, setIsTimer] = useState<boolean>(true)

  const consumerLoginVerifyData = useAppSelector(
    (state) => state.login.consumerLoginVerifyData
  )
  const profileData = useAppSelector((state) => state.login.profileData)

  useEffect(() => {
    const mobile: any = localStorage.getItem('mobileNo')
    if (!!mobile) {
      const isQRPath: boolean = props.match.path === '/login/otp/qr'
      setIsQR(isQRPath)
      setMobileNo(mobile)
    } else {
      localStorage.clear()
      backHandler()
    }
  }, [])

  const backHandler = () => {
    props.history.push('/login')
  }

  const resendOtpHandler = () => {
    // debugger
    let data = {
      mobileNo: mobileNo,
      isQR: isQR,
    }

    setWaiting(true)
    setTimeout(() => {
      dispatch(
        consumerLogin({
          data: data,
          successCallBack: resendOtpSuccessHandler,
          failCallBack: resendOtpFailHandler,
          // isQR: isQR,
          isResend: true,
        })
      )

      setWaiting(false)
    }, getRandamNumber())
  }

  const resendOtpSuccessHandler = (msg: any) => {
    setWaiting(false)
    setIsTimer(true)
    success(t('otp_sent'))
  }

  const resendOtpFailHandler = (msg: any) => {
    setWaiting(false)
    error(t(msg))
  }

  const validationSchema = Yup.object({
    otp: Yup.string()
      .required(t('otp_required'))
      .test('otp_validation', t('invalid_otp'), (value: any): boolean => {
        return OTP_NUMBER_REGEX.test(value)
      }),
  })

  const successCallBack = (msg: any) => {
    setWaiting(false)
  }

  const failCallBack = (msg: any) => {
    error(t(msg))
    setWaiting(false)
  }

  const timeOverHandler = () => {
    setIsTimer(false)
  }

  return (
    <Spin
      spinning={
        waiting || consumerLoginVerifyData?.pending || profileData?.pending
      }
    >
      <div className='registration-form-container'>
        <Row>
          <Col xs={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }}>
            <div className='registration-form'>
              <LoginHeader />

              <div className='form-container'>
                <Formik
                  initialValues={{
                    otp: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values: any, props) => {
                    const { otp } = values
                    const data = {
                      mobileNo: mobileNo,
                      otp,
                    }
                    setWaiting(true)
                    dispatch(
                      consumerLoginVerify({
                        data: data,
                        failCallBack: failCallBack,
                        successCallBack: successCallBack,
                        isQR: isQR,
                      })
                    )
                  }}
                >
                  {({
                    errors,
                    touched,
                    values,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    handleSubmit,
                  }) => (
                    <FormikForm onSubmit={handleSubmit}>
                      <Row>
                        <Col md={{ span: 18, offset: 3 }} xs={{ span: 24 }}>
                          <div className='back-container' onClick={backHandler}>
                            <LeftCircleOutlined />
                            {'   '}
                            <TranslateMessage translateKey={'back'} />
                          </div>
                          <ValidateField
                            label={
                              <TranslateMessage
                                translateKey={'otp_message'}
                                data={{ mobile_number: mobileNo }}
                              />
                            }
                            required
                            help={
                              touched.otp && errors.otp
                                ? errors.otp.toString()
                                : ''
                            }
                            validateStatus={
                              touched.otp && errors.otp ? 'error' : 'success'
                            }
                          >
                            <Field
                              name='otp'
                              component={CustomInput}
                              maxLength={6}
                            />
                          </ValidateField>
                          <br />
                          <div
                            className={
                              isTimer ? 'resent-otp-waiting' : 'resent-otp'
                            }
                            onClick={() => {
                              if (!isTimer) {
                                resendOtpHandler()
                                setFieldValue('otp', '')
                              }
                            }}
                          >
                            {isTimer ? (
                              <div className='in-line-content'>
                                <RedoOutlined />
                                <TranslateMessage translateKey={'resend_otp'} />
                                {'   |   '}
                                <Timer
                                  initialMinute={OTP_RESEND_TIME.minute}
                                  initialSeconds={OTP_RESEND_TIME.seconds}
                                  timeOverHandler={timeOverHandler}
                                />
                              </div>
                            ) : (
                              <>
                                <RedoOutlined />
                                <TranslateMessage translateKey={'resend_otp'} />
                              </>
                            )}
                          </div>
                          <Form.Item>
                            <Button
                              className='submit-button'
                              htmlType='submit'
                              // onClick={loginHandler}
                            >
                              <TranslateMessage translateKey={'login'} />
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </FormikForm>
                  )}
                </Formik>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Spin>
  )
}

export default Otp
