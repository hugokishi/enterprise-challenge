import {
  CertificateRepository,
  init as initCertificateRepository
} from '@repository/Certificate'
import { Logger, init as initLogger } from '@app/logger'
import {
  Candidate,
  CandidateRepository,
  init as initCandidateRepository
} from '@repository/Candidate'
import { SkillRepository, init as initSkillRepository } from '@repository/Skill'

export class CandidateUseCase {
  private log: Logger
  private candidateRepository: CandidateRepository
  private skillRepository: SkillRepository
  private certificateRepository: CertificateRepository

  constructor({
    log,
    candidateRepository,
    skillRepository,
    certificateRepository
  }) {
    this.log = log
    this.candidateRepository = candidateRepository
    this.skillRepository = skillRepository
    this.certificateRepository = certificateRepository
  }

  public findUser = async ({
    cpf,
    email,
    name,
    skills,
    certificates
  }: {
    cpf: string
    email: string
    name: string
    skills: string | string[]
    certificates: string | string[]
  }): Promise<any> => {
    if (certificates.length > 0) {
      return this.candidateRepository.findByCertificates({
        certificates
      })
    }
    if (skills.length > 0) {
      return this.candidateRepository.findBySkills({
        skills
      })
    }
    return this.candidateRepository.getUserBy({
      cpf,
      email,
      name
    })
  }

  public create = async (user: any): Promise<Candidate> => {
    const existentUser = await this.candidateRepository.getUser({
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

    user.certificates.skill = skills[0]

    const certificates = await this.certificateRepository.create(
      user.certificates
    )

    user.skills = skills
    user.certificates = certificates

    return this.candidateRepository.create(user)
  }
}

export const init = () => {
  const log = initLogger()
  const candidateRepository = initCandidateRepository()
  const skillRepository = initSkillRepository()
  const certificateRepository = initCertificateRepository()

  return new CandidateUseCase({
    log,
    candidateRepository,
    skillRepository,
    certificateRepository
  })
}

export default init
