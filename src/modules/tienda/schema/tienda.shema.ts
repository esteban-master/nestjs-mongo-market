import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Tienda extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: 'Usuario' })
  propietario: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const TiendaSchema = SchemaFactory.createForClass(Tienda);
