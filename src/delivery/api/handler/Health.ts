import { init as InitRouter, Request, Response } from '@driver/http/express'

export class HealthHandler {
  constructor(router) {
    router.get('/health', this.health)
  }

  public health = async (req: Request, res: Response) =>
    res.status(200).send('Server is running')
}

export const init = () => {
  const router = InitRouter()

  return new HealthHandler(router)
}

export default init
