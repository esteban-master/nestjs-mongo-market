import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TiendaModule } from './modules/tienda/tienda.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    AuthModule,
    TiendaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
