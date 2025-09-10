import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface JwtPayload {
  [key: string]: string;
}

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token não fornecido.');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      throw new UnauthorizedException('Token mal formatado.');
    }

    const token = parts[1];
    if (!token) {
      throw new UnauthorizedException('Token mal formatado.');
    }

    try {
      const payload = await this.jwt.verifyAsync<JwtPayload>(token);
      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }
  }
}
