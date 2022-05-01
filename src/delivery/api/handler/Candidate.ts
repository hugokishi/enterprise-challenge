import {
  init as InitRouter,
  NextFunction,
  Request,
  Response
} from '@driver/http/express'
import {
  CandidateUseCase,
  init as initCandidateUseCase
} from '@usecase/Candidate'
import { UserCreateInput } from '@interfaces/User'

export class CandidateHandler {
  private candidateUseCase: CandidateUseCase

  constructor(router, candidateUseCase) {
    this.candidateUseCase = candidateUseCase

    router.get('/candidates', this.findUser)
    router.post('/candidates', this.create)
  }

  public findUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cpf = req.query.cpf ? req.query.cpf : ''
      const email = req.query.email ? req.query.email : ''
      const name = req.query.name ? req.query.name : ''
      const skills = req.query.skills
        ? req.query.skills.toString().split(',')
        : ''
      const certificates = req.query.certificates
        ? req.query.certificates.toString().split(',')
        : ''

      const payload = {
        cpf: String(cpf),
        email: String(email),
        name: String(name),
        skills: skills,
        certificates: certificates
      }

      const user = await this.candidateUseCase.findUser({ ...payload })
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
        gender,
        email,
        telephone,
        skills,
        certificates
      }: UserCreateInput = req.body

      const user = await this.candidateUseCase.create({
        name,
        cpf,
        birthDate,
        email,
        gender,
        telephone,
        skills,
        certificates
      })

      res.status(201).send(user)
    } catch (error) {
      next(error)
    }
  }
}

export const init = () => {
  const router = InitRouter()
  const candidateUseCase = initCandidateUseCase()

  return new CandidateHandler(router, candidateUseCase)
}

export default init
