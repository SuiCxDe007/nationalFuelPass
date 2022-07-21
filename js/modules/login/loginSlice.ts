import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import EndPoint from '../../utils/EndPoint'
import * as API from '../../utils/HTTPClient'
import history from '../../_helpers/history'
import _ from 'lodash'
import { DEBOUNCE_LIMIT } from '../../constants/Constants'
import debounce from 'lodash/debounce'
import {
  CONSUMER_LOGIN,
  CONSUMER_LOGIN_VERIFY,
  GET_PROFILE,
  SEND_QR_TO_MOBILE,
} from './types'

// export interface LoginState {
//   value: number
//   data: any
// }

const initialState: any = {
  sendQRToMobileData: {
    loading: true,
    pending: false,
    hasError: false,
    data: [],
    error: {},
  },
  reSendOTPData: {
    mobile: {},
    loading: true,
    pending: false,
    hasError: false,
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
  verifyOTPData: {
    mobile: {},
    loading: true,
    pending: false,
    hasError: false,
    data: 'init',
    error: {},
    isValidate: false,
  },
  consumerLoginData: {
    mobile: {},
    loading: true,
    pending: false,
    hasError: false,
    data: 'init',
    error: {},
    isValidate: false,
  },
  consumerLoginVerifyData: {
    mobile: {},
    loading: true,
    pending: false,
    hasError: false,
    data: 'init',
    error: {},
    isValidate: false,
  },
  profileData: {
    mobile: {},
    loading: true,
    pending: false,
    hasError: false,
    data: 'init',
    error: {},
    isValidate: false,
  },
}

/**
 * Send QR To Mobile
 */
const sendQrToMobileHandler = createAsyncThunk(
  SEND_QR_TO_MOBILE,
  async (amount: any, { fulfillWithValue, rejectWithValue }: any) => {
    try {
      const response = await API.Get(EndPoint.SEND_QR_TO_MOBILE)
      amount?.successCallBack()
      return response.data
    } catch (error: any) {
      amount.failCallBack(error?.response?.data?.msg || 'something_went_wrong')

      return rejectWithValue(error)
    }
  }
)
const sendQrToMobileDebouncedHandler = debounce(
  (arg, dispatch) => dispatch(sendQrToMobileHandler(arg)),
  DEBOUNCE_LIMIT,
  { leading: true }
)
export const sendQrToMobile = (arg: any) => (dispatch: any) =>
  sendQrToMobileDebouncedHandler(arg, dispatch)

/**
 * Consumer Login
 */
const consumerLoginHandler = createAsyncThunk(
  CONSUMER_LOGIN,
  async (amount: any, { rejectWithValue }: any) => {
    try {
      const response = await API.Post(EndPoint.CONSUMER_LOGIN, {
        mobileNo: amount?.data?.mobileNo,
        isQr: amount?.data?.isQR,
      })
      amount?.successCallBack && amount?.successCallBack(response.data)
      localStorage.setItem('mobileNo', amount?.data?.mobileNo)

      if (!amount?.isResend) {
        amount?.data?.isQR
          ? history.push(`/login/otp/qr`)
          : history.push(`/login/otp`)
      }
      return response
    } catch (error: any) {
      amount?.failCallBack(error?.response?.data?.msg || 'something_went_wrong')
      return rejectWithValue(error?.code || 'Something went wrong..!')
    }
  }
)
const consumerLoginDebouncedHandler = debounce(
  (arg, dispatch) => dispatch(consumerLoginHandler(arg)),
  DEBOUNCE_LIMIT,
  { leading: true }
)
export const consumerLogin = (arg: any) => (dispatch: any) =>
  consumerLoginDebouncedHandler(arg, dispatch)

/**
 * Consumer Login Verify
 */
const consumerLoginVerifyHandler = createAsyncThunk(
  CONSUMER_LOGIN_VERIFY,
  async (amount: any, { rejectWithValue, dispatch }: any) => {
    try {
      // debugger
      const response = await API.Post(
        EndPoint.CONSUMER_LOGIN_VERIFY,
        amount?.data
      )
      dispatch(resetprofileData())
      localStorage.setItem('loginToken', response.data)
      API.clearHTTPClient()
      history.replace('/')

      // setTimeout(() => {
      //   amount?.isQR
      //     ? history.replace(`/dashboard/qr`)
      //     : history.replace(`/dashboard`)

      //   return response
      // }, 3000)
      amount?.isQR
        ? history.replace(`/dashboard/qr`)
        : history.replace(`/dashboard`)

      localStorage.removeItem('mobileNo')
      amount?.successCallBack()
      return response
    } catch (error: any) {
      // debugger
      dispatch(resetprofileData())

      amount?.failCallBack(error?.response?.data?.msg || 'something_went_wrong')
      return rejectWithValue(error?.code || 'Something went wrong..!')
    }
  }
)
const consumerLoginVerifyDebouncedHandler = debounce(
  (arg, dispatch) => dispatch(consumerLoginVerifyHandler(arg)),
  DEBOUNCE_LIMIT,
  { leading: true }
)
export const consumerLoginVerify = (arg: any) => (dispatch: any) =>
  consumerLoginVerifyDebouncedHandler(arg, dispatch)

/**
 * Get Profile
 */
const getProfileHandler = createAsyncThunk(
  GET_PROFILE,
  async (amount: any, { rejectWithValue }) => {
    try {
      const response = await API.Get(EndPoint.GET_PROFILE)
      amount?.successCallBack()
      return response.data
    } catch (error: any) {
      amount?.failCallBack(error?.response?.data?.msg || 'something_went_wrong')
      return rejectWithValue(error?.code || 'Something went wrong..!')
    }
  }
)
const getProfileDebouncedHandler = debounce(
  (arg, dispatch) => dispatch(getProfileHandler(arg)),
  DEBOUNCE_LIMIT,
  { leading: true }
)
export const getProfile = (arg: any) => (dispatch: any) =>
  getProfileDebouncedHandler(arg, dispatch)

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    sendOTPTest: (state, action: PayloadAction<any>) => {
      state.data = action.payload
    },
    resetprofileData: (state) => {
      state.profileData = initialState.profileData
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendQrToMobileHandler.pending, (state, action: any) => {
        state.sendQRToMobileData.loading = true
        state.sendQRToMobileData.pending = true
      })
      .addCase(sendQrToMobileHandler.fulfilled, (state, action) => {
        state.sendQRToMobileData.loading = false
        state.sendQRToMobileData.pending = false
        state.sendQRToMobileData.data = action.payload
      })
      .addCase(sendQrToMobileHandler.rejected, (state, action) => {
        state.sendQRToMobileData.loading = false
        state.sendQRToMobileData.hasError = true
        state.sendQRToMobileData.pending = false
        state.sendQRToMobileData.error = action.payload
      })
      .addCase(consumerLoginHandler.pending, (state, action: any) => {
        state.consumerLoginData.loading = true
        state.consumerLoginData.pending = true
      })
      .addCase(consumerLoginHandler.fulfilled, (state, action) => {
        state.consumerLoginData.loading = false
        state.consumerLoginData.pending = false
        state.consumerLoginData.data = action.payload
      })
      .addCase(consumerLoginHandler.rejected, (state, action) => {
        state.consumerLoginData.loading = false
        state.consumerLoginData.hasError = true
        state.consumerLoginData.pending = false
        state.consumerLoginData.error = action.payload
      })
      .addCase(consumerLoginVerifyHandler.pending, (state, action: any) => {
        state.consumerLoginVerifyData.loading = true
        state.consumerLoginVerifyData.pending = true
      })
      .addCase(consumerLoginVerifyHandler.fulfilled, (state, action) => {
        state.consumerLoginVerifyData.loading = false
        state.consumerLoginVerifyData.pending = false
        state.profileData.pending = true
        state.consumerLoginVerifyData.data = action.payload
      })
      .addCase(consumerLoginVerifyHandler.rejected, (state, action) => {
        state.consumerLoginVerifyData.loading = false
        state.consumerLoginVerifyData.hasError = true
        state.consumerLoginVerifyData.pending = false
        state.consumerLoginVerifyData.error = action.payload
      })
      .addCase(getProfileHandler.pending, (state, action: any) => {
        state.profileData.loading = true
        state.profileData.pending = true
      })
      .addCase(getProfileHandler.fulfilled, (state, action) => {
        state.profileData.loading = false
        state.profileData.pending = false
        state.profileData.data = action.payload
      })
      .addCase(getProfileHandler.rejected, (state, action) => {
        state.profileData.loading = false
        state.profileData.hasError = true
        state.profileData.pending = false
        state.profileData.error = action.payload
      })
  },
})

export const { sendOTPTest, resetprofileData } = loginSlice.actions

export default loginSlice.reducer
