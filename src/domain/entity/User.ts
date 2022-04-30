import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

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
}

export default User
