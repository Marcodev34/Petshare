import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordDto {
  @ApiProperty({
    example: 'binbomgui',
    description: 'Nova senha do usuário. Deve ter entre 8 e 20 caracteres.',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters' })
  password: string;
}
