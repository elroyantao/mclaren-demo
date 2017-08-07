export function getPatients(req, reply) {
  // eslint-disable-next-line global-require
  const patients = require('../lib/mock-api-data/patients.json')
  reply(patients)
}

export function getPatientActivity(req, reply) {
  // eslint-disable-next-line global-require
  const patients = require('../lib/mock-api-data/patients.json')
  const patientsActivity = patients.reduce((prev, { id }) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const activity = require(`../lib/mock-api-data/patients/${id}/summary.json`)
    return { ...prev, [id]: activity }
  }, {})
  reply(patientsActivity)
}
