import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { User } from 'src/common/decorators';
import { Usuario } from '../usuario/schema/usuario.shema';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @User('user') usuario: Usuario,
    @Res({ passthrough: true }) res: Response,
  ) {
    const loginUsuario = await this.authService.login(usuario);
    res.status(200);
    return loginUsuario;
  }
}
