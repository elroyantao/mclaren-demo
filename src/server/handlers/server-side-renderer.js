import { APP_CONTAINER_CLASS } from '../../shared/config'
import { getScripts } from '../lib/get-assets'

export default function serverSideRenderer(request, reply) {
  const scripts = getScripts()
  return reply.view('index', {
    title: 'Demo - app',
    APP_CONTAINER_CLASS,
    scripts
  })
}
