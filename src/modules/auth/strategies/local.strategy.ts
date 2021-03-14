import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Usuario } from '../../usuario/schema/usuario.shema';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  // El validate()método para cualquier estrategia de Passport seguirá un patrón similar, variando solo en los detalles de cómo se representan las credenciales. Si se encuentra un usuario y las credenciales son válidas, se devuelve el usuario para que Passport pueda completar sus tareas (por ejemplo, crear la userpropiedad en el Requestobjeto) y la canalización de manejo de solicitudes puede continuar. Si no se encuentra, lanzamos una excepción
  async validate(email: string, password: string): Promise<Usuario> {
    return await this.authService.validateUsuario(email, password);
  }
}
