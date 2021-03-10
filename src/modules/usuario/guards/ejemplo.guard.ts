import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class EjemploGuard implements CanActivate {
  constructor(
    // Para acceder a la (s) función (es) de la ruta (metadatos personalizados), usaremos la clase auxiliar Reflector
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    // getHandler() nos da una referencia a la función del controlador de ruta
    // que se invocara luego que este guard de true, si da false, no se invocara
    // Y dara una exception
    const miMetadata = this.reflector.get('roles', context.getHandler());
    // console.log('mi metadata: ', miMetadata);
    // console.log(
    //   'EN MI REQUEST DEL GUARD EXAMPLE',
    //   request.user,
    //   request.params,
    // );

    console.log(context.getHandler());
    return true;
  }
}
