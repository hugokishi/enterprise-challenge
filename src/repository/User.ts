import { Like, Repository } from 'typeorm'
import { init as initDatabase } from '@driver/database/postgres'
import User from '@domain/entity/User'
import { UserCreateInput } from '@interfaces/User'

export { User }

export class UserRepository {
  private database: Repository<User>

  constructor(database) {
    this.database = database.getRepository(User)
  }

  public create = (user: UserCreateInput): Promise<User> => {
    return this.database.save(user)
  }

  public getUser = ({
    cpf,
    telephone,
    email
  }: {
    cpf: string
    telephone: string
    email: string
  }): Promise<User> => {
    return this.database
      .createQueryBuilder('user')
      .where('user.cpf = :cpf', { cpf })
      .orWhere('user.telephone = :telephone', { telephone })
      .orWhere('user.email = :email', { email })
      .getOne()
  }

  public findBy = ({
    key,
    value
  }: {
    key: 'email' | 'cpf' | 'telephone' | string
    value: string
  }): Promise<User> => {
    return this.database.findOne({
      [key]: Like(`%${value}%`)
    })
  }
}

export const init = () => {
  const database = initDatabase()

  return new UserRepository(database)
}

export default init
