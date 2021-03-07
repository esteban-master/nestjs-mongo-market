import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTiendaDto } from './dto/createTienda.dto';
import { Tienda } from './shemas/tienda.shema';
import { Types } from 'mongoose';

@Injectable()
export class TiendaService {
  constructor(
    @InjectModel(Tienda.name) private readonly tiendaModel: Model<Tienda>,
  ) {}

  async create(createTiendaDto: CreateTiendaDto): Promise<Tienda> {
    const newTienda = new this.tiendaModel(createTiendaDto);
    newTienda.propietario = Types.ObjectId('6042a61f39885f483c617a89');
    return await newTienda.save();
  }

  async findAll(): Promise<Tienda[]> {
    return this.tiendaModel.find().populate('propietario', '_id name').exec();
  }
}
