import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './schemas/usuario.shema';
import { CreateUsuarioDto } from './dto/createUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      const newUsuario = new this.usuarioModel(createUsuarioDto);
      return await newUsuario.save();
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException(
          `Email ${createUsuarioDto.email} ya existe`,
        );
      throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }
}
