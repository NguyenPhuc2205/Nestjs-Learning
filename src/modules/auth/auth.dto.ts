import { Exclude, Expose, Type } from 'class-transformer'
import { IsEmail, IsString } from 'class-validator'
import { SuccessResDTO } from 'src/common/dto/success.dto'

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

export class RegisterResDTO extends SuccessResDTO {
  @Type(() => RegisterResponseDTO)
  declare data: RegisterResponseDTO 

  constructor (data: Partial<RegisterResDTO>) {
    super(data)
    Object.assign(this, data)
  }
}