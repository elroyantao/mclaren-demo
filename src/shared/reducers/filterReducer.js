import createReducer from '../lib/create-reducer'

const initialState = {
  gender: null,
  activity: null
}

export default createReducer(initialState, {
  SET_FILTER: (state, { filter, value }) => ({
    ...state,
    [filter]: value
  })
})
