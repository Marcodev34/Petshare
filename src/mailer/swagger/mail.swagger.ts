import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { EmailUserDto } from '../dto/email-user.dto';
import {
  UserChangePasswordResponseDto,
  UserResetPasswordResponseDto,
} from '../dto/mail-response.dto';
import { PasswordDto } from '../dto/password.dto';

export function SwaggerResetPassword() {
  return applyDecorators(
    ApiBody({ type: EmailUserDto }),
    ApiResponse({
      status: 201,
      description: 'usuários removido com sucesso.',
      type: UserResetPasswordResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Usuario nao encontrado' }),
  );
}

export function SwaggerConfirmResetPassword() {
  return applyDecorators(
    ApiBody({ type: PasswordDto }),
    ApiResponse({
      status: 201,
      description: 'Senha alterada com sucesso.',
      type: UserChangePasswordResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Token inválido ou expirado' }),
  );
}
