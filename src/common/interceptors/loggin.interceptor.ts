import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LogginInterceptor implements NestInterceptor {
  intercept(cxt: ExecutionContext, next: CallHandler) {
    const request = cxt.switchToHttp().getRequest<Request>();
    console.log('MI REQUEST: ', request.user, request.params);

    return next.handle().pipe(tap((data) => console.log('DATA: ', data)));
  }
}
