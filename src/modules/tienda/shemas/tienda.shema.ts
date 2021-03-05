import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Usuario } from '../../usuario/schemas/usuario.shema';

@Schema()
export class Tienda extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'Usuario' })
  propietario: Usuario;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TiendaSchema = SchemaFactory.createForClass(Tienda);
