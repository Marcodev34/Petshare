import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailUserDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'Email do usuário para enviar o link de redefinição de senha',
  })
  @IsEmail()
  email: string;
}
