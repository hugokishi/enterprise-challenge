import { Repository } from 'typeorm'
import { init as initDatabase } from '@driver/database/postgres'
import Certificate from '@domain/entity/Certificate'

export { Certificate }

export class CertificateRepository {
  private database: Repository<Certificate>

  constructor(database) {
    this.database = database.getRepository(Certificate)
  }

  public create = async (certificate: Certificate): Promise<Certificate> => {
    return this.database.save(certificate)
  }
}

export const init = () => {
  const database = initDatabase()

  return new CertificateRepository(database)
}

export default init
