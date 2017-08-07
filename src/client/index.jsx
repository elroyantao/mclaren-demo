import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import App from './App'
import { APP_CONTAINER_CLASS } from '../shared/config'
import configureStore from '../shared/lib/configure-store'

const rootEl = document.querySelector(`.${APP_CONTAINER_CLASS}`)

const store = configureStore()

const wrapApp = (AppComponent, reduxStore) => (
  <Provider store={reduxStore}>
    <AppContainer>
      <AppComponent />
    </AppContainer>
  </Provider>
)


render(wrapApp(App, store), rootEl)

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default
    render(wrapApp(NextApp, store), rootEl)
  })
}
