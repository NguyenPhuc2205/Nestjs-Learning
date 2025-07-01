import { Exclude, Expose } from 'class-transformer'
import { IsEmail, IsString } from 'class-validator'

export class LoginBodyDTO {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  password: string
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString()
  name: string

  @IsString()
  confirmPassword: string
}

export class RegisterResponseDTO {
  id: number
  name: string
  email: string
  
  @Exclude()
  password: string

  @Expose()
  get emailName (): string {
    return `${this.name} - ${this.email}>`
  }

  createdAt: Date
  updatedAt: Date

  constructor (data: Partial<RegisterResponseDTO>) {
    Object.assign(this,data)
  }
}