import createReducer from '../lib/create-reducer'

const initialState = {
  apiCount: 0
}

const incrementCount = (state) => ({
  apiCount: state.apiCount + 1
})

const decrementCount = (state) => ({
  apiCount: state.apiCount - 1
})


export default createReducer(initialState, {
  FETCH_PATIENTS_REQUEST: incrementCount,
  FETCH_PATIENTS_RESPONSE: decrementCount,
  FETCH_PATIENTS_FAILURE: decrementCount,
  FETCH_ACTIVITYDEF_REQUEST: incrementCount,
  FETCH_ACTIVITYDEF_RESPONSE: decrementCount,
  FETCH_ACTIVITYDEF_FAILURE: decrementCount,
  FETCH_PATIENTSACTIVITY_REQUEST: incrementCount,
  FETCH_PATIENTSACTIVITY_RESPONSE: decrementCount,
  FETCH_PATIENTSACTIVITY_FAILURE: decrementCount
})
