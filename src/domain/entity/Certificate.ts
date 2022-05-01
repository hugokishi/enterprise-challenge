import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'
import Skill from './Skill'
import Candidate from './Candidate'

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

  @ManyToOne(() => Candidate, (candidate) => candidate.certificates)
  candidate: Candidate

  @ManyToOne(() => Skill, (skill) => skill.certificates)
  skill: Skill
}

export default Certificate
