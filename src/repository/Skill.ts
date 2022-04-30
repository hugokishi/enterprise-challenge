import { Repository } from 'typeorm'
import { init as initDatabase } from '@driver/database/postgres'
import Skill from '@domain/entity/Skill'

export { Skill }

export class SkillRepository {
  private database: Repository<Skill>

  constructor(database) {
    this.database = database.getRepository(Skill)
  }

  public getSkillsByIds = async ({
    ids
  }: {
    ids: number[]
  }): Promise<Skill[]> => {
    return this.database.findByIds(ids)
  }
}

export const init = () => {
  const database = initDatabase()

  return new SkillRepository(database)
}

export default init
