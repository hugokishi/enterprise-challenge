import * as os from 'os'
import dayjs from 'dayjs'
import { createLogger, format, transports, Logger as LoggerType, addColors } from 'winston'

import tracer from '../tracer'

export type Logger = LoggerType;

const pid = process.pid
const hostname = os.hostname()

addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green'
})

const customFormat = format((info) => {
  info.time = dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]')
  info.pid = pid
  info.hostname = hostname
  info.reqId = tracer.getRequestId()
  return info
})

const jsonFormat = () =>
  format.printf(({ level, time, pid, hostname, message, ...info }) => {
    return `${JSON.stringify({
      level,
      time,
      pid,
      hostname,
      reqId: info.reqId,
      msg: message,
      ...info
    })}`
  })

const devFormat = format((info) => {
  if (typeof info.message === 'object') {
    info.message = JSON.stringify(info.message, null, 2)
  }

  return info
})

let logger

export const init = (): Logger => {
  if (logger) {
    return logger
  }

  logger = createLogger({
    level: process.env.LOGGER_LEVEL,
    format:
      process.env.NODE_ENV !== 'development'
        ? format.combine(customFormat(), jsonFormat())
        : format.simple(),
    transports: [
      new transports.Console(
        process.env.NODE_ENV === 'development'
          ? {
              format: format.combine(format.colorize(), devFormat(), format.simple())
            }
          : undefined
      )
    ],
    exitOnError: true
  })

  return logger
}

export const morganOptions = {
  stream: {
    write (message: string) {
      init().info(message.trim())
    }
  }
}

export default { init, morganOptions }
