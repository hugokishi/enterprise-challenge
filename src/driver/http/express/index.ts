import http from 'http'
import express from 'express'

export { Request, Response, NextFunction } from 'express'

let router: express.Application
let server: http.Server

export const create = () => {
  if (router) {
    throw new Error('Http server already created')
  }

  router = express()
  server = http.createServer(router)

  return { router, server, express }
}

export const init = () => {
  if (!router) {
    throw new Error('Http server not created')
  }

  return router
}

export const initWithServer = () => {
  if (!router) {
    throw new Error('Http server not created')
  }

  return { router, server }
}

export default { create, init, initWithServer }
