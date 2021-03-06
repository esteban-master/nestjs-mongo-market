import { forwardRef, Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from './schema';
import { TiendaModule } from '../tienda/tienda.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Producto.name, schema: ProductoSchema },
    ]),
    forwardRef(() => TiendaModule),
  ],
  providers: [ProductoService],
  controllers: [ProductoController],
  exports: [ProductoService],
})
export class ProductoModule {}
