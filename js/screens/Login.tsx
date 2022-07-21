import { useEffect, useState } from 'react'
import type { FC } from 'react'
import { Col, Row, Button, Form, Spin, Modal } from 'antd'
import TranslateMessage from '../components/translateManager/TranslateMessage'
import * as Yup from 'yup'
import { Form as FormikForm, Formik, Field } from 'formik'
import { ValidateField } from '../components/CustomComponents'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { consumerLogin } from '../modules/login/loginSlice'
import { CustomInput } from '../components/makeFields/CustomFormFields'
import LoginHeader from '../components/header/LoginHeader'
import { getRandamNumber } from '../utils/services'
import { useTranslation } from 'react-i18next'
import { CONTACT_NUMBER_REGEX } from '../constants/Validations'
// import Timer from '../components/timer/Timer'

const error = (msg: any) => {
  Modal.error({
    title: 'Login Failed',
    content: msg,
  })
}

const Login: FC<any> = (props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [waiting, setWaiting] = useState<boolean>(false)
  const [isQR, setIsQR] = useState<boolean>(false)

  const consumerLoginData = useAppSelector(
    (state) => state.login.consumerLoginData
  )
  useEffect(() => {
    const isQRPath: boolean = props.location.pathname === '/qr'
    setIsQR(isQRPath)
  }, [])

  const validationSchema = Yup.object({
    mobileNo: Yup.string()
      .required(t('mobile_number_required'))
      .test(
        'validate_is_number',
        t('invalid_mobileNo'),
        (value: any): boolean => {
          return CONTACT_NUMBER_REGEX.test(value)
        }
      )
      .test('validate_length', t('invalid_mobileNo'), (value: any): boolean => {
        return value?.length === 10
      }),
  })

  const failCallBack = (msg: string) => {
    // debugger
    setWaiting(false)
    error(t(msg))
  }

  const successCallBack = (msg: string) => {
    setWaiting(false)
  }

  return (
    <Spin spinning={waiting || consumerLoginData.pending}>
      <div className='registration-form-container'>
        <Row>
          <Col xs={{ span: 22, offset: 1 }} md={{ span: 18, offset: 3 }}>
            <div className='registration-form'>
              <LoginHeader />
              <div className='form-container'>
                <Formik
                  initialValues={{
                    mobileNo: '',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values: any, props) => {
                    setWaiting(true)
                    setTimeout(() => {
                      const { mobileNo } = values
                      const data = {
                        mobileNo: mobileNo,
                        isQR: isQR,
                      }
                      // sendOTPHandler()
                      // dispatch(consumerLogin(data))
                      dispatch(
                        consumerLogin({
                          data: data,
                          successCallBack: successCallBack,
                          failCallBack: failCallBack,
                          // isQR: isQR,
                          isResend: false,
                        })
                      )
                      // setWaiting(false)
                    }, getRandamNumber())
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
                  }) => {
                    return (
                      <FormikForm onSubmit={handleSubmit}>
                        <Row>
                          <Col md={{ span: 18, offset: 3 }} xs={{ span: 24 }}>
                            <ValidateField
                              label={
                                <TranslateMessage
                                  translateKey={'mobile_number'}
                                />
                              }
                              required
                              help={
                                touched.mobileNo && errors.mobileNo
                                  ? errors.mobileNo.toString()
                                  : ''
                              }
                              validateStatus={
                                touched.mobileNo && errors.mobileNo
                                  ? 'error'
                                  : 'success'
                              }
                            >
                              <Field
                                name='mobileNo'
                                type='text'
                                placeholder='Ex: 0777123456'
                                component={CustomInput}
                                maxLength='10'
                              />
                            </ValidateField>
                            {/* <Timer initialMinute={2} initialSeconds={20} /> */}
                            <Form.Item>
                              <Button
                                className='submit-button'
                                htmlType='submit'
                                disabled={
                                  (errors && !!errors.mobileNo) ||
                                  false ||
                                  values.mobileNo === ''
                                }
                              >
                                <TranslateMessage translateKey={'send_otp'} />
                                {/* <Timer initialMinute={2} initialSeconds={20} /> */}
                              </Button>
                            </Form.Item>
                          </Col>
                        </Row>
                      </FormikForm>
                    )
                  }}
                </Formik>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Spin>
  )
}

export default Login
