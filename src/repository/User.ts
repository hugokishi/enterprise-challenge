import { Repository } from 'typeorm'
import { init as initDatabase } from '@driver/database/postgres'
import User from '@domain/entity/User'

export { User }

export class UserRepository {
  private database: Repository<User>

  constructor(database) {
    this.database = database.getRepository(User)
  }

  public create = (user: User): Promise<User> => {
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
      .leftJoinAndSelect('user.skills', 'skills')
      .getOne()
  }

  public findBy = ({
    cpf,
    telephone,
    email,
    skill
  }: {
    cpf: string
    telephone: string
    email: string
    skill: string
  }): Promise<User> => {
    return this.database
      .createQueryBuilder('user')
      .where('user.cpf = :cpf', { cpf })
      .orWhere('user.telephone = :telephone', { telephone })
      .orWhere('user.email = :email', { email })
      .leftJoinAndSelect('user.skills', 'skills')
      .getOne()
  }
}

export const init = () => {
  const database = initDatabase()

  return new UserRepository(database)
}

export default init
