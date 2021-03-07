import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type ModelsTypes = 'user' | 'post';

export const GetModel = createParamDecorator(
  (model: ModelsTypes, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request[model];
  },
);
