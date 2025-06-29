import { Inject, Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'
import { HASH_SALT_ROUNDS } from 'src/common/constants/hashing.constant'

@Injectable()
export class HashingService {
  constructor (
    @Inject(HASH_SALT_ROUNDS)
    private readonly saltRounds: number
  ) {}

  async hash(value: string): Promise<string> {
    return await hash(value, this.saltRounds)
  }

  async compare (value: string, hashedValue: string): Promise<boolean> {
    return await compare(value, hashedValue)
  }
}
