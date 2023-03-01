import 'whatwg-fetch'
import App from "./App.svelte"
import { SpaRouter } from 'svelte-router-spa'
import { routes } from './routes'

SpaRouter({
  routes,
  pathName: document.location.href
}).getActiveRoute

const app = new App({
  target: document.body
})

export default app