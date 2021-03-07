import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTiendaDto } from './dto/createTienda.dto';
import { Tienda } from './shemas/tienda.shema';
import { TiendaService } from './tienda.service';

@Controller('tienda')
export class TiendaController {
  constructor(private tiendaService: TiendaService) {}

  @Get()
  getTiendas(): Promise<Tienda[]> {
    return this.tiendaService.findAll();
  }

  @Post()
  createUsuario(@Body() createTiendaDto: CreateTiendaDto): Promise<Tienda> {
    return this.tiendaService.create(createTiendaDto);
  }
}
