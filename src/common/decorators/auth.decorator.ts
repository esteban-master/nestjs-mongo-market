import { applyDecorators, UseGuards } from '@nestjs/common';
import { ACGuard, Role, UseRoles } from 'nest-access-control';
import { JwtAuthGuard } from 'src/modules/auth/guards';
import { PropietarioGuard } from '../guards/propietario.guard';

export function AuthWithRoles(...roles: Role[]) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, ACGuard, PropietarioGuard),
    UseRoles(...roles),
  );
}
