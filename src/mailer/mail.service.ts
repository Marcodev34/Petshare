/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter, SentMessageInfo } from 'nodemailer';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private JwtService: JwtService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    html: string,
  ): Promise<SentMessageInfo> {
    try {
      const info = await this.transporter.sendMail({
        from: `"Petshare" <${this.configService.get<string>('MAIL_USER')}>`,
        to,
        subject,
        html,
      });

      console.log('Email enviado:', info.messageId);
      return info;
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw error;
    }
  }

  async resetPassword(email: string): Promise<SentMessageInfo> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = this.JwtService.sign({ id: user.id, email: user.email });

    const resetLink = `http://localhost:3000/reset-password/confirm?token=${token}`;

    const rr = await this.sendMail(
      email,
      'Redefinição de Senha',
      `<h1>Redefinição de Senha</h1>
       <p>Para redefinir sua senha, clique no link abaixo:</p>
       <a href="${resetLink}">Redefinir Senha</a>`,
    );

    return rr;
  }

  async confirmResetPassword(token: string, newPassword: string) {
    try {
      const saltRounds = this.configService.get<number>('BCRYPT_SALT') || 10;
      const password = await bcrypt.hash(newPassword, saltRounds);
      const decoded = this.JwtService.verify(token);
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.prisma.user.update({
        where: { id: user.id },
        data: { password: password },
      });

      return { message: 'Password changed successfully.' };
    } catch (error) {
      console.error('Error confirming reset password:', error);
      throw error;
    }
  }
}
