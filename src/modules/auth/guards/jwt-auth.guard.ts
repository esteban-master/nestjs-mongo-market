import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

type ErrorJwt = 'TokenExpiredError' | 'JsonWebTokenError' | 'Error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      const message = info.message;
      const nameError: ErrorJwt = info.name;
      switch (nameError) {
        case 'JsonWebTokenError':
          throw err || new UnauthorizedException('Token invalido');

        case 'TokenExpiredError':
          throw err || new UnauthorizedException('Token expirado');

        case 'Error':
          throw err || new UnauthorizedException(message);
        default:
          break;
      }
    }

    return user;
  }
}
