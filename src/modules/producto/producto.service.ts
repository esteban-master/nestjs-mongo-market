import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ListarQuery, Params } from 'src/common/constants';
import { TiendaService } from '../tienda/tienda.service';
import { Usuario } from '../usuario/schema/usuario.shema';
import { CreateProductoDto } from './dto';
import { Producto } from './schema';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Producto.name) private readonly productoModel: Model<Producto>,
    private tiendaService: TiendaService,
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

  async findOne(productoId: string) {
    return this.productoModel
      .findById(productoId)
      .populate('tienda', '_id name');
  }

  async getCategorias() {
    return this.productoModel.distinct('categoria');
  }

  async create(
    createProductoDto: CreateProductoDto,
    tiendaId: string,
    usuarioPeticion: Usuario,
  ): Promise<Producto> {
    const tienda = await this.tiendaService.findOne(tiendaId);

    this.usuarioEsPropietarioDeTienda(
      usuarioPeticion._id,
      tienda.propietario,
      `No eres propietario de la tienda`,
    );

    const newProducto = new this.productoModel(createProductoDto);
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

  async remove(params: Params, usuarioPeticion: Usuario) {
    const tienda = await this.tiendaService.findOne(params.tiendaId);
    const producto = await this.productoModel.findById(params.productoId);

    this.usuarioEsPropietarioDeTienda(
      usuarioPeticion._id,
      tienda.propietario,
      'Usuario no es propietario de la tienda',
    );

    // Ver si el producto pertenece a esa tienda
    if (producto) {
      this.productoPerteneceAlaTienda(
        producto.tienda,
        tienda._id,
        `'El producto ${producto.name}, no pertenece a la tienda: '${tienda.name}`,
      );

      return await producto.remove();
    }
  }

  private usuarioEsPropietarioDeTienda(
    usuarioPeticionId: string,
    propietarioTiendaId: string | Types.ObjectId,
    mensajeError?: string,
  ) {
    if (!this.isMatch(usuarioPeticionId, propietarioTiendaId.toString()))
      throw new UnauthorizedException(mensajeError ?? '');
    return;
  }

  private productoPerteneceAlaTienda(
    productoTiendaId: string | Types.ObjectId,
    tiendaId: string,
    mensajeError?: string,
  ) {
    if (!this.isMatch(productoTiendaId.toString(), tiendaId))
      throw new BadRequestException(mensajeError ?? '');
    return;
  }

  private isMatch(id: string, id2: string) {
    return String(id) === String(id2);
  }
}
