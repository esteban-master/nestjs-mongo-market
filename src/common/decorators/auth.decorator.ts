import { applyDecorators, UseGuards } from '@nestjs/common';
import { ACGuard, Role, UseRoles } from 'nest-access-control';
import { JwtAuthGuard } from 'src/modules/auth/guards';

export function AuthWithRoles(...roles: Role[]) {
  return applyDecorators(UseGuards(JwtAuthGuard, ACGuard), UseRoles(...roles));
}
