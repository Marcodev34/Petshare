import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailService } from 'src/mailer/mail.service';
import {
  SwaggerDeleteUser,
  SwaggerFindAllUsers,
  SwaggerFindUser,
  SwaggerResetPassword,
  SwaggerUpdateUser,
} from './swagger/user.swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly mailService: MailService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @SwaggerFindAllUsers()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @SwaggerFindUser()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @SwaggerUpdateUser()
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @SwaggerDeleteUser()
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Post('reset-password')
  @SwaggerResetPassword()
  async resetPassword(@Body('email') email: string) {
    await this.mailService.sendMail(
      email,
      'Bem-vindo ao Petshare!',
      '<h1>Olá!</h1><p>Seu cadastro foi realizado com sucesso.</p>',
    );
  }
}
