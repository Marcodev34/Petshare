import { Body, Controller, Post, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { EmailUserDto } from './dto/email-user.dto';
import { PasswordDto } from './dto/password.dto';

@Controller('reset-password')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('request')
  resetPassword(@Body() dto: EmailUserDto) {
    return this.mailService.resetPassword(dto.email);
  }

  @Post('confirm')
  confirmResetPassword(
    @Body() dto: PasswordDto,
    @Query('token') token: string,
  ) {
    return this.mailService.confirmResetPassword(token, dto.password);
  }
}
