import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PetsModule } from './pets/pets.module';
import { MailModule } from './mailer/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // para usar em qualquer lugar sem reimportar
    }),
    UsersModule,
    AuthModule,
    PetsModule,
    MailModule,
  ],
})
export class AppModule {}
