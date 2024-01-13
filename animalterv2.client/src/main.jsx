import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import store from './store/store.js';
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <Provider store={store} >
      <CookiesProvider>

        <App />

      </CookiesProvider>
    </Provider>
  </BrowserRouter>
  
  
)
