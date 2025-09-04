import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

import {
  UserDeleteResponseDto,
  UserResetPasswordResponseDto,
  UserResponseDto,
} from '../dto/user-response.dto';
import {
  UpdateUserDto,
  UserResetPasswordRequestDto,
} from '../dto/update-user.dto';

export function SwaggerFindAllUsers() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      status: 201,
      description: 'Lista de usuários retornada com sucesso.',
      type: [UserResponseDto],
    }),
    ApiResponse({ status: 400, description: 'Dados inválidos.' }),
  );
}

export function SwaggerFindUser() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      status: 201,
      description: 'usuários retornada com sucesso.',
      type: UserResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Usuario nao encontrado' }),
  );
}

export function SwaggerUpdateUser() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiBody({ type: UpdateUserDto }),
    ApiResponse({
      status: 201,
      description: 'usuários retornada com sucesso.',
      type: UserResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Usuario nao encontrado' }),
  );
}
export function SwaggerDeleteUser() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      status: 201,
      description: 'usuários removido com sucesso.',
      type: UserDeleteResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Usuario nao encontrado' }),
  );
}

export function SwaggerSendEmail() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      status: 201,
      description: 'usuários removido com sucesso.',
      type: UserDeleteResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Usuario nao encontrado' }),
  );
}

export function SwaggerResetPassword() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiBody({ type: UserResetPasswordRequestDto }),
    ApiResponse({
      status: 201,
      description: 'usuários removido com sucesso.',
      type: UserResetPasswordResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Usuario nao encontrado' }),
  );
}
