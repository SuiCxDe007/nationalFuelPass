import { FC, useEffect, useState } from 'react'
import { Modal, Spin } from 'antd'
import { Col, Row, Button, Select, Checkbox } from 'antd'
import TranslateMessage from '../components/translateManager/TranslateMessage'
import { Formik, Form as FormikForm, Field } from 'formik'
import * as Yup from 'yup'
import { ValidateField } from '../components/CustomComponents'
import {
  getItemCategory,
  getItemSubCategory,
  getTokenByUUID,
  register,
} from '../modules/register/registerSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { CustomInput } from '../components/makeFields/CustomFormFields'
import { CustomRadioGroup } from '../components/makeFields/CustomRadioGroup'
import RegisterHeader from '../components/header/RegisterHeader'
import { useTranslation } from 'react-i18next'
import { getRandamNumber } from '../utils/services'
import TermAndConditions from './TermAndConditions'
// import { getQRCodeInfo } from '../modules/register/registerSlice'
import Cookies from 'js-cookie'
import { V_NUMBER_PREFIX_REGEX } from '../constants/Validations'
import TokenRetryModal from '../components/modals/TokenRetryModal'
import { DEFAULT_LANGUAGE_CODE } from '../assets/lngProvider'
// import { getQRId } from '../modules/login/loginSlice'
// import history from '../_helpers/history'

const { Option } = Select

const error = (msg: any) => {
  Modal.error({
    title: 'Registration Failed',
    content: msg,
  })
}

const RegistrationII: FC<any> = (props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const currentLanguageCode = Cookies.get('i18next') || DEFAULT_LANGUAGE_CODE

  const [waiting, setWaiting] = useState<boolean>(false)
  const [itemSubCategoriesArr, setItemSubCategoriesArr] = useState<any[]>([])

  const [termAndCondition, setTermAndCondition] = useState<boolean>(false)
  const [isRetryToken, setIsRetryToken] = useState<boolean>(false)

  const registerData = useAppSelector((state) => state.register.registerData)
  const registerInfo = useAppSelector((state) => state.register.registerInfo)
  const profileData = useAppSelector((state) => state.login.profileData)
  const getTokenByUUIDData = useAppSelector(
    (state) => state.register.getTokenByUUIDData
  )

  const itemCategoriesData = useAppSelector(
    (state) => state.register.itemCategoriesData
  )
  const itemSubCategoriesData = useAppSelector(
    (state) => state.register.itemSubCategoriesData
  )

  useEffect(() => {
    if (!registerInfo.isCompleteStep1) props.history.push('/register')

    let isLoadCategory =
      !itemCategoriesData.loading && !itemCategoriesData.hasError
    let isLoadSubCategory =
      !itemSubCategoriesData.loading && !itemSubCategoriesData.hasError

    !isLoadCategory && dispatch(getItemCategory('category'))
    !isLoadSubCategory && dispatch(getItemSubCategory('subCategory'))
  }, [])

  useEffect(() => {
    setFuelTypeTranslations()
  }, [currentLanguageCode])

  useEffect(() => {
    setFuelTypeTranslations()
  }, [itemSubCategoriesData])

  const setFuelTypeTranslations = () => {
    let data: any[] = []
    itemSubCategoriesData.data.map((item: any, i: any) => {
      data.push({
        value: item.value,
        label: t(item.label),
      })
    })
    setItemSubCategoriesArr(data)
  }

  const backStepHandler = () => {
    props.history.push('/register')
  }

  const validationSchema = Yup.object({
    vnumberPrefix: Yup.string()
      .max(3, t('vehicle_number_invalid'))
      .required(t('vehicle_number_required'))
      .test(
        'validate_vnumber_content',
        t('vehicle_number_invalid'),
        (value: any): boolean => {
          return !(value === '0' || value === 'o')
        }
      )
      .test(
        'validate_vnumber_content_format',
        t('vehicle_number_invalid'),
        (value: any): boolean => {
          return V_NUMBER_PREFIX_REGEX.test(value)
        }
      ),
    vnumber: Yup.number()
      .typeError(t('vehicle_number_invalid'))
      .positive(t('vehicle_number_invalid'))
      .integer(t('vehicle_number_invalid'))
      .max(9999, t('vehicle_number_invalid'))
      .required(t('vehicle_number_required')),
    itemCategory: Yup.string().required(t('vehicle_type_required')),
    itemSerialNo: Yup.string().required(t('chassis_number_required')),
    itemSubCategory: Yup.string().required(t('fuel_type_required')),
    agree: Yup.boolean().oneOf([true], t('this_field_must_be_checked')),
  })

  const successCallBack = (data: any) => {
    const getQRInfoDto = {
      token: data.token,
    }

    setWaiting(true)

    setTimeout(() => {
      // dispatch(
      //   getQRCodeInfo({
      //     data: getQRInfoDto,
      //     successCallBack: successGetQRCodeInfoCallBack,
      //     failCallBack: failGetQRCodeInfoCallback,
      //   })
      // )
      dispatch(
        getTokenByUUID({
          data: getQRInfoDto,
          failCallBack: failGetQRCodeInfoCallback,
          successCallBack: successGetQRCodeInfoCallback,
        })
      )
      // setWaiting(false)
    }, getRandamNumber() + 10000)
  }

  const failCallBack = (msg: any) => {
    // setIsRetryToken(true)
    setWaiting(false)
    error(t(msg))
  }

  const successGetQRCodeInfoCallback = (data: any) => {
    setWaiting(false)

    // console.log('RegistrationII successGetQRCodeInfoCallback ~ data ', data)
    // setIsRetryToken(true)
  }

  const failGetQRCodeInfoCallback = (msg: any) => {
    if (msg === 'invalid _token') {
      setIsRetryToken(true)
    } else {
      error(t(msg))
    }
    setWaiting(false)

    // error('QR Code info failed')
  }

  const termAndCondtionHandler = () => {
    setTermAndCondition(!termAndCondition)
  }

  const toggleRetryTokenHandler = () => {
    setIsRetryToken(!isRetryToken)
  }

  const subCategoryHandler = (value: any) => {
    let eligibleFuelTypes: any[] = []
    // itemSubCategoriesData.map(())
    // Bus
    if (value === 6) {
      itemSubCategoriesData.data.map((item: any, i: number) => {
        if (item.value !== 2) {
          // Except Petrol
          eligibleFuelTypes.push(item)
        }
      })
    }
    // Bike
    else if (value === 5) {
      itemSubCategoriesData.data.map((item: any, i: number) => {
        if (item.value !== 1) {
          // Except Diesel
          eligibleFuelTypes.push(item)
        }
      })
    } else {
      eligibleFuelTypes = itemSubCategoriesData.data
    }

    setItemSubCategoriesArr(eligibleFuelTypes)
  }

  return (
    <Spin spinning={waiting || registerData.pending || profileData.pending}>
      <div className='registration-form-container'>
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 18, offset: 3 }}>
            <div className='registration-form'>
              <RegisterHeader personal_details={true} vehicle_details={true} />

              <div className='form-container'>
                <Formik
                  initialValues={{
                    vnumberPrefix: '',
                    vnumber: '',
                    itemCategory: '',
                    itemSerialNo: '',
                    // revenueNumber: '',
                    itemSubCategory: '',
                    agree: false,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values: any, props) => {
                    // setWaiting(true)
                    // setTimeout(() => {
                    const {
                      vnumberPrefix,
                      vnumber,
                      itemCategory,
                      itemSerialNo,
                      // revenueNumber,
                      itemSubCategory,
                    } = values
                    const vPrefix = vnumberPrefix.toUpperCase()
                    const itemNo = `${vPrefix?.trim()}-${vnumber?.trim()}`
                    const registerDto: any = {
                      consumerAddress: registerInfo?.data?.consumerAddress,
                      consumerUid: registerInfo?.data?.consumerUid,
                      consumerUidType: registerInfo?.data?.consumerUidType,
                      firstName: registerInfo?.data?.firstName,
                      lastName: registerInfo?.data?.lastName,
                      mobileNo: registerInfo?.data?.mobileNo,
                      itemNo: itemNo,
                      itemCategory: +itemCategory,
                      itemSerialNo: itemSerialNo,
                      itemSubCategory: +itemSubCategory,
                    }

                    dispatch(
                      register({
                        data: registerDto,
                        successCallBack: successCallBack,
                        failCallBack: failCallBack,
                      })
                    )

                    // setWaiting(false)
                    // }, getRandamNumber())

                    // props.history.push('/register-ii')
                  }}
                >
                  {({
                    errors,
                    touched,
                    values,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    setFieldError,
                    handleSubmit,
                  }) => (
                    <FormikForm onSubmit={handleSubmit}>
                      <Row gutter={[15, 0]}>
                        <Col md={{ span: 12 }} xs={{ span: 24 }}>
                          <ValidateField
                            label={
                              <TranslateMessage
                                translateKey={'vehicle_number'}
                              />
                            }
                            required
                            help={
                              touched.vnumberPrefix && errors.vnumberPrefix
                                ? errors.vnumberPrefix.toString()
                                : touched.vnumber && errors.vnumber
                                ? errors.vnumber.toString()
                                : ''
                            }
                            validateStatus={
                              touched.vnumberPrefix && errors.vnumberPrefix
                                ? 'error'
                                : touched.vnumber && errors.vnumber
                                ? 'error'
                                : 'success'
                            }
                          >
                            <Row gutter={[10, 10]}>
                              <Col span={8}>
                                <Field
                                  name='vnumberPrefix'
                                  placeholder='Ex: ABC'
                                  maxLength='3'
                                  component={CustomInput}
                                />
                              </Col>
                              <Col span={16}>
                                <Field
                                  name='vnumber'
                                  placeholder='Ex: 1234'
                                  component={CustomInput}
                                />
                              </Col>
                            </Row>
                          </ValidateField>
                        </Col>
                        <Col md={{ span: 12 }} xs={{ span: 24 }}>
                          <ValidateField
                            label={
                              <TranslateMessage translateKey={'vehicle_type'} />
                            }
                            required
                            help={
                              touched.itemCategory && errors.itemCategory
                                ? errors.itemCategory.toString()
                                : ''
                            }
                            validateStatus={
                              touched.itemCategory && errors.itemCategory
                                ? 'error'
                                : 'success'
                            }
                          >
                            <Select
                              showSearch
                              placeholder='Select Type'
                              optionFilterProp='children'
                              onChange={(value) => {
                                setFieldValue('itemSubCategory', '')
                                setFieldValue('itemCategory', value)
                                subCategoryHandler(value)
                              }}
                              filterOption={(input, option) =>
                                (option!.children as unknown as string)
                                  .toLowerCase()
                                  .includes(input.toLowerCase())
                              }
                            >
                              {itemCategoriesData?.data.map(
                                (op: any, i: any) => {
                                  return (
                                    <Option key={i} value={op.id}>
                                      {t(op.label)}
                                    </Option>
                                  )
                                }
                              )}
                            </Select>
                          </ValidateField>
                        </Col>
                      </Row>

                      <Row gutter={[15, 0]}>
                        <Col md={{ span: 24 }} xs={{ span: 24 }}>
                          <ValidateField
                            label={
                              <TranslateMessage
                                translateKey={'chassis_number'}
                              />
                            }
                            required
                            help={
                              touched.itemSerialNo && errors.itemSerialNo
                                ? errors.itemSerialNo.toString()
                                : ''
                            }
                            validateStatus={
                              touched.itemSerialNo && errors.itemSerialNo
                                ? 'error'
                                : 'success'
                            }
                          >
                            <Field
                              name='itemSerialNo'
                              placeholder='Ex: N786543322'
                              component={CustomInput}
                              maxLength='50'
                            />
                          </ValidateField>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={24}>
                          <ValidateField
                            label={
                              <TranslateMessage
                                translateKey={'select_fuel_type'}
                              />
                            }
                            help={
                              touched.itemSubCategory && errors.itemSubCategory
                                ? errors.itemSubCategory.toString()
                                : ''
                            }
                            validateStatus={
                              touched.itemSubCategory && errors.itemSubCategory
                                ? 'error'
                                : 'success'
                            }
                          >
                            <Field
                              name='itemSubCategory'
                              options={itemSubCategoriesArr}
                              // options={itemSubCategoriesData.data}
                              component={CustomRadioGroup}
                              optionType='button'
                              buttonStyle='solid'
                            />
                          </ValidateField>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={24}>
                          <ValidateField
                            help={
                              touched.agree && errors.agree
                                ? errors.agree.toString()
                                : ''
                            }
                            validateStatus={
                              touched.agree && errors.agree
                                ? 'error'
                                : 'success'
                            }
                          >
                            <Checkbox
                              name='agree'
                              onChange={(value) => {
                                setFieldValue('agree', value.target.checked)
                              }}
                              defaultChecked={false}
                            ></Checkbox>{' '}
                            {currentLanguageCode === 'en' ? (
                              <>
                                <TranslateMessage
                                  translateKey={'i_agree_to_the'}
                                />
                                <span
                                  onClick={termAndCondtionHandler}
                                  className='term-and-conditions'
                                >
                                  <TranslateMessage
                                    translateKey={'terms_and_conditions'}
                                  />
                                  .
                                </span>
                              </>
                            ) : (
                              <>
                                <span
                                  onClick={termAndCondtionHandler}
                                  className='term-and-conditions'
                                >
                                  <TranslateMessage
                                    translateKey={'terms_and_conditions'}
                                  />
                                </span>
                                <TranslateMessage
                                  translateKey={'i_agree_to_the'}
                                />
                              </>
                            )}
                          </ValidateField>
                        </Col>
                      </Row>

                      <Row className='register-back-button'>
                        <Col span={24}>
                          <ValidateField>
                            <Button
                              className='back-button'
                              onClick={backStepHandler}
                            >
                              <TranslateMessage translateKey={'back'} />
                            </Button>
                            <Button
                              className='submit-button'
                              htmlType='submit'
                              disabled={!values?.agree}
                              // onClick={registerHandler}
                            >
                              <TranslateMessage translateKey={'register'} />
                            </Button>
                          </ValidateField>
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
      <TermAndConditions
        visible={termAndCondition}
        toggleHandler={termAndCondtionHandler}
      />
      <TokenRetryModal
        visible={isRetryToken}
        retryTokenHandler={() => successCallBack(registerData.data)}
        toggleHandler={() => toggleRetryTokenHandler()}
        confirmLoading={getTokenByUUIDData.pending || waiting}
      />
    </Spin>
  )
}

export default RegistrationII
