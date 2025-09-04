import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'marcospablo',
    description: 'Nome de usuário',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'marcospablocm@gmail.com',
    description: 'Email do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'binbomgui',
    description: 'Senha do usuário (mínimo 8 caracteres)',
  })
  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  password: string;
}
