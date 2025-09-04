import { ApiProperty } from '@nestjs/swagger';

class UserResponse {
  @ApiProperty({ example: '28eb444b-973b-4d37-a533-4e9d274ae614' })
  id: string;

  @ApiProperty({ example: 'marcospablocm@gmail.com' })
  email: string;
}

export class LoginResponseDto {
  @ApiProperty({ example: 'Login successful' })
  message: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string;

  @ApiProperty({ type: UserResponse })
  user: UserResponse;
}
