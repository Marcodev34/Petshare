import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty({ example: 'Usuário criado com sucesso' })
  message: string;

  @ApiProperty({ example: '0008a65a-73be-4cb6-b720-206766a855a5' })
  id: string;

  @ApiProperty({ example: 'marcospablocm123456789@gmail.com' })
  email: string;
}
