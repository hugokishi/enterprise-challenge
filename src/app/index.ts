import 'reflect-metadata'
import dotenv from 'dotenv'

import { createConnection } from 'typeorm'

import expressInit from '@driver/http/express'
import postgres from '@driver/database/postgres'
import api from '../delivery/api'

import signal from './signal'
import { init as InitLogger } from './logger'

dotenv.config({ path: process.env.DOTENV_PATH || undefined })

let log

const main = async (connection) => {
  postgres.set(connection)

  try {
    const { router, server, express } = expressInit.create()

    api.init(router, express)

    process.on('SIGTERM', signal.shutdown)
    process.on('SIGINT', signal.shutdown)

    server.listen(process.env.PORT, (err?) => {
      if (err) {
        throw err
      }
      log.info(
        `API CORE is running at http://${process.env.SERVER_HOST}:${
          process.env.PORT
        } in ${router.get('env')}`
      )
    })
  } catch (err) {
    log.error(err.message)
    process.exit(1)
  }
}

const run = async () => {
  log = InitLogger()

  createConnection()
    .then(main)
    .catch((e) => {
      log.error(e.message)
    })
}

run()
