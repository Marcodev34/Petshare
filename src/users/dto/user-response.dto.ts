import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '3f630775-f437-45e4-b347-7fe0fbcec111' })
  id: string;

  @ApiProperty({ example: 'joao' })
  name: string;

  @ApiProperty({ example: 'user@gmail.com' })
  email: string;

  @ApiProperty({ example: false })
  isAdmin: boolean;

  @ApiProperty({ example: '2025-06-11T12:34:27.231Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-06-11T12:34:27.231Z' })
  updatedAt: string;
}

export class UserDeleteResponseDto {
  @ApiProperty({ example: 'User deleted successfully' })
  message: string;
  @ApiProperty({ example: '3f630775-f437-45e4-b347-7fe0fbcec111' })
  userId: string;
}

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
