import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Fernando' })
  @IsString()
  name: string;
}

export class UserResetPasswordRequestDto {
  @ApiProperty({
    example: 'marcospablocm@gmail.com',
    description: 'Email do usuário para enviar o link de redefinição de senha',
  })
  @IsEmail({}, { message: 'Informe um email válido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  email: string;
}
