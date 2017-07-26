import React from 'react'
import { render } from 'react-dom'
import './app.style.sass'

import App from './app.layout'
import AppState from './app.state'
import { Provider } from 'react-redux'

const Application = () => (
  <Provider store={AppState}>
    <App />
  </Provider>
)

const root = document.getElementById('root')
render(<Application />, root)
