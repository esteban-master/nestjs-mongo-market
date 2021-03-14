import { RolesBuilder } from 'nest-access-control';

export const roles: RolesBuilder = new RolesBuilder();

export enum AppRoles {
  NORMAL = 'NORMAL',
  VENDEDOR = 'VENDEDOR',
}

export enum AppRecursos {
  USUARIO = 'USUARIO',
  TIENDA = 'TIENDA',
  PRODUCTO = 'PRODUCTO',
}

roles
  // Roles Usuario Normal
  .grant(AppRoles.NORMAL)
  .updateOwn(AppRecursos.USUARIO)
  .deleteOwn(AppRecursos.USUARIO)
  // Roles Usuario Vendedor
  .grant(AppRoles.VENDEDOR)
  .extend(AppRoles.NORMAL)
  .createOwn([AppRecursos.TIENDA, AppRecursos.PRODUCTO])
  .updateOwn([AppRecursos.TIENDA, AppRecursos.PRODUCTO])
  .deleteOwn([AppRecursos.TIENDA, AppRecursos.PRODUCTO])
  .readOwn([AppRecursos.TIENDA, AppRecursos.PRODUCTO]);
