import React from 'react'
import { render } from 'react-dom'
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { App } from './App'


import { StoreProvider } from './store'
import rootReducer from './store/rootReducer'
import rootActions from './store/rootActions'

const alertOptions = {
  offset: '80px',
  position: 'top right',
  timeout: 6000,  
  transition: 'scale',
  containerStyle: {
    zIndex: 1000000000
  },
} 

render(
  <AlertProvider template={AlertTemplate} {...alertOptions}>
    <StoreProvider rootReducer={rootReducer} rootActions={rootActions} >
      <App />      
    </StoreProvider>
  </AlertProvider>,
 document.getElementById('app'))

