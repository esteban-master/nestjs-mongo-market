import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './schema/usuario.shema';
import { CreateUsuarioDto } from './dto/createUsuario.dto';
import { AppRoles } from 'src/app.roles';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    createUsuarioDto.roles = undefined;
    try {
      const newUsuario = new this.usuarioModel(createUsuarioDto);
      newUsuario.roles.push(AppRoles.NORMAL);
      await newUsuario.save();
      newUsuario.password = undefined;
      return newUsuario;
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException(
          `Email ${createUsuarioDto.email} ya existe`,
        );
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findById(id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    usuario.password = undefined;
    return usuario;
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  async findByEmail(email: string) {
    const usuario = await this.usuarioModel.findOne({ email });
    if (!usuario)
      throw new NotFoundException(
        `Ningun usuario con email ${email} encontrado`,
      );
    return usuario;
  }
}
