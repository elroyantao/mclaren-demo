import server from './server'

server.start((err) => {
  if (err) {
    throw err
  }
  console.log('info', `Server running on port ${server.info.uri}`)
})
