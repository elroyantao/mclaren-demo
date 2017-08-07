import path from 'path'

import serverSideRenderer from './handlers/server-side-renderer'
import { getPatients, getPatientActivity } from './handlers/patientHandler'
import { getActivityDefinitions } from './handlers/activityHandler'

export default [
  {
    method: 'GET',
    path: '/api/patients',
    handler: getPatients
  },
  {
    method: 'GET',
    path: '/api/activity',
    handler: getPatientActivity
  },
  {
    method: 'GET',
    path: '/api/activity-definition',
    handler: getActivityDefinitions
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, '../..')
      }
    }
  },
  {
    method: 'GET',
    path: '/',
    handler: serverSideRenderer
  }
]
