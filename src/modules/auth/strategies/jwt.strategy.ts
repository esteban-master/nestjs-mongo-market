import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioService } from '../../usuario/usuario.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usuarioService: UsuarioService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        function (req) {
          let token = null;
          // console.log(req.cookies);
          if (req && req.cookies) {
            token = req.cookies['auth'];
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt_config.secret'),
    });
  }

  // Para la estrategia jwt, Passport primero verifica la firma del JWT y decodifica el JSON. Luego invoca nuestro validate() método pasando el JSON decodificado como su único parámetro. Según la forma en que funciona la firma de JWT, tenemos la garantía de que estamos recibiendo un token válido que hemos firmado y emitido previamente a un usuario válido.

  async validate(payload: { _id: string }) {
    return this.usuarioService.findOne(payload._id);
  }
}
