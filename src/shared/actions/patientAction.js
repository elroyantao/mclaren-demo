import 'isomorphic-fetch'

export function fetchPatientsRequest() {
  return {
    type: 'FETCH_PATIENTS_REQUEST'
  }
}

export function fetchPatientsResponse(patients) {
  return {
    type: 'FETCH_PATIENTS_RESPONSE',
    patients
  }
}

export function fetchPatientsFailure() {
  return {
    type: 'FETCH_PATIENTS_FAILURE'
  }
}

export const fetchPatients = () => (dispatch) => {
  dispatch(fetchPatientsRequest())
  return fetch('/api/patients', { method: 'GET' })
    .then((response) => {
      if (!response.ok) throw Error(response.statusText)
      return response.json()
    })
    .then((response) => {
      dispatch(fetchPatientsResponse(response))
    })
    .catch(() => {
      dispatch(fetchPatientsFailure())
    })
}

export function fetchPatientsActivityRequest() {
  return {
    type: 'FETCH_PATIENTSACTIVITY_REQUEST'
  }
}

export function fetchPatientsActivityResponse(activities) {
  return {
    type: 'FETCH_PATIENTSACTIVITY_RESPONSE',
    activities
  }
}

export function fetchPatientsActivityFailure() {
  return {
    type: 'FETCH_PATIENTSACTIVITY_FAILURE'
  }
}

export const fetchPatientsActivity = () => (dispatch) => {
  dispatch(fetchPatientsActivityRequest())
  return fetch('/api/activity', { method: 'GET' })
    .then((response) => {
      if (!response.ok) throw Error(response.statusText)
      return response.json()
    })
    .then((response) => {
      dispatch(fetchPatientsActivityResponse(response))
    })
    .catch(() => {
      dispatch(fetchPatientsActivityFailure())
    })
}

export function setList(patients) {
  return {
    type: 'SET_LIST',
    patients
  }
}

export function generatePatientIntensity(patientActivity, activities) {
  const initialIntensity = {
    moderate: 0,
    vigorous: 0
  }
  return patientActivity.reduce((prev, activity) => {
    if (activities[activity.activity] === 'moderate') {
      return {
        ...prev,
        moderate: prev.moderate + activity.minutes
      }
    } else if (activities[activity.activity] === 'vigorous') {
      return {
        ...prev,
        vigorous: prev.vigorous + activity.minutes
      }
    }
    return prev
  }, initialIntensity)
}

export const generatePatientList = () => (dispatch, getState) => {
  const { patients, activities: activityDefinition, patientActivities } = getState()
  const patientList = patients.reduce((prev, patient) => {
    const activities = patientActivities[patient.id]
    const intensity = generatePatientIntensity(activities, activityDefinition)
    return [...prev, { ...patient, intensity, activities }]
  }, [])
  // const filteredList = applyFilters(list, filters)
  dispatch(setList(patientList))
}
