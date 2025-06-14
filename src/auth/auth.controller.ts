import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.auth.register(registerDto);
  }

  @Post('login')
  async login(@Body() LoginDto: LoginDto) {
    return this.auth.login(LoginDto);
  }
}
