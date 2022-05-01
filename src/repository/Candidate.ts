import { Repository } from 'typeorm'
import { init as initDatabase } from '@driver/database/postgres'
import Candidate from '@domain/entity/Candidate'

export { Candidate }

export class CandidateRepository {
  private database: Repository<Candidate>

  constructor(database) {
    this.database = database.getRepository(Candidate)
  }

  public create = (candidate: Candidate): Promise<Candidate> => {
    return this.database.save(candidate)
  }

  public getUser = ({
    cpf,
    telephone,
    email
  }: {
    cpf: string
    telephone: string
    email: string
  }): Promise<Candidate> => {
    return this.database
      .createQueryBuilder('user')
      .where('user.cpf = :cpf', { cpf })
      .orWhere('user.telephone = :telephone', { telephone })
      .orWhere('user.email = :email', { email })
      .leftJoinAndSelect('user.skills', 'skills')
      .leftJoinAndSelect('user.certificates', 'certificates')
      .getOne()
  }

  public getUserBy = ({
    cpf,
    email,
    name
  }: {
    cpf: string
    email: string
    name: string
  }): Promise<Candidate> => {
    return this.database
      .createQueryBuilder('user')
      .where('user.cpf = :cpf', { cpf })
      .orWhere('user.email = :email', { email })
      .orWhere('user.name = :name', { name })
      .leftJoinAndSelect('user.skills', 'skills')
      .leftJoinAndSelect('user.certificates', 'certificates')
      .getOne()
  }

  public findBySkills = ({
    skills
  }: {
    skills: string[] | string
  }): Promise<Candidate[]> => {
    return this.database
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.skills', 'skills')
      .leftJoinAndSelect('user.certificates', 'certificates')
      .where('skills.name IN (:...name)', { name: skills })
      .getMany()
  }

  public findByCertificates = ({
    certificates
  }: {
    certificates: string[] | string
  }): Promise<Candidate[]> => {
    return this.database
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.skills', 'skills')
      .leftJoinAndSelect('user.certificates', 'certificates')
      .where('certificates.name IN (:...name)', { name: certificates })
      .getMany()
  }
}

export const init = () => {
  const database = initDatabase()

  return new CandidateRepository(database)
}

export default init
