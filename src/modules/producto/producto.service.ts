import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ListarQuery } from 'src/common/constants';
import { Tienda } from '../tienda/schema';
import { CreateProductoDto } from './dto';
import { Producto } from './schema';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Producto.name) private readonly productoModel: Model<Producto>,
  ) {}

  async listar(queries: ListarQuery): Promise<Producto[]> {
    const query: {
      name?: { $regex: string; $options: string };
      categoria?: string;
    } = {};
    if (queries.buscar) {
      query.name = { $regex: queries.buscar, $options: 'i' };
    }

    if (queries.categoria && queries.categoria !== 'All') {
      query.categoria = queries.categoria.toString();
    }

    return await this.productoModel
      .find(query)
      .populate('tienda', '_id name')
      .exec();
  }

  async listarUltimos(): Promise<Producto[]> {
    return await this.productoModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('tienda', '_id name')
      .exec();
  }

  async findOne(productoId: string, populateTienda?: boolean) {
    let findProducto = null;
    if (populateTienda) {
      findProducto = await this.productoModel
        .findById(productoId, { 'comments.emailCliente': 0 })
        .populate('tienda', '_id name');
    } else {
      findProducto = await this.productoModel.findById(productoId);
    }

    if (!findProducto) throw new NotFoundException('Producto no encontrado');
    return findProducto;
  }

  async getCategorias() {
    return this.productoModel.distinct('categoria');
  }

  async addComentario({ comment, productoId }: any) {
    const findProducto = await this.productoModel.findById(productoId);
    findProducto.comments.push(comment);
    return await findProducto.save();
  }

  async create(
    createProductoDto: CreateProductoDto,
    tienda: Tienda,
  ): Promise<Producto | any> {
    const prices = this.getPricesValues(createProductoDto.prices);
    const newProducto = new this.productoModel({
      ...createProductoDto,
      prices,
    });
    newProducto.tienda = tienda._id;
    await newProducto.save();
    return {
      ...newProducto['_doc'],
      tienda: {
        _id: tienda._id,
        name: tienda.name,
      },
    };
  }

  async findByTienda(tiendaId: string) {
    return await this.productoModel
      .find({ tienda: Types.ObjectId(tiendaId) })
      .populate('tienda', '_id name');
  }

  async remove(producto: Producto) {
    return await producto.remove();
  }

  private getPricesValues(prices: any) {
    let newPrices = {};
    if (prices.descuentoPorcentajeInternet > 0) {
      const { originalPrice, descuentoPorcentajeInternet } = prices;
      const descuentoResult =
        (originalPrice * descuentoPorcentajeInternet) / 100;

      let descuento = 0;
      // Intl.NumberFormat no me formatea cuando el numero es de 4 cifras
      if (descuentoResult.toFixed(0).length < 5) {
        const descuentoResultSplit = descuentoResult.toFixed(0).split('');
        descuentoResultSplit.splice(1, 0, '.');
        descuento = Number(
          Math.ceil(Number(descuentoResultSplit.join(''))) + '000',
        );
      } else {
        descuento = Number(
          Math.ceil(
            Number(
              this.formatPrice(Number(descuentoResult.toFixed(0)), 'normal'),
            ),
          ) + '000',
        );
      }
      const offerPrice = originalPrice - descuento;
      const formattedOfferPrice = this.formatPrice(offerPrice, 'divisa');
      const formattedOriginalPrice = this.formatPrice(originalPrice, 'divisa');
      newPrices = {
        ...prices,
        descuento,
        offerPrice,
        formattedOfferPrice,
        formattedOriginalPrice,
      };
    }

    if (prices.descuentoPorcentajeCard > 0) {
      const { originalPrice, descuentoPorcentajeCard } = prices;
      const descuentoResult = (originalPrice * descuentoPorcentajeCard) / 100;

      let descuento = 0;
      // Intl.NumberFormat no me formatea cuando el numero es de 4 cifras
      if (descuentoResult.toFixed(0).length < 5) {
        const descuentoResultSplit = descuentoResult.toFixed(0).split('');
        descuentoResultSplit.splice(1, 0, '.');
        descuento = Number(
          Math.ceil(Number(descuentoResultSplit.join(''))) + '000',
        );
      } else {
        descuento = Number(
          Math.ceil(
            Number(
              this.formatPrice(Number(descuentoResult.toFixed(0)), 'normal'),
            ),
          ) + '000',
        );
      }
      const cardPrice = originalPrice - descuento;
      const formattedCardPrice = this.formatPrice(cardPrice, 'divisa');
      newPrices = {
        ...newPrices,
        descuento,
        cardPrice,
        formattedCardPrice,
      };
    }

    return newPrices;
  }

  private formatPrice(price: number, type: 'divisa' | 'normal') {
    if (type === 'divisa') {
      return Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
      }).format(price);
    } else {
      return Intl.NumberFormat('es-CL').format(price);
    }
  }
}
