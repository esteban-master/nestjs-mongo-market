import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/common/decorators/';
import { IsValidId } from 'src/common/pipes';
import { JwtAuthGuard } from '../auth/guards';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { Usuario } from './schema/usuario.shema';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private usuariosService: UsuarioService) {}

  @Get()
  getAllUsuarios(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:usuarioId')
  getUsuario(
    @Param('usuarioId', IsValidId) usuarioId: string,
    @User() userQueHacePeticion: Usuario,
  ): Promise<Usuario> {
    if (userQueHacePeticion._id != usuarioId) throw new UnauthorizedException();

    return this.usuariosService.findOne(usuarioId);
  }

  @Post()
  createUsuario(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuariosService.create(createUsuarioDto);
  }
}
