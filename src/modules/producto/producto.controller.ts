import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppRecursos } from 'src/app.roles';
import { ListarQuery, Params } from 'src/common/constants';
import {
  AuthWithRoles,
  ProductoReq,
  TiendaReq,
  User,
} from 'src/common/decorators';
import { IsValidId } from 'src/common/pipes';
import { Tienda } from '../tienda/schema';
import { Usuario } from '../usuario/schema/usuario.shema';
import { CreateProductoDto } from './dto';
import { ProductoService } from './producto.service';
import { Producto } from './schema';

@Controller('productos')
export class ProductoController {
  constructor(private productoService: ProductoService) {}

  @Get()
  listar(@Query() queries: ListarQuery) {
    return this.productoService.listar(queries);
  }

  @Get('/categorias')
  findCategorias() {
    return this.productoService.getCategorias();
  }

  @Get('/:productoId')
  getOne(@Param('productoId', IsValidId) productoId: string) {
    return this.productoService.findOne(productoId);
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
  create(@Body() body: CreateProductoDto, @TiendaReq() tienda: Tienda) {
    return this.productoService.create(body, tienda);
  }

  @Delete('/:tiendaId/:productoId')
  @AuthWithRoles({
    possession: 'own',
    action: 'delete',
    resource: AppRecursos.PRODUCTO,
  })
  deleteProducto(@ProductoReq() producto: Producto) {
    return this.productoService.remove(producto);
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
