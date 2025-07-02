import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import './shared/config'
import { ClassSerializerInterceptor, UnprocessableEntityException, ValidationPipe } from '@nestjs/common'
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor'
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      // Tự động loại bỏ các thuộc tính không được khai báo decorator trong DTO
      whitelist: true, 

      // Ném lỗi nếu có thuộc tính không được khai báo decorator trong DTO (Client truyền lên thì báo lỗi)
      forbidNonWhitelisted: true,
      
      // Tự động chuyển đổi kiểu dữ liệu sang kiểu được khai báo trong DTO (VD: String -> Number)
      transform: true,

      // Cho phép chuyển đổi kiểu dữ liệu ngầm định
      transformOptions: {
        enableImplicitConversion: true, 
      },

      // Function xử lý
      exceptionFactory: (validationErrors) => {
        console.error('Validation errors:', validationErrors)

        return new UnprocessableEntityException(
          validationErrors.map(error => ({
            property: error.property,
            constrainst: Object.values(error.constraints ?? {}).join(',')
          }))
        )
      }
    }
  ))

  app.useGlobalInterceptors(new LoggingInterceptor())

  app.useGlobalInterceptors(new TransformInterceptor())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
