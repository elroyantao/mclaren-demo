import createReducer from '../lib/create-reducer'

const initialState = {}

export default createReducer(initialState, {
  FETCH_ACTIVITYDEF_RESPONSE: (state, { activities }) => {
    return activities.reduce((prev, activity) => {
      return { ...prev, [activity.activity]: activity.intensity }
    }, {})
  }
})
