import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private JwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }
    const saltRounds = this.configService.get<number>('BCRYPT_SALT') || 10;
    const password = await bcrypt.hash(dto.password, saltRounds);
    const user = await this.prisma.user.create({
      data: { name: dto.username, email: dto.email, password },
    });

    return {
      message: 'usario criado com suecesso',
      id: user.id,
      email: user.email,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.JwtService.sign({
      id: user.id,
      email: user.email,
      role: user.isAdmin ? 'admin' : 'user',
    });

    return {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.isAdmin ? 'admin' : 'user',
      },
    };
  }
}
