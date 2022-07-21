import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import loginReducer from '../modules/login/loginSlice'
import registerReducer from '../modules/register/registerSlice'
import thunk from 'redux-thunk'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    register: registerReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: [thunk],
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

// import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
// import storage from 'redux-persist/lib/storage'
// import { combineReducers } from 'redux'
// import { persistReducer } from 'redux-persist'
// import thunk from 'redux-thunk'
// import counterReducer from '../features/counter/counterSlice'
// import loginReducer from '../modules/login/loginSlice'
// import registerReducer from '../modules/register/registerSlice'

// const reducers = combineReducers({
//   counter: counterReducer,
//   login: loginReducer,
//   register: registerReducer,
// })

// const persistConfig = {
//   key: 'login',
//   blacklist: ['register'],
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, reducers)

// export const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== 'production',
//   middleware: [thunk],
// })

// export type AppDispatch = typeof store.dispatch
// export type RootState = ReturnType<typeof store.getState>
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >
