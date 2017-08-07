import { Server } from 'hapi'
import Vision from 'vision'
import Inert from 'inert'
import handlebars from 'handlebars'

import routes from './routes'

const server = new Server()
server.connection({ port: process.env.PORT || 3000, host: 'localhost' })

server.register([Vision, Inert], () => {
  server.views({
    engines: { html: handlebars },
    relativeTo: __dirname,
    path: 'templates'
  })
  server.route(routes)
})

export default server
