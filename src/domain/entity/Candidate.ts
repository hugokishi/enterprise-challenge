import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany
} from 'typeorm'
import Certificate from './Certificate'
import Skill from './Skill'

@Entity()
class Candidate {
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column({ nullable: false })
  name?: string

  @Column({ nullable: false, unique: true })
  cpf?: string

  @Column({ nullable: false, unique: true })
  email?: string

  @Column({ nullable: false, unique: true })
  telephone?: string

  @Column({ nullable: false })
  birthDate?: string

  @Column({ nullable: false })
  gender?: string

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[]

  @OneToMany(() => Certificate, (certificate) => certificate.candidate)
  certificates: Certificate[]
}

export default Candidate
