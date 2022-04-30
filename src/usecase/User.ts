import { Logger, init as initLogger } from '@app/logger'
import { UserCreateInput } from '@interfaces/User'
import {
  User,
  UserRepository,
  init as initUserRepository
} from '@repository/User'

export class UserUseCase {
  private log: Logger
  private userRepository: UserRepository

  constructor({ log, userRepository }) {
    this.log = log
    this.userRepository = userRepository
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
    let payload = {
      key: '',
      value: ''
    }

    cpf !== 'undefined' && (payload = { key: 'cpf', value: cpf })
    email !== 'undefined' && (payload = { key: 'email', value: email })
    telephone !== 'undefined' &&
      (payload = { key: 'telephone', value: telephone })

    return this.userRepository.findBy(payload)
  }

  public create = async (user: UserCreateInput): Promise<User> => {
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

    return this.userRepository.create(user)
  }
}

export const init = () => {
  const log = initLogger()
  const userRepository = initUserRepository()

  return new UserUseCase({ log, userRepository })
}

export default init
