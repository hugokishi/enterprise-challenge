import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'
import Skill from './Skill'

@Entity()
class User {
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

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date

  @ManyToMany(() => Skill)
  @JoinTable()
  skills: Skill[]
}

export default User
