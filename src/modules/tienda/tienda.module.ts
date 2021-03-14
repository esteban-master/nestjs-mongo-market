import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tienda, TiendaSchema } from './schema';
import { TiendaController } from './tienda.controller';
import { TiendaService } from './tienda.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tienda.name,
        schema: TiendaSchema,
      },
    ]),
  ],
  controllers: [TiendaController],
  providers: [TiendaService],
  exports: [TiendaService],
})
export class TiendaModule {}
