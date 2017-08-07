import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducers from './combine-reducers'

const finalCreateStore = compose(
  applyMiddleware(thunkMiddleware),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
    window.devToolsExtension() : (f) => f
)(createStore)

export default function configureStore(initialState = {}) {
  const store = finalCreateStore(
    reducers,
    initialState
  )
  return store
}
