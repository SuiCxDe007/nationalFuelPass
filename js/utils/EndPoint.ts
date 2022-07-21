// export const BASE_URL = 'https/fqms.com'
// export const BASE_URL =
//   'http://k8s-fuel-fuelingr-f2a5ec9bea-1207131668.ap-southeast-1.elb.amazonaws.com'

// export const BASE_URL = 'https://fuelpass.gov.lk'
export const BASE_URL = ''

const EndPoints = {
  // VERIFY_NIC: `${BASE_URL}/verify/nic`,
  VERIFY_NIC: `${BASE_URL}/api/registration/consumerUid`,
  SEND_OTP: `${BASE_URL}/api/otp/registration`,
  // SEND_OTP: `${BASE_URL}/api/otp/registration`,
  // VERIFY_OTP: `${BASE_URL}/api/otp/registration/verify`,
  VERIFY_OTP: `${BASE_URL}/api/otp/registration/verify`,

  VERIFY_UID: `${BASE_URL}/api/registration/consumerUid`,
  REGISTRATION: `${BASE_URL}/api/registration`,
  QR_CODE_INFO: `${BASE_URL}/api/consumer-manager/qr`, // TOBE REMOVE
  GET_TOKEN_BY_UUID: `${BASE_URL}/api/otp/consumer/qr/uuid`,
  CONSUMER_LOGIN: `${BASE_URL}/api/otp/login/consumer`,
  CONSUMER_LOGIN_VERIFY: `${BASE_URL}/api/otp/login/consumer/verify`,

  GET_ITEM_CATEGORIES: `${BASE_URL}/api/consumer/itemCategories`,
  GET_ITEM_SUB_CATEGORIES: `${BASE_URL}/api/consumer/itemSubCategories`,
  GET_CONSUMER_UID_TYPES: `${BASE_URL}/api/consumer/consumerUidTypes`,
  LOGIN_CONSUMER: `${BASE_URL}/api/otp/login/consumer`,
  LOGIN_CONSUMER_VERIFY: `${BASE_URL}/api/otp/login/consumer/verify`,
  GET_PROFILE: `${BASE_URL}/api/consumer-manager/profile`,
  SEND_QR_TO_MOBILE: `${BASE_URL}/api/consumer-manager/sms/profile`,

  TEMP: 'https://jsonplaceholder.typicode.com/users',
}

export default EndPoints
