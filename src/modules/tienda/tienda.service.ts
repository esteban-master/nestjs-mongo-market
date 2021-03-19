import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTiendaDto } from './dto/createTienda.dto';
import { Tienda } from './schema/tienda.shema';
import { Types } from 'mongoose';
import { Usuario } from '../usuario/schema/usuario.shema';
import { EditTiendaDto } from './dto/editTienda.dto';

@Injectable()
export class TiendaService {
  constructor(
    @InjectModel(Tienda.name) private readonly tiendaModel: Model<Tienda>,
  ) {}

  async create(
    createTiendaDto: CreateTiendaDto,
    usuarioPeticion: Usuario,
  ): Promise<Tienda> {
    const newTienda = new this.tiendaModel(createTiendaDto);
    newTienda.propietario = usuarioPeticion._id;
    return await newTienda.save();
  }

  async findOne(
    tiendaId: string,
    populatePropietario?: boolean,
  ): Promise<Tienda> {
    let findTienda = null;
    if (populatePropietario) {
      findTienda = await this.tiendaModel
        .findOne({ _id: tiendaId })
        .populate('propietario', '_id name');
    } else {
      findTienda = await this.tiendaModel.findOne({ _id: tiendaId });
    }
    if (!findTienda) throw new NotFoundException('Tienda no encontrada');

    return findTienda;
  }

  async findAll(): Promise<Tienda[]> {
    return await this.tiendaModel.find().populate('propietario', '_id name');
  }

  async findByPropietario(usuarioId: string): Promise<Tienda[]> {
    return await this.tiendaModel
      .find({
        propietario: Types.ObjectId(usuarioId),
      })
      .populate('propietario', '_id name');
  }

  async update(tienda: Tienda, editDto: EditTiendaDto): Promise<Tienda> {
    const editTienda = Object.assign(tienda, editDto);
    return await editTienda.save();
  }

  async delete(tienda: Tienda) {
    return await tienda.remove();
  }

  private esPropietario(
    idPropietario: Types.ObjectId | string,
    idUsuarioPeticion: string,
    mensajeError?: string,
  ): boolean {
    const isMatch = String(idPropietario) === String(idUsuarioPeticion);
    if (!isMatch) throw new UnauthorizedException(mensajeError ?? '');
    return;
  }
}
