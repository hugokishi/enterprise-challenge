import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'
import Certificate from './Certificate'

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

  @OneToMany(() => Certificate, (certificate) => certificate.skill)
  certificates: Certificate[]
}

export default Skill
