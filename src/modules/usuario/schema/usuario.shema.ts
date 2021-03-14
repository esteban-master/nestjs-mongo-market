import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Usuario extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  password: string;

  @Prop([String])
  roles: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
