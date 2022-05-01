import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

import logger from '@app/logger'
import tracer from '@app/tracer'

import { init as InitErrorMiddleware } from './middleware/Error'

import HealthHandler from '@handler/Health'
import CandidateHandler from '@handler/Candidate'

const defineMiddelwares = async (router, express) => {
  router.use(express.json())
  router.use(tracer.middlewareForExpress())
  router.use(
    cors({
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'X-Requested-With',
        'Content-Length'
      ]
    })
  )
  router.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000
    })
  )
  if (process.env.NODE_ENV === 'development') {
    router.use(morgan('dev'))
  } else {
    router.use(morgan('combined', logger.morganOptions))
  }
}

const defineHandlers = () => {
  HealthHandler()
  CandidateHandler()
}

const init = (router, express) => {
  defineMiddelwares(router, express)
  defineHandlers()
  InitErrorMiddleware()
}

export default { init }
