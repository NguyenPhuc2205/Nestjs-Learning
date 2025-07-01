import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import { RegisterBodyDTO, RegisterResponseDTO } from 'src/modules/auth/auth.dto';
import { AuthService } from 'src/modules/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @SerializeOptions({ type: RegisterResponseDTO })
  @Post('register')
  async register(@Body() body: RegisterBodyDTO) {
    console.log('Registering user body:', body)

    const result = await this.authService.register(body)

    if (!result) {
      console.error('Registration failed')
      return null
    }

    return result
  }
}
