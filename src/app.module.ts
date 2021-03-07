import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { TiendaModule } from './modules/tienda/tienda.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';

import databaseConfig from './config/database/database.config';
import jwtConfig from './common/jwt/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, jwtConfig],
    }),
    DatabaseModule,
    AuthModule,
    TiendaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
