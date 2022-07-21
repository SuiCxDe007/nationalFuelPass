import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DEBOUNCE_LIMIT } from '../../constants/Constants'
import EndPoints from '../../utils/EndPoint'
import * as API from '../../utils/HTTPClient'
import history from '../../_helpers/history'
import debounce from 'lodash/debounce'
import {
  GET_CONSUMER_UID_TYPES,
  GET_ITEM_CATEGORIES,
  GET_ITEM_SUB_CATEGORIES,
  GET_TOKEN_BY_UUID,
  REGISTER,
  SEND_OTP,
  VERIFY_NIC,
  VERIFY_OTP,
} from './types'

// export interface LoginState {
//   value: number
//   data: any
// }

const initialState: any = {
  verifyNICData: {
    mobile: {},
    loading: true,
    pending: false,
    hasError: false,
    validate: '',
    isValidate: true,
    data: [],
    error: {},
  },

  loginData: {
    mobile: {},
    loading: true,
    pending: false,
    hasError: false,
    data: [],
    error: {},
  },
  registerInfo: {
    data: {
      consumerUid: '',
      mobileNo: '',
      otp: '',
      firstName: '',
      lastName: '',
      consumerUidType: 1,
      consumerAddress: '',
    },
    isCompleteStep1: false,
  },
  registerData: {
    mobile: {},
    loading: true,
    pending: false,
    hasError: false,
    isValidate: false,
    data: [],
    error: {},
  },
  itemCategoriesData: {
    mobile: {},
    loading: true,
    pending: false,
    hasError: false,
    data: [],
    error: {},
  },
  itemSubCategoriesData: {
    loading: true,
    pending: false,
    hasError: false,
    data: [],
    error: {},
  },
  verifyChassisNumberData: {
    loading: true,
    pending: false,
    hasError: false,
    data: [],
    error: {},
  },
  // getQRCodeInfoData: {
  //   loading: true,
  //   pending: false,
  //   hasError: false,
  //   data: [],
  //   error: {},
  // },
  getConsumerUidTypesData: {
    loading: true,
    pending: false,
    hasError: false,
    data: [],
    error: {},
  },
  sendOTPData: {
    mobile: {},
    loading: true,
    pending: false,
    hasError: false,
    isValidate: false,
    data: 'init',
    error: {},
  },
  verifyOTPData: {
    mobile: {},
    loading: true,
    pending: false,
    hasError: false,
    data: 'init',
    error: {},
    isValidate: false,
  },
  getTokenByUUIDData: {
    loading: true,
    pending: false,
    hasError: false,
    data: [],
    error: {},
  },
  registrationStartedAt: null,
}

/**
 * Verify NIC
 */
const verifyNICHandler = createAsyncThunk(
  VERIFY_NIC,
  async (amount: any, { rejectWithValue, dispatch }: any) => {
    // debugger
    try {
      const response = await API.Post(EndPoints.VERIFY_NIC, {
        consumerUid: amount?.data?.consumerUid,
        cousumerUidType: amount?.data?.consumerUidType,
      })
      amount?.successCallBack(amount?.data)
      dispatch(initRegistrationStartedAt())
      history.push('/register-ii')

      return response
    } catch (error: any) {
      // const consumerUidType = amount?.data?.consumerUidType || 1
      // let consumerUidTypeLabels = ['NIC', 'Passport', 'BRN']

      // amount.failCallBack({
      //   msg: error?.response?.data?.msg || 'something_went_wrong',
      //   consumerUidTypeLabel: consumerUidTypeLabels[consumerUidType - 1],
      // })
      amount?.failCallBack({
        msg: error?.response?.data?.msg || 'something_went_wrong',
      })
      dispatch(initRegistrationStartedAt())

      return rejectWithValue(error)
    }
  }
)
const verifyNICDebouncedHandler = debounce(
  (arg, dispatch) => dispatch(verifyNICHandler(arg)),
  DEBOUNCE_LIMIT,
  { leading: true }
)
export const verifyNIC = (arg: any) => (dispatch: any) =>
  verifyNICDebouncedHandler(arg, dispatch)

/**
 * REGISTER
 */
const registerHandler = createAsyncThunk(
  REGISTER,
  async (amount: any, { rejectWithValue, dispatch }: any) => {
    try {
      const response = await API.Post(EndPoints.REGISTRATION, amount?.data)
      amount.successCallBack(response.data)
      return response.data
    } catch (error: any) {
      let errorMessage = error?.response?.data?.msg
      if (
        errorMessage === 'OTP Verification Expired' ||
        errorMessage === 'Consumer Verification Expired'
      ) {
        dispatch(resetRegisterInfo)
      }
      amount.failCallBack(error?.response?.data?.msg || 'something_went_wrong')
      return rejectWithValue(error)
    }
  }
)
const registerDebouncedHandler = debounce(
  (arg, dispatch) => dispatch(registerHandler(arg)),
  DEBOUNCE_LIMIT,
  { leading: true }
)
export const register = (arg: any) => (dispatch: any) =>
  registerDebouncedHandler(arg, dispatch)

/**
 * Get Token by UUID
 */
const getTokenByUUIDHandler = createAsyncThunk(
  GET_TOKEN_BY_UUID,
  async (amount: any, { rejectWithValue }: any) => {
    try {
      const response = await API.Get(
        EndPoints.GET_TOKEN_BY_UUID + `/${amount?.data?.token}`
      )
      localStorage.setItem('loginToken', response.data.jwt)
      localStorage.setItem('isRegisterSuccess', 'true')

      API.clearHTTPClient()
      amount.successCallBack(response.data)
      history.replace('/')
      history.push('/dashboard')

      return response.data
    } catch (error: any) {
      amount.failCallBack(error?.response?.data?.msg || 'something_went_wrong')

      return rejectWithValue(error)
    }
  }
)
const getTokenByUUIDDebounceHandler = debounce(
  (arg, dispatch) => dispatch(getTokenByUUIDHandler(arg)),
  DEBOUNCE_LIMIT,
  { leading: true }
)
export const getTokenByUUID = (arg: any) => (dispatch: any) =>
  getTokenByUUIDDebounceHandler(arg, dispatch)

/**
 * Get Item Category
 */
const getItemCategoryHandler = createAsyncThunk(
  GET_ITEM_CATEGORIES,
  async (amount: any, { rejectWithValue }: any) => {
    console.log('🚀 ~ file: registerSlice.ts ~ line 236 ~ amount', amount)
    try {
      const response = await API.Get(EndPoints.GET_ITEM_CATEGORIES)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
const getItemCategoryDebouncedHandler = debounce(
  (arg, dispatch) => dispatch(getItemCategoryHandler(arg)),
  DEBOUNCE_LIMIT,
  { leading: true }
)
export const getItemCategory = (arg: any) => (dispatch: any) =>
  getItemCategoryDebouncedHandler(arg, dispatch)

/**
 * Get Item Sub Category
 */
const getItemSubCategoryHandler = createAsyncThunk(
  GET_ITEM_SUB_CATEGORIES,
  async (amount: any, { rejectWithValue }: any) => {
    try {
      const response = await API.Get(EndPoints.GET_ITEM_SUB_CATEGORIES)
      let itemSubCategoriesData: any[] = []
      response.data.map((item: any, i: any) => {
        itemSubCategoriesData.push({
          value: item.id,
          label: item.label,
        })
      })
      // amount?.isNavigateTo && history.push('/otp')
      return itemSubCategoriesData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
const getItemSubCategoryDebouncedHandler = debounce(
  (arg, dispatch) => dispatch(getItemSubCategoryHandler(arg)),
  DEBOUNCE_LIMIT,
  { leading: true }
)
export const getItemSubCategory = (arg: any) => (dispatch: any) =>
  getItemSubCategoryDebouncedHandler(arg, dispatch)

/**
 * Get Item Category
 */
const getConsumerUidTypesHandler = createAsyncThunk(
  GET_CONSUMER_UID_TYPES,
  async (amount: any, { rejectWithValue }: any) => {
    try {
      const response = await API.Get(EndPoints.GET_CONSUMER_UID_TYPES)
      return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
const getConsumerUidTypesDebouncedHandler = debounce(
  (arg, dispatch) => dispatch(getConsumerUidTypesHandler(arg)),
  DEBOUNCE_LIMIT,
  { leading: true }
)
export const getConsumerUidTypes = (arg: any) => (dispatch: any) =>
  getConsumerUidTypesDebouncedHandler(arg, dispatch)

/**
 * Send OTP Code
 */
const sendOTPHandler = createAsyncThunk(
  SEND_OTP,
  async (amount: any, { fulfillWithValue, rejectWithValue }: any) => {
    // debugger
    try {
      const response = await API.Post(EndPoints.SEND_OTP, {
        mobileNo: amount?.data?.mobileNo,
      })
      amount.successCallBack(amount?.data)
      amount?.isNavigateTo && history.push('/otp')
      return response.data
    } catch (error: any) {
      amount.failCallBack(error?.response?.data?.msg || 'something_went_wrong')
      return rejectWithValue(error)
    }
  }
)
const sendOTPDebouncedHandler = debounce(
  (arg, dispatch) => dispatch(sendOTPHandler(arg)),
  DEBOUNCE_LIMIT,
  { leading: true }
)
export const sendOTP = (arg: any) => (dispatch: any) =>
  sendOTPDebouncedHandler(arg, dispatch)

/**
 * Verify OTP Code
 */
const verifyOTPHandler = createAsyncThunk(
  VERIFY_OTP,
  async (amount: any, { rejectWithValue }) => {
    try {
      const response = await API.Post(EndPoints.VERIFY_OTP, {
        mobileNo: amount?.data?.mobileNo,
        otp: amount?.data?.otp,
      })
      amount.successCallBack()
      return response
    } catch (error: any) {
      amount.failCallBack()
      return rejectWithValue(error?.code || 'something_went_wrong')
    }
  }
)
const verifyOTPDebouncedHandler = debounce(
  (arg, dispatch) => dispatch(verifyOTPHandler(arg)),
  DEBOUNCE_LIMIT,
  { leading: true }
)
export const verifyOTP = (arg: any) => (dispatch: any) =>
  verifyOTPDebouncedHandler(arg, dispatch)

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    fillRegisterInfo: (state, action: PayloadAction<any>) => {
      state.registerInfo.data = action.payload
      state.registerInfo.isCompleteStep1 = true
    },
    resetRegisterInfo: (state) => {
      state.registerInfo = initialState.registerInfo
    },
    resetVerifyNICData: (state) => {
      state.verifyNICData = initialState.verifyNICData
    },
    resetSendOTPData: (state) => {
      state.sendOTPData = initialState.sendOTPData
    },
    initRegistrationStartedAt: (state) => {
      state.registrationStartedAt = new Date()
    },
    resetRegistrationStartedAt: (state, action: PayloadAction<any>) => {
      state.registrationStartedAt = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyNICHandler.pending, (state, action: any) => {
        state.verifyNICData.mobile = action.meta.arg.mobile
        state.verifyNICData.loading = true
        state.verifyNICData.pending = true
        state.verifyNICData.validate = 'validating'
      })
      .addCase(verifyNICHandler.fulfilled, (state, action) => {
        state.verifyNICData.loading = false
        state.verifyNICData.pending = false
        state.verifyNICData.data = action.payload
        state.verifyNICData.validate = 'success'
        state.verifyNICData.isValidate = true
      })
      .addCase(verifyNICHandler.rejected, (state, action) => {
        state.verifyNICData.loading = false
        state.verifyNICData.pending = false
        state.verifyNICData.hasError = true
        state.verifyNICData.error = action.payload
      })
      .addCase(registerHandler.pending, (state, action: any) => {
        state.registerData.loading = true
        state.registerData.pending = true
      })
      .addCase(registerHandler.fulfilled, (state, action) => {
        state.registerData.loading = false
        state.registerData.pending = false
        state.registerData.isValidate = true
        state.registerData.data = action.payload
      })
      .addCase(registerHandler.rejected, (state, action) => {
        state.registerData.loading = false
        state.registerData.hasError = true
        state.registerData.pending = false
        state.registerData.isValidate = false
        state.registerData.error = action.payload
      })
      .addCase(getItemCategoryHandler.pending, (state, action: any) => {
        state.itemCategoriesData.loading = true
        state.itemCategoriesData.pending = true
      })
      .addCase(getItemCategoryHandler.fulfilled, (state, action) => {
        state.itemCategoriesData.loading = false
        state.itemCategoriesData.pending = false
        state.itemCategoriesData.data = action.payload
      })
      .addCase(getItemCategoryHandler.rejected, (state, action) => {
        state.itemCategoriesData.loading = false
        state.itemCategoriesData.hasError = true
        state.itemCategoriesData.pending = false
        state.itemCategoriesData.error = action.payload
      })
      .addCase(getItemSubCategoryHandler.pending, (state, action: any) => {
        state.itemSubCategoriesData.loading = true
        state.itemSubCategoriesData.pending = true
      })
      .addCase(getItemSubCategoryHandler.fulfilled, (state, action) => {
        state.itemSubCategoriesData.loading = false
        state.itemSubCategoriesData.pending = false
        state.itemSubCategoriesData.data = action.payload
      })
      .addCase(getItemSubCategoryHandler.rejected, (state, action) => {
        state.itemSubCategoriesData.loading = false
        state.itemSubCategoriesData.hasError = true
        state.itemSubCategoriesData.pending = false
        state.itemSubCategoriesData.error = action.payload
      })
      // .addCase(verifyChassisNumberAction.pending, (state, action: any) => {
      //   state.verifyChassisNumberData.loading = true
      //   state.verifyChassisNumberData.pending = true
      // })
      // .addCase(verifyChassisNumberAction.fulfilled, (state, action) => {
      //   state.verifyChassisNumberData.loading = false
      //   state.verifyChassisNumberData.pending = false
      //   state.verifyChassisNumberData.data = action.payload
      // })
      // .addCase(verifyChassisNumberAction.rejected, (state, action) => {
      //   state.verifyChassisNumberData.loading = false
      //   state.verifyChassisNumberData.hasError = true
      //   state.verifyChassisNumberData.pending = false
      //   state.verifyChassisNumberData.error = action.payload
      // })
      .addCase(getConsumerUidTypesHandler.pending, (state, action: any) => {
        state.getConsumerUidTypesData.loading = true
        state.getConsumerUidTypesData.pending = true
      })
      .addCase(getConsumerUidTypesHandler.fulfilled, (state, action) => {
        state.getConsumerUidTypesData.loading = false
        state.getConsumerUidTypesData.pending = false
        state.getConsumerUidTypesData.data = action.payload
      })
      .addCase(getConsumerUidTypesHandler.rejected, (state, action) => {
        state.getConsumerUidTypesData.loading = false
        state.getConsumerUidTypesData.hasError = true
        state.getConsumerUidTypesData.pending = false
        state.getConsumerUidTypesData.error = action.payload
      })
      .addCase(sendOTPHandler.pending, (state, action: any) => {
        state.sendOTPData.mobile = action.meta.arg.mobile
        state.sendOTPData.loading = true
        state.sendOTPData.pending = true
        state.sendOTPData.isValidate = false
      })
      .addCase(sendOTPHandler.fulfilled, (state, action) => {
        state.sendOTPData.loading = false
        state.sendOTPData.pending = false
        state.sendOTPData.isValidate = true
        state.sendOTPData.data = action.payload
      })
      .addCase(sendOTPHandler.rejected, (state, action) => {
        state.sendOTPData.loading = false
        state.sendOTPData.hasError = true
        state.sendOTPData.pending = false
        state.sendOTPData.isValidate = false
        state.sendOTPData.error = action.payload
      })
      .addCase(verifyOTPHandler.pending, (state, action: any) => {
        state.verifyOTPData.loading = true
        state.verifyOTPData.pending = true
      })
      .addCase(verifyOTPHandler.fulfilled, (state, action) => {
        state.verifyOTPData.loading = false
        state.verifyOTPData.pending = false
        state.verifyOTPData.data = true
        state.verifyOTPData.isValidate = true
      })
      .addCase(verifyOTPHandler.rejected, (state, action) => {
        state.verifyOTPData.loading = false
        state.verifyOTPData.pending = false
        state.verifyOTPData.hasError = true
        state.verifyOTPData.error = action.payload
        state.verifyOTPData.data = false
        state.verifyOTPData.isValidate = false
      })
      .addCase(getTokenByUUIDHandler.pending, (state, action: any) => {
        state.getTokenByUUIDData.loading = true
        state.getTokenByUUIDData.pending = true
      })
      .addCase(getTokenByUUIDHandler.fulfilled, (state, action) => {
        state.getTokenByUUIDData.loading = false
        state.getTokenByUUIDData.pending = false
        state.getTokenByUUIDData.data = true
        state.getTokenByUUIDData.isValidate = true
        state.registerInfo = initialState.registerInfo
        state.sendOTPData = initialState.sendOTPData
        state.verifyOTPData = initialState.verifyOTPData
      })
      .addCase(getTokenByUUIDHandler.rejected, (state, action) => {
        state.getTokenByUUIDData.loading = false
        state.getTokenByUUIDData.pending = false
        state.getTokenByUUIDData.hasError = true
        state.getTokenByUUIDData.error = action.payload
        state.getTokenByUUIDData.data = false
        state.getTokenByUUIDData.isValidate = false
      })
  },
})

export const {
  fillRegisterInfo,
  resetVerifyNICData,
  resetRegisterInfo,
  resetSendOTPData,
  initRegistrationStartedAt,
  resetRegistrationStartedAt,
} = registerSlice.actions

export default registerSlice.reducer
