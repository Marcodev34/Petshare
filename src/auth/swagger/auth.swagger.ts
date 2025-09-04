import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/dto/login.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { RegisterDto } from '../dto/register.dto';
import { RegisterResponseDto } from '../dto/register-response.dto';

export function SwaggerLoginUser() {
  return applyDecorators(
    ApiBody({ type: LoginDto }),
    ApiResponse({
      status: 201,
      description: 'Usuário logado com sucesso.',
      type: LoginResponseDto,
    }),
    ApiResponse({ status: 400, description: 'Dados inválidos.' }),
  );
}

export function SwaggerRegisterUser() {
  return applyDecorators(
    ApiBody({ type: RegisterDto }),
    ApiResponse({
      status: 201,
      description: 'Usuário criado com sucesso',
      type: RegisterResponseDto,
    }),
    ApiResponse({ status: 400, description: 'Dados inválidos' }),
  );
}
