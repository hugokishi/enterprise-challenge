import Certificate from '@domain/entity/Certificate'

export type UserCreateInput = {
  name: string
  cpf?: string
  email?: string
  telephone?: string
  birthDate?: string
  skills?: number[]
  certificates?: Certificate[]
}
