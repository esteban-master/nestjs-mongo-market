import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { TiendaModule } from './modules/tienda/tienda.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { AccessControlModule } from 'nest-access-control';

import databaseConfig from './config/database/database.config';
import jwtConfig from './common/jwt/jwt.config';
import { roles } from './app.roles';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, jwtConfig],
    }),
    AccessControlModule.forRoles(roles),
    DatabaseModule,
    AuthModule,
    TiendaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
