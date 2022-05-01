import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import Skill from '@domain/entity/Skill'

export default class CreateInitialValues implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Skill)
      .values([
        { id: 1, name: 'JS' },
        { id: 2, name: 'TS' },
        { id: 3, name: 'Ruby on Rails' },
        { id: 4, name: 'Desenvolvimento de API' },
        { id: 5, name: 'Modelagem de dados' },
        { id: 6, name: 'Golang' },
        { id: 7, name: 'C#' },
        { id: 8, name: 'Java' },
        { id: 9, name: 'React' },
        { id: 10, name: 'Kotlin' }
      ])
      .execute()
  }
}
