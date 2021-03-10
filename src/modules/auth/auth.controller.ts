import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import { GetModel } from 'src/common/decorators/model.decorator';
import { Usuario } from '../usuario/schemas/usuario.shema';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@GetModel('user') usuario: Usuario) {
    return this.authService.login(usuario);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@GetModel('user') usuario: Usuario) {
    return usuario;
  }
}
