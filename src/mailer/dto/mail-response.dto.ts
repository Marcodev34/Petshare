import { ApiProperty } from '@nestjs/swagger';

export class UserResetPasswordResponseDto {
  @ApiProperty({ example: 'Password reset email sent successfully' })
  message: string;

  @ApiProperty({
    example: ['user@gmail.com'],
    description: 'Emails que foram aceitos para envio',
  })
  accepted: string[];

  @ApiProperty({ example: [], description: 'Emails que foram rejeitados' })
  rejected: string[];
}

export class UserChangePasswordResponseDto {
  @ApiProperty({ example: 'Senha alterada com sucesso.' })
  message: string;
}
