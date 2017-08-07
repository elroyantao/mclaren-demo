import createReducer from '../lib/create-reducer'

const initialState = ''

export default createReducer(initialState, {
  CHANGE_SORT: (state, { sortBy }) => sortBy
})
