import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  SetMetadata,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GetModel } from 'src/common/decorators/model.decorator';
import { JwtAuthGuard } from '../auth/guards';
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

  @UseGuards(JwtAuthGuard)
  @Get('/:usuarioId')
  getUsuario(
    @Param('usuarioId') usuarioId: string,
    @GetModel('user') userQueHacePeticion: Usuario,
  ): Promise<Usuario> {
    if (userQueHacePeticion._id != usuarioId) throw new UnauthorizedException();

    return this.usuariosService.findOne(usuarioId);
  }

  @Post()
  createUsuario(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuariosService.create(createUsuarioDto);
  }
}
