import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { Usuario } from './schemas/usuario.shema';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private usuariosService: UsuarioService) {}

  @Get()
  getUsuarios(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @Get('/:usuarioId')
  getUsuario(@Param('usuarioId') usuarioId: number): Promise<Usuario> {
    return this.usuariosService.findOne(usuarioId);
  }

  @Post()
  createUsuario(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuariosService.create(createUsuarioDto);
  }
}
