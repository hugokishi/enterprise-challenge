import { init as InitLogger } from '../logger'

import express from '@driver/http/express'

const exit = () => {
  const logger = InitLogger()
  logger.log({
    message: 'Exit application',
    level: 'warn',
    tag: 'exit'
  })
  process.exit(1)
}

export const shutdown = () => {
  const logger = InitLogger()

  const { server } = express.initWithServer()

  logger.log({
    message: 'Shutting down http server...',
    level: 'warn',
    tag: 'shutdown'
  })
  server.close(() => {
    exit()
  })
}

export default { shutdown }
