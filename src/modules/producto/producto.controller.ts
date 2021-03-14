import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppRecursos } from 'src/app.roles';
import { Params } from 'src/common/constants';
import { AuthWithRoles, User } from 'src/common/decorators';
import { IsValidId } from 'src/common/pipes';
import { Usuario } from '../usuario/schema/usuario.shema';
import { CreateProductoDto } from './dto';
import { ProductoService } from './producto.service';

@Controller('productos')
export class ProductoController {
  constructor(private productoService: ProductoService) {}

  @Get()
  findAll() {
    return this.productoService.findAll();
  }

  @Get('/:productoId')
  getOne(@Param('productoId', IsValidId) productoId: string) {
    return this.productoService.findOne(productoId);
  }

  @Get('/categorias')
  findCategorias() {
    return this.productoService.getCategorias();
  }

  @Get('/by/:tiendaId')
  getProductosPorTienda(@Param('tiendaId', IsValidId) tiendaId: string) {
    return this.productoService.findByTienda(tiendaId);
  }

  @Post('/by/:tiendaId')
  @AuthWithRoles({
    possession: 'own',
    action: 'create',
    resource: AppRecursos.PRODUCTO,
  })
  create(
    @Body() body: CreateProductoDto,
    @Param('tiendaId', IsValidId) tiendaId: string,
    @User() usuarioPeticion: Usuario,
  ) {
    return this.productoService.create(body, tiendaId, usuarioPeticion);
  }

  @Delete('/:tiendaId/:productoId')
  @AuthWithRoles({
    possession: 'own',
    action: 'delete',
    resource: AppRecursos.PRODUCTO,
  })
  deleteProducto(
    @Param(IsValidId) params: Params,
    @User() usuarioPeticion: Usuario,
  ) {
    return this.productoService.remove(params, usuarioPeticion);
  }

  @Put('/:tiendaId/:productoId')
  @AuthWithRoles({
    possession: 'own',
    action: 'update',
    resource: AppRecursos.PRODUCTO,
  })
  updateProducto(
    @Param(IsValidId) params: Params,
    @User() usuarioPeticion: Usuario,
  ) {
    return {
      update: 'update',
      params,
      usuarioPeticion,
    };
  }
}
