import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
// import { persistStore } from 'redux-persist'
// import { PersistGate } from 'redux-persist/integration/react'
import { store } from './app/store'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'antd/dist/antd.min.css'
import './index.css'

import { TranslationManager } from './components/translateManager/TranslateManager'
const container = document.getElementById('root')!
const root = createRoot(container)
// let persistor = persistStore(store)

if (process.env.NODE_ENV !== 'development') {
  console.log = () => {}
}

root.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
    <TranslationManager hasDropdown={false}>
      <App />
    </TranslationManager>
    {/* </PersistGate> */}
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
