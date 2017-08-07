import createReducer from '../lib/create-reducer'

const initialState = {}

export default createReducer(initialState, {
  FETCH_PATIENTSACTIVITY_RESPONSE: (state, { activities }) => activities
})
