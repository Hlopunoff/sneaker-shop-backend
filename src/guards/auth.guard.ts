import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHandler(req);

    if (!token) {
      throw new UnauthorizedException('Невалидный токен');
    }

    try {
      const payload = this.jwtService.verify(token);

      req.userId = payload.id;
    } catch (error) {
      Logger.error(error.message);
      throw new UnauthorizedException('Невалидный токен');
    }

    return true;
  }

  private extractTokenFromHandler(req): string | undefined {
    return req.cookies['access_token'];
  }
}
