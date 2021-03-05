import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './modules/usuario/usuario.module';
// import { TiendaModule } from './modules/tienda/tienda.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    UsuarioModule,
    // TiendaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
