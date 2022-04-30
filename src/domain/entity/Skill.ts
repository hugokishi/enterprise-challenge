import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
class Skill {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column({ nullable: false })
  name?: string

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date
}

export default Skill
