import { v4 as uuidv4 } from 'uuid'
import { AsyncLocalStorage } from 'async_hooks'

const asyncStorage = new AsyncLocalStorage()

export const headerName = 'x-ew-request-id'

export const createRequestId = (): string => uuidv4()

export const getRequestId = () => asyncStorage.getStore()

export const injectRequestIdHeader = (headers?): object => {
  headers = headers || {}

  const requestId = getRequestId()
  if (requestId) {
    headers[headerName] = requestId
  }

  return headers
}

export const middlewareForFastify = (): Function => {
  return function (req, res, next) {
    asyncStorage.run(req.id, () => {
      next()
    })
  }
}

export const middlewareForExpress = (options?): Function => {
  options = options || {}
  options.setHeader = options.setHeader === undefined || !!options.setHeader
  options.headerName = options.headerName || headerName

  return function (req, res, next) {
    const id = req.headers[options.headerName.toLowerCase()] || createRequestId()

    if (options.setHeader) {
      res.setHeader(options.headerName, id)
    }

    asyncStorage.run(id, () => {
      next()
    })
  }
}

export default {
  headerName,
  createRequestId,
  getRequestId,
  injectRequestIdHeader,
  middlewareForFastify,
  middlewareForExpress
}
