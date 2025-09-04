import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerLoginUser, SwaggerRegisterUser } from './swagger/auth.swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  @SwaggerRegisterUser()
  async register(@Body() registerDto: RegisterDto) {
    return this.auth.register(registerDto);
  }

  @Post('login')
  @SwaggerLoginUser()
  async login(@Body() LoginDto: LoginDto) {
    return this.auth.login(LoginDto);
  }
}
