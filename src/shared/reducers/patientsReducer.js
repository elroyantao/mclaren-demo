import createReducer from '../lib/create-reducer'

const initialState = []

export default createReducer(initialState, {
  FETCH_PATIENTS_RESPONSE: (state, { patients }) => patients
})
