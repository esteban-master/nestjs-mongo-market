import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { AppRecursos } from 'src/app.roles';
import { AuthWithRoles, User } from 'src/common/decorators';
import { IsValidId } from 'src/common/pipes';

import { Usuario } from '../usuario/schema/usuario.shema';
import { CreateTiendaDto } from './dto/createTienda.dto';
import { EditTiendaDto } from './dto/editTienda.dto';
import { Tienda } from './schema';
import { TiendaService } from './tienda.service';

@Controller('tiendas')
export class TiendaController {
  constructor(private tiendaService: TiendaService) {}

  @Get()
  getAllTiendas(): Promise<Tienda[]> {
    return this.tiendaService.findAll();
  }

  @Get('/:tiendaId')
  getOneTienda(
    @Param('tiendaId', IsValidId) tiendaId: string,
  ): Promise<Tienda> {
    return this.tiendaService.findOne(tiendaId);
  }

  @Get('/by/:usuarioId')
  @AuthWithRoles({
    possession: 'own',
    action: 'read',
    resource: AppRecursos.TIENDA,
  })
  getTiendasPropietario(
    @User() usuarioPeticion: Usuario,
    @Param('usuarioId', IsValidId) usuarioId: string,
  ): Promise<Tienda[]> {
    return this.tiendaService.findByPropietario(usuarioId, usuarioPeticion);
  }

  @Post()
  @AuthWithRoles({
    possession: 'own',
    action: 'create',
    resource: AppRecursos.TIENDA,
  })
  createTienda(
    @Body() createTiendaDto: CreateTiendaDto,
    @User() usuarioPeticion: Usuario,
  ): Promise<Tienda> {
    return this.tiendaService.create(createTiendaDto, usuarioPeticion);
  }

  @Put('/:tiendaId')
  @AuthWithRoles({
    possession: 'own',
    action: 'update',
    resource: AppRecursos.TIENDA,
  })
  updateTienda(
    @Param('tiendaId', IsValidId) tiendaId: string,
    @Body() editTiendaDto: EditTiendaDto,
    @User() usuario: Usuario,
  ) {
    return this.tiendaService.update(tiendaId, editTiendaDto, usuario);
  }
}
