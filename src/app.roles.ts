import { RolesBuilder } from 'nest-access-control';

export const roles: RolesBuilder = new RolesBuilder();

export enum AppRoles {
  NORMAL = 'NORMAL',
  VENDEDOR = 'VENDEDOR',
}

export enum AppRecursos {
  USUARIO = 'USUARIO',
  TIENDA = 'TIENDA',
}

roles
  // Roles Usuario Normal
  .grant(AppRoles.NORMAL)
  .updateOwn(AppRecursos.USUARIO)
  .deleteOwn(AppRecursos.USUARIO)
  // Roles Usuario Vendedor
  .grant(AppRoles.VENDEDOR)
  .extend(AppRoles.NORMAL)
  .createOwn(AppRecursos.TIENDA)
  .updateOwn(AppRecursos.TIENDA)
  .deleteOwn(AppRecursos.TIENDA)
  .readOwn(AppRecursos.TIENDA);
