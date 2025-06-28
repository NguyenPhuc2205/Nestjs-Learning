import { plainToInstance } from 'class-transformer'
import { IsString, validateSync } from 'class-validator'
import fs from 'fs'
import { resolve } from 'path'
import dotenv from 'dotenv'

// Đọc file .env và đưa vào process.env
dotenv.config({ path: resolve('.env') }) 

// Kiểm tra coi thử có file .env hay chưa
if (!fs.existsSync(resolve('.env'))) {
  console.error('Error: .env file not found. Please create a .env file in the root directory.')
  
  process.exit(1)
}

class ConfigSchema {
  @IsString()
  DATABASE_URL: string

  @IsString()
  ACCESS_TOKEN_SECRET: string

  @IsString()
  ACCESS_TOKEN_EXPIRES_IN: string

  @IsString()
  REFRESH_TOKEN_SECRET: string

  @IsString()
  REFRESH_TOKEN_EXPIRES_IN: string
}

// Chuyển từ Object JS sang đối tượng thể hiện của Class => rồi dùng Class-validator
const configServer = plainToInstance(ConfigSchema, process.env)
// console.log('Các giá trị có trong .env: ', configServer)

const validationError = validateSync(configServer)
// console.log('Các giá trị trong .env sau khi validate: ', validationError)

if (validationError.length > 0) {
  console.log('Các giá trị trong .env ko hợp lệ: ')
  const errors = validationError.map(err => {
    return {
      // target: err.target,
      property: err.property,
      constraints: err.constraints,
      value: err.value
    }
  })

  throw errors
}

const envConfig = configServer

export default envConfig