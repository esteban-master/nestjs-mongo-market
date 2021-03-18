import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { User } from 'src/common/decorators/model.decorator';
import { Usuario } from '../usuario/schema/usuario.shema';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/salir')
  salir(@Res() res: Response) {
    res.clearCookie('auth');
    res.status(200);
    return res.json({
      mensaje: 'Sesion cerrada',
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @User('user') usuario: Usuario,
    @Res({ passthrough: true }) res: Response,
  ) {
    const usuarioLogin = await this.authService.login(usuario);
    res.cookie('auth', usuarioLogin.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    res.status(200);
    return usuarioLogin;
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/profile')
  // getProfile(@User('user') usuario: Usuario) {
  //   return usuario;
  // }
}
