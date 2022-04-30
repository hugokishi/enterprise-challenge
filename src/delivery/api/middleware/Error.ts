import {
  init as InitRouter,
  Response,
  NextFunction
} from '@driver/http/express'

import { init as InitLogger } from '../../../app/logger'
import errors from '@app/errors'

export class ErrorMiddleware {
  private logger

  constructor(router, logger) {
    this.logger = logger

    router.use(this.injectError)
  }

  public injectError = (data: any, req, res: Response, next: NextFunction) => {
    const error = errors.find(({ code }) => data.code === code)
    if (error) {
      res.status(data.status || error?.status).json({
        message: data.message || error.message || '',
        data: data.data
      })
    } else {
      this.logger.error(data)
      res.status(500).json({
        message: `Request failed ${data.code}`
      })
    }
    this.logger.error({
      message: error ? error.message : data.message,
      code: data.code,
      tag: data.tag || 'enterprise-error'
    })
  }
}

export const init = () => {
  const router = InitRouter()
  const logger = InitLogger()

  return new ErrorMiddleware(router, logger)
}

export default init
