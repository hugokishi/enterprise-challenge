import {
  init as InitRouter,
  NextFunction,
  Request,
  Response
} from '@driver/http/express'
import { UserUseCase, init as initUserUseCase } from '@usecase/User'
import { UserCreateInput } from '@interfaces/User'

export class UserHandler {
  private userUseCase: UserUseCase

  constructor(router, userUseCase) {
    this.userUseCase = userUseCase

    router.get('/users', this.findUser)
    router.post('/users', this.create)
  }

  public findUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cpf = req.query.cpf ? req.query.cpf : ''
      const email = req.query.email ? req.query.email : ''
      const telephone = req.query.telephone ? req.query.telephone : ''

      const payload = {
        cpf: String(cpf),
        email: String(email),
        telephone: String(telephone)
      }

      const user = await this.userUseCase.findUser({ ...payload })
      res.status(200).json({ data: user })
    } catch (err) {
      next(err)
    }
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        cpf,
        birthDate,
        email,
        telephone,
        skills
      }: UserCreateInput = req.body

      const user = await this.userUseCase.create({
        name,
        cpf,
        birthDate,
        email,
        telephone,
        skills
      })

      res.status(201).send(user)
    } catch (error) {
      next(error)
    }
  }
}

export const init = () => {
  const router = InitRouter()
  const userUseCase = initUserUseCase()

  return new UserHandler(router, userUseCase)
}

export default init
