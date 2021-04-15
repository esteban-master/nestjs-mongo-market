import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Types } from 'mongoose';
import { ProductoService } from 'src/modules/producto/producto.service';
import { TiendaService } from 'src/modules/tienda/tienda.service';
import { Usuario } from 'src/modules/usuario/schema/usuario.shema';

@Injectable()
export class PropietarioGuard implements CanActivate {
  constructor(
    private tiendaService: TiendaService,
    private productoService: ProductoService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const usuarioPeticion = request.user as Usuario;
    const params = Object.keys(request.params);
    const parametroSolicitud =
      params.length > 1 ? params.join('/') : params.join();

    const isValidId = Object.values(request.params).every((p) =>
      Types.ObjectId.isValid(p),
    );
    if (!isValidId) throw new BadRequestException('IDs invalidos');

    switch (parametroSolicitud) {
      case 'tiendaId':
        const findTienda = await this.tiendaService.findOne(
          request.params.tiendaId,
        );
        if (String(findTienda.propietario) !== String(usuarioPeticion._id))
          throw new UnauthorizedException(
            'Usuario no es propietario de la tienda',
          );
        request['tienda'] = findTienda;
        return true;
      case 'usuarioId':
        if (String(usuarioPeticion._id) !== String(request.params.usuarioId))
          throw new UnauthorizedException();
        return true;
      case 'tiendaId/productoId':
        const { tiendaId, productoId } = request.params;
        const producto = await this.productoService.findOne(productoId);
        const tienda = await this.tiendaService.findOne(tiendaId);
        const usuarioPropietarioDeTienda =
          String(usuarioPeticion._id) === String(tienda.propietario);
        if (!usuarioPropietarioDeTienda) throw new UnauthorizedException();
        request['producto'] = producto;
        return true;

      default:
        throw new InternalServerErrorException(
          `Parametros validos son: /:tiendaId | /:usuarioId | /:tiendaId/:productoId. Actual '${parametroSolicitud.toString()}'`,
        );
    }
  }
}
