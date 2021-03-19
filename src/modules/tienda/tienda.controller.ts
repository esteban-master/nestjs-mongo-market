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
import { AuthWithRoles, User, TiendaReq } from 'src/common/decorators';
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
    @Param('usuarioId', IsValidId) usuarioId: string,
  ): Promise<Tienda[]> {
    return this.tiendaService.findByPropietario(usuarioId);
  }

  @Post()
  @AuthWithRoles({
    possession: 'own',
    action: 'create',
    resource: AppRecursos.TIENDA,
  })
  async createTienda(
    @Body() createTiendaDto: CreateTiendaDto,
    @User() usuarioPeticion: Usuario,
  ) {
    const newTienda = await this.tiendaService.create(
      createTiendaDto,
      usuarioPeticion,
    );
    return {
      ...newTienda['_doc'],
      propietario: {
        _id: usuarioPeticion._id,
        name: usuarioPeticion.name,
      },
    };
  }

  @Put('/:tiendaId')
  @AuthWithRoles({
    possession: 'own',
    action: 'update',
    resource: AppRecursos.TIENDA,
  })
  updateTienda(
    @TiendaReq() tienda: Tienda,
    @Body() editTiendaDto: EditTiendaDto,
  ) {
    return this.tiendaService.update(tienda, editTiendaDto);
  }

  @Delete('/:tiendaId')
  @AuthWithRoles({
    possession: 'own',
    action: 'delete',
    resource: AppRecursos.TIENDA,
  })
  async deleteTienda(@TiendaReq() tienda: Tienda): Promise<{ _id: string }> {
    const tiendaEliminada = await this.tiendaService.delete(tienda);
    return {
      _id: tiendaEliminada._id,
    };
  }
}
