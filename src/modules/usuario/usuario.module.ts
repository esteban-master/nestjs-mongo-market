import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Usuario, UsuarioSchema } from './schema/usuario.shema';

import { hashSync } from 'bcrypt';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Usuario.name,
        useFactory: () => {
          const schema = UsuarioSchema;
          schema.pre('save', async function (next) {
            if (this.isModified('password')) {
              this.password = hashSync(this.password, 10);
              next();
            }
            next();
          });

          schema.pre('updateOne', async function (next) {
            if (this.isModified('password')) {
              this.password = hashSync(this.password, 10);
              next();
            }
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
