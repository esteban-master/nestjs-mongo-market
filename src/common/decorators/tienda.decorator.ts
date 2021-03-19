import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TiendaReq = createParamDecorator(
  (value: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.tienda;
  },
);
