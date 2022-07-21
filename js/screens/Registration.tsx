import { FC, useEffect, useState } from 'react'
import { Col, Row, Button, Spin, Select, Modal, Alert } from 'antd'
import TranslateMessage from '../components/translateManager/TranslateMessage'
import { ValidateField } from '../components/CustomComponents'
import { Form, Field, Formik } from 'formik'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import * as Yup from 'yup'
import {
  fillRegisterInfo,
  verifyNIC,
  sendOTP,
  verifyOTP,
  resetSendOTPData,
  getItemCategory,
  getItemSubCategory,
} from '../modules/register/registerSlice'
import { CustomInput } from '../components/makeFields/CustomFormFields'
import { getRandamNumber } from '../utils/services'
import RegisterHeader from '../components/header/RegisterHeader'
import { useTranslation } from 'react-i18next'
// import Watchman from '../components/timer/Watchman'
import {
  ADDRESS_REGEX,
  CONTACT_NUMBER_REGEX,
  FIRSTNAME_REGEX,
  LASTNAME_REGEX,
  OTP_NUMBER_REGEX,
} from '../constants/Validations'
import Timer from '../components/timer/Timer'
import { OTP_RESEND_TIME } from '../constants/Constants'
const { Option } = Select

const NICOptions = [
  { label: 'NIC', value: 1 },
  { label: 'Passport', value: 2 },
  { label: 'BRN', value: 3 },
]

const error = (msg: any) => {
  Modal.error({
    title: 'Registration Failed',
    content: msg,
  })
}

const Registration: FC<any> = (props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [waiting, setWaiting] = useState<boolean>(false)
  const [isTimer, setIsTimer] = useState<boolean>(false)

  const sendOTPData = useAppSelector((state) => state.register.sendOTPData)
  const verifyOTPData = useAppSelector((state) => state.register.verifyOTPData)
  const verifyNICData = useAppSelector((state) => state.register.verifyNICData)
  const registerInfo = useAppSelector((state) => state.register.registerInfo)

  const itemCategoriesData = useAppSelector(
    (state) => state.register.itemCategoriesData
  )
  const itemSubCategoriesData = useAppSelector(
    (state) => state.register.itemSubCategoriesData
  )
  useEffect(() => {
    let isLoadCategory =
      !itemCategoriesData.loading && !itemCategoriesData.hasError
    let isLoadSubCategory =
      !itemSubCategoriesData.loading && !itemSubCategoriesData.hasError

    !isLoadCategory && dispatch(getItemCategory('category'))
    !isLoadSubCategory && dispatch(getItemSubCategory('subCategory'))
  }, [])

  const sendOtpHandler = (values: any) => {
    dispatch(resetSendOTPData())
    setWaiting(true)
    setTimeout(() => {
      const data = {
        mobileNo: values?.mobileNo,
        isNavigateTo: false,
        link: '',
      }
      // dispatch(sendOTP(data))
      dispatch(
        sendOTP({
          data: data,
          successCallBack: successSendOtpCallBack,
          failCallBack: failSendOtpCallback,
        })
      )
      // setWaiting(false)
    }, getRandamNumber())
  }

  const successSendOtpCallBack = (data: any) => {
    setIsTimer(true)
    setWaiting(false)

    // dispatch(fillRegisterInfo(data))
  }

  const failSendOtpCallback = (msg: any) => {
    setWaiting(false)
    error(t(msg))
  }

  const verifyOtpHandler = (values: any) => {
    setWaiting(true)
    setTimeout(() => {
      const data = {
        mobileNo: values?.mobileNo,
        otp: values?.otp,
        isNavigateTo: false,
        link: '',
      }
      dispatch(
        verifyOTP({
          data: data,
          successCallBack: successVerifyOTPBack,
          failCallBack: failVerifyOTPback,
        })
      )
      // setWaiting(false)
    }, getRandamNumber())
  }

  const successVerifyOTPBack = () => {
    setWaiting(false)
  }

  const failVerifyOTPback = () => {
    setWaiting(false)
  }
  const validationSchema = Yup.object({
    consumerUid: Yup.string()
      .required(t('required'))
      .max(32, 'Maximum length exceed')
      .test(
        'consumerUid_custom_validation',
        t('invalid'),
        (value: any, values: any): any => {
          const consumerUidType = values?.parent?.consumerUidType
          if (+consumerUidType === 1) {
            return (
              (value?.trim()?.length === 10 &&
                !isNaN(value.substr(0, 9)) &&
                isNaN(value.substr(9, 1).toLowerCase()) &&
                ['x', 'v'].includes(value.substr(9, 1).toLowerCase())) ||
              (value?.trim()?.length === 12 && !isNaN(value))
            )
          }
          return true
        }
      ),
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
    otp: Yup.string()
      .required(t('otp_required'))
      .test('otp_validation', t('invalid_otp'), (value: any): boolean => {
        return OTP_NUMBER_REGEX.test(value)
      }),
    firstName: Yup.string()
      .max(50, t('invalid_fname'))
      .required(t('first_name_required'))
      .test(
        'validate_fName_letters',
        t('invalid_fname'),
        (value: any): boolean => {
          return FIRSTNAME_REGEX.test(value)
        }
      ),
    lastName: Yup.string().test(
      'validate_lName_letters',
      t('invalid_lname'),
      (value: any): boolean => {
        return LASTNAME_REGEX.test(value)
      }
    ),
    consumerAddress: Yup.string()
      .max(100, t('invalid_address'))
      .required(t('address_required'))
      .test(
        'validate_address_letters',
        t('invalid_address'),
        (value: any): boolean => {
          return ADDRESS_REGEX.test(value)
        }
      ),
    consumerUidType: Yup.string().required(t('id_type_required')),
  })

  const getIdTypeLabel = (consumerUidType: number) => {
    switch (consumerUidType) {
      case 1:
        return { label: 'nic_number', placehoder: 'Ex: 895675466V' }
      case 2:
        return { label: 'passport_number', placehoder: 'Ex: AB012345' }
      case 3:
        return { label: 'brn_number', placehoder: 'Ex: PV 00123456' }
      default:
        return { label: 'nic_number', placehoder: 'Ex: 895675466V' }
    }
  }

  const successCallBack = (data: any) => {
    dispatch(fillRegisterInfo(data))
    setWaiting(false)
  }

  const failCallBack = (data: any) => {
    // debugger
    // const { msg, consumerUidTypeLabel }: any = data
    // error(t(msg, { ID_TYPE: consumerUidTypeLabel }))

    const { msg }: any = data
    error(t(msg))
    setWaiting(false)
  }

  // const submitHandler = () => {
  //   console.log(
  //     '🚀 ~ file: Registration.tsx ~ line 153 ~ submitHandler ~ submitHandler'
  //   )

  //   dispatch(
  //     verifyNIC({
  //       data: {
  //         consumerUid: '941620477v',
  //         cousumerUidType: 1,
  //       },
  //       successCallBack: () => console.log('Success'),
  //       failCallBack: () => console.log('Error'),
  //     })
  //   )
  // }

  const timeOverHandler = () => {
    setIsTimer(false)
  }

  const testHandler = () => {
    dispatch(getItemCategory('category'))
  }
  return (
    <Spin
      spinning={
        waiting ||
        sendOTPData.pending ||
        verifyOTPData.pending ||
        verifyNICData.pending
      }
    >
      <div className='registration-form-container'>
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 18, offset: 3 }}>
            <div className='registration-form'>
              <RegisterHeader personal_details={true} vehicle_details={false} />
              <div className='form-container'>
                <Formik
                  enableReinitialize={true}
                  initialValues={registerInfo?.data}
                  validationSchema={validationSchema}
                  onSubmit={(values: any, props) => {
                    if (!verifyOTPData.data || verifyOTPData.data === 'init') {
                      error('Please Validate OTP')
                      return
                    }
                    const {
                      firstName,
                      lastName,
                      mobileNo,
                      consumerUid,
                      otp,
                      consumerAddress,
                      consumerUidType,
                    } = values
                    const data = {
                      firstName,
                      lastName,
                      mobileNo,
                      consumerUid,
                      consumerAddress: consumerAddress,
                      consumerUidType: +consumerUidType,
                      otp,
                    }
                    // dispatch(fillRegisterInfo(data))

                    setWaiting(true)
                    setTimeout(() => {
                      dispatch(
                        verifyNIC({
                          data: data,
                          successCallBack: successCallBack,
                          failCallBack: failCallBack,
                        })
                      )
                      // setWaiting(false)
                    }, getRandamNumber())
                    // dispatch(fillRegisterInfo(data))

                    // Need to comment
                    // navigateHandler()
                  }}
                >
                  {({
                    errors,
                    touched,
                    values,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                  }) => {
                    return (
                      <Form onSubmit={handleSubmit}>
                        <Row>
                          <Col span={24}>
                            <ValidateField
                              label={
                                <TranslateMessage
                                  translateKey={
                                    getIdTypeLabel(values?.consumerUidType)
                                      .label
                                  }
                                />
                              }
                              // hasFeedback={!!touched?.nic && !!errors?.nic}
                              required
                              // help={touched?.nic && errors?.nic ? errors.nic : ''}
                              help={
                                touched.consumerUid && errors.consumerUid
                                  ? errors.consumerUid.toString()
                                  : ''
                              }
                              validateStatus={
                                touched.consumerUid && errors.consumerUid
                                  ? 'error'
                                  : 'success'
                              }
                            >
                              <Row gutter={[10, 10]}>
                                <Col md={{ span: 18 }} xs={{ span: 14 }}>
                                  <Field
                                    name='consumerUid'
                                    title='NIC'
                                    component={CustomInput}
                                    placeholder={
                                      getIdTypeLabel(values?.consumerUidType)
                                        .placehoder
                                    }
                                    maxLength='32'
                                  />
                                </Col>
                                <Col md={{ span: 6 }} xs={{ span: 10 }}>
                                  <Select
                                    // showSearch
                                    defaultValue={'NIC'}
                                    placeholder='Select Type'
                                    optionFilterProp='children'
                                    onChange={(value) => {
                                      setFieldValue('consumerUidType', value)
                                      setFieldValue('consumerUid', '')
                                    }}
                                    filterOption={(input, option) =>
                                      (option!.children as unknown as string)
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                  >
                                    {NICOptions.map((op: any, i: any) => {
                                      return (
                                        <Option key={i} value={op.value}>
                                          {op.label}
                                        </Option>
                                      )
                                    })}
                                  </Select>
                                </Col>
                              </Row>
                            </ValidateField>
                          </Col>
                        </Row>

                        <Row gutter={[15, 0]}>
                          <Col md={{ span: 12 }} xs={{ span: 24 }}>
                            <div className='input-with-button-two-line'>
                              <ValidateField
                                label={
                                  <TranslateMessage
                                    translateKey={'mobile_number'}
                                  />
                                }
                                required
                                // help={'Help Text'}
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
                                  component={CustomInput}
                                  maxLength='10'
                                  placeholder='Ex: 0777123456'
                                  disabled={verifyOTPData.isValidate}
                                />
                              </ValidateField>
                              <Button
                                className='send-otp-button register'
                                onClick={() => sendOtpHandler(values)}
                                // disabled={
                                //   values?.mobileNo === '' ||
                                //   verifyOTPData.isValidate
                                // }
                                disabled={
                                  (errors && !!errors.mobileNo) ||
                                  false ||
                                  values.mobileNo === '' ||
                                  verifyOTPData.isValidate ||
                                  isTimer
                                }
                              >
                                {isTimer ? (
                                  <div className='in-line-content'>
                                    <TranslateMessage
                                      translateKey={'send_otp'}
                                    />
                                    <Timer
                                      initialMinute={OTP_RESEND_TIME.minute}
                                      initialSeconds={OTP_RESEND_TIME.seconds}
                                      timeOverHandler={timeOverHandler}
                                    />
                                  </div>
                                ) : (
                                  <TranslateMessage translateKey={'send_otp'} />
                                )}
                              </Button>
                            </div>
                          </Col>
                          <Col md={{ span: 12 }} xs={{ span: 24 }}>
                            <div className='input-with-button-two-line'>
                              <ValidateField
                                label={
                                  <TranslateMessage translateKey={'otp'} />
                                }
                                required
                                // help={'Help Text'}
                                // hasFeedback={!verifyOTPData.loading}
                                // help={
                                //   touched.otp && errors.otp
                                //     ? errors.otp.toString()
                                //     : ''
                                // }
                                // validateStatus={
                                //   verifyOTPData.data
                                //     ? 'success'
                                //     : !verifyOTPData.data
                                //     ? 'error'
                                //     : ''
                                // }
                                // validateStatus={
                                //   verifyOTPData.data ? 'success' : 'error'
                                // }
                                help={
                                  touched.otp && errors.otp
                                    ? errors.otp.toString()
                                    : ''
                                }
                                validateStatus={
                                  touched.otp && errors.otp
                                    ? 'error'
                                    : 'success'
                                }
                              >
                                <Field
                                  name='otp'
                                  component={CustomInput}
                                  placeholder='Ex: 123456'
                                  type='text'
                                  maxLength={6}
                                  // disabled={!sendOTPData.isValidate}
                                  disabled={
                                    !sendOTPData.isValidate ||
                                    verifyOTPData.isValidate
                                  }
                                />
                              </ValidateField>

                              <Button
                                className='verify-button register'
                                onClick={() => verifyOtpHandler(values)}
                                disabled={
                                  // values?.mobileNo === '' ||
                                  // !sendOTPData.isValidate ||
                                  // values?.otp?.length === 6
                                  values.otp.toString().length !== 6 ||
                                  verifyOTPData.isValidate ||
                                  (errors && !!errors.otp)
                                }
                              >
                                <TranslateMessage translateKey={'verify'} />
                              </Button>
                            </div>
                          </Col>
                        </Row>

                        <Row gutter={[15, 0]} style={{ paddingTop: '5px' }}>
                          <Col md={{ span: 12 }} xs={{ span: 24 }}>
                            {sendOTPData.isValidate && (
                              <Alert
                                message={
                                  sendOTPData.isValidate
                                    ? t('otp_sent')
                                    : t('otp_send_failed')
                                }
                                type={
                                  sendOTPData.isValidate ? 'success' : 'error'
                                }
                                showIcon
                                closable
                              />
                            )}
                          </Col>
                          <Col md={{ span: 12 }} xs={{ span: 24 }}>
                            {verifyOTPData.data !== 'init' && (
                              <Alert
                                message={
                                  verifyOTPData.isValidate
                                    ? t('otp_verified')
                                    : t('otp_verification_failed')
                                }
                                type={
                                  verifyOTPData.isValidate ? 'success' : 'error'
                                }
                                showIcon
                                closable
                              />
                            )}
                          </Col>
                        </Row>

                        <Row gutter={[15, 0]}>
                          <Col md={{ span: 12 }} xs={{ span: 24 }}>
                            <ValidateField
                              label={
                                <TranslateMessage translateKey={'first_name'} />
                              }
                              required
                              // help={'Help Text'}
                              // hasFeedback={!!touched?.fname && !!errors?.fname}
                              help={
                                touched.firstName && errors.firstName
                                  ? errors.firstName.toString()
                                  : ''
                              }
                              validateStatus={
                                touched.firstName && errors.firstName
                                  ? 'error'
                                  : 'success'
                              }
                            >
                              <Field
                                name='firstName'
                                component={CustomInput}
                                placeholder='Ex: Saman'
                                disabled={!verifyOTPData.isValidate}
                                maxLength='50'
                              />
                            </ValidateField>
                          </Col>
                          <Col md={{ span: 12 }} xs={{ span: 24 }}>
                            <ValidateField
                              label={
                                <TranslateMessage translateKey={'last_name'} />
                              }
                              // help={'Help Text'}
                              help={
                                touched.lastName && errors.lastName
                                  ? errors.lastName.toString()
                                  : ''
                              }
                              validateStatus={
                                touched.lastName && errors.lastName
                                  ? 'error'
                                  : 'success'
                              }
                            >
                              <Field
                                name='lastName'
                                component={CustomInput}
                                placeholder='Ex: Perera'
                                disabled={!verifyOTPData.isValidate}
                                maxLength='50'
                              />
                            </ValidateField>
                          </Col>
                        </Row>

                        <Row gutter={[15, 0]}>
                          <Col md={{ span: 24 }} xs={{ span: 24 }}>
                            <ValidateField
                              label={
                                <TranslateMessage translateKey={'address'} />
                              }
                              required
                              // help={'Help Text'}
                              // hasFeedback={!!touched?.fname && !!errors?.fname}
                              help={
                                touched.consumerAddress &&
                                errors.consumerAddress
                                  ? errors.consumerAddress.toString()
                                  : ''
                              }
                              validateStatus={
                                touched.consumerAddress &&
                                errors.consumerAddress
                                  ? 'error'
                                  : 'success'
                              }
                            >
                              <Field
                                name='consumerAddress'
                                component={CustomInput}
                                placeholder='Ex: 399/8, Station Road, Colombo'
                                disabled={!verifyOTPData.isValidate}
                                maxLength='100'
                              />
                            </ValidateField>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <ValidateField>
                              <Button
                                className='submit-button'
                                htmlType='submit'
                                disabled={!verifyOTPData.isValidate}
                                // onClick={submitHandler}
                              >
                                <TranslateMessage translateKey={'next'} />
                              </Button>
                            </ValidateField>
                          </Col>
                        </Row>
                      </Form>
                    )
                  }}
                </Formik>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* <Watchman initialMinute={0} initialSeconds={10} /> */}
    </Spin>
  )
}

export default Registration
