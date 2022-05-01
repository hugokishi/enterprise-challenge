import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'
import Skill from './Skill'
import User from './User'

@Entity()
class Certificate {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column({ nullable: false })
  name?: string

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date

  @ManyToOne(() => User, (user) => user.certificates)
  user: User

  @ManyToOne(() => Skill, (skill) => skill.certificates)
  skill: Skill
}

export default Certificate
