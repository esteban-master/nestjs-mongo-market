import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTiendaDto } from './dto/createTienda.dto';
import { Tienda } from './shemas/tienda.shema';
import { Types } from 'mongoose';
import { Usuario } from '../usuario/schemas/usuario.shema';
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
    newTienda.propietario = Types.ObjectId(usuarioPeticion._id);
    return await newTienda.save();
  }

  async findOne(tiendaId: string): Promise<Tienda> {
    const findTienda = await this.tiendaModel.findOne({ _id: tiendaId });
    if (!findTienda) throw new NotFoundException('Tienda no encontrada');

    return findTienda;
  }

  async findAll(): Promise<Tienda[]> {
    return await this.tiendaModel.find().populate('propietario', '_id name');
  }

  async findByPropietario(
    usuarioId: string,
    idUsuarioPeticion: Usuario,
  ): Promise<Tienda[]> {
    this.esPropietario(usuarioId, idUsuarioPeticion._id);

    return await this.tiendaModel
      .find({
        propietario: Types.ObjectId(usuarioId),
      })
      .populate('propietario', '_id name');
  }

  async update(
    tiendaId: string,
    editDto: EditTiendaDto,
    usuarioPeticion: Usuario,
  ): Promise<Tienda> {
    const findTienda = await this.findOne(tiendaId);

    this.esPropietario(
      findTienda.propietario,
      usuarioPeticion._id,
      `Solo puedes editar tus tiendas`,
    );

    const editTienda = Object.assign(findTienda, editDto);
    return await editTienda.save();
  }

  private esPropietario(
    idPropietario: Types.ObjectId | string,
    idUsuarioPeticion: Types.ObjectId,
    mensajeError?: string,
  ): boolean {
    const isMatch = String(idPropietario) === String(idUsuarioPeticion);
    if (!isMatch) throw new UnauthorizedException(mensajeError ?? '');
    return;
  }
}
