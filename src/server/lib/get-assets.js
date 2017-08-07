import { WDS_PORT } from '../../shared/config'

const isProd = process.env.NODE_ENV === 'production'


export function getScripts() {
  const scripts = [
    'js/bundle.js'
  ]
  return scripts.map((script) => {
    return `<script src="${isProd ? '/public/' : `http://localhost:${WDS_PORT}/public/`}${script}"></script>`
  })
}
