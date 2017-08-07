export function getActivityDefinitions(req, reply) {
  // eslint-disable-next-line global-require
  const activities = require('../lib/mock-api-data/definitions/activities.json')
  reply(activities)
}
