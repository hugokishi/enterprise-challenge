import { Logger, init as initLogger } from '@app/logger'
import {
  User,
  UserRepository,
  init as initUserRepository
} from '@repository/User'
import { SkillRepository, init as initSkillRepository } from '@repository/Skill'

export class UserUseCase {
  private log: Logger
  private userRepository: UserRepository
  private skillRepository: SkillRepository

  constructor({ log, userRepository, skillRepository }) {
    this.log = log
    this.userRepository = userRepository
    this.skillRepository = skillRepository
  }

  public findUser = async ({
    cpf,
    email,
    telephone
  }: {
    cpf: string
    email: string
    telephone: string
  }): Promise<User> => {
    return this.userRepository.getUser({
      cpf,
      email,
      telephone
    })
  }

  public create = async (user: any): Promise<User> => {
    const existentUser = await this.userRepository.getUser({
      cpf: user.cpf,
      email: user.email,
      telephone: user.telephone
    })

    if (existentUser) {
      throw {
        code: '400',
        status: 400,
        message: 'User already exists in database'
      }
    }

    const skills = await this.skillRepository.getSkillsByIds({
      ids: user.skills
    })

    if (skills.length < user.skills.length) {
      throw {
        code: '400',
        status: 400,
        message: 'Skills not found in database'
      }
    }

    user.skills = skills

    return this.userRepository.create(user)
  }
}

export const init = () => {
  const log = initLogger()
  const userRepository = initUserRepository()
  const skillRepository = initSkillRepository()

  return new UserUseCase({ log, userRepository, skillRepository })
}

export default init
