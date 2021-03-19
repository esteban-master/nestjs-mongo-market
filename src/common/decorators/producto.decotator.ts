import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ProductoReq = createParamDecorator(
  (value: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.producto;
  },
);
