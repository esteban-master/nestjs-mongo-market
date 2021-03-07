import { Injectable } from '@nestjs/common';
import { Usuario } from '../usuario/schemas/usuario.shema';
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

    if (usuario && passwordMatch) {
      usuario.password = undefined;
      return usuario;
    }
    return null;
  }

  async login(user: Usuario) {
    const payload = { _id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async comparePassword(password: string, encryptedPassword: string) {
    return await compare(password, encryptedPassword);
  }
}
