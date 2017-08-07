import createReducer from '../lib/create-reducer'

const initialState = []

export default createReducer(initialState, {
  SET_LIST: (state, { patients }) => patients
})
