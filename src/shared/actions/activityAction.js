import 'isomorphic-fetch'

export function fetchActiviyDefRequest() {
  return {
    type: 'FETCH_ACTIVITYDEF_REQUEST'
  }
}

export function fetchActiviyDefResponse(activities) {
  return {
    type: 'FETCH_ACTIVITYDEF_RESPONSE',
    activities
  }
}

export function fetchActiviyDefFailure() {
  return {
    type: 'FETCH_ACTIVITYDEF_FAILURE'
  }
}

export const fetchActiviyDef = () => (dispatch) => {
  dispatch(fetchActiviyDefRequest())
  return fetch('/api/activity-definition', { method: 'GET' })
    .then((response) => {
      if (!response.ok) throw Error(response.statusText)
      return response.json()
    })
    .then((response) => {
      dispatch(fetchActiviyDefResponse(response))
    })
    .catch(() => {
      dispatch(fetchActiviyDefFailure())
    })
}
