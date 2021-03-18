import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Usuario } from '../usuario/schema/usuario.shema';
import { UsuarioService } from '../usuario/usuario.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validateUsuario(email: string, password: string): Promise<Usuario> {
    const usuario = await this.usuarioService.findByEmail(email);
    const passwordMatch = await this.comparePassword(
      password,
      usuario.password,
    );

    if (!passwordMatch) throw new UnauthorizedException('Password incorrecto');

    usuario.password = undefined;
    return usuario;
  }

  async login(user: Usuario) {
    const payload = { _id: user._id };
    const jwt = this.jwtService.sign(payload);
    return {
      user,
      token: jwt,
    };
  }

  private async comparePassword(password: string, encryptedPassword: string) {
    return await compare(password, encryptedPassword);
  }
}
