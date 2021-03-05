import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { Usuario } from './schemas/usuario.shema';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private usuariosService: UsuarioService) {}

  @Get()
  async getUsuarios(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @Post()
  async createUsuario(
    @Body() createUsuarioDto: CreateUsuarioDto,
  ): Promise<Usuario> {
    return this.usuariosService.create(createUsuarioDto);
  }
}
