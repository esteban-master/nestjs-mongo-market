import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Producto extends Document {
  @Prop({ trim: true, required: true })
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ required: true })
  categoria: string;

  @Prop()
  cantidad: number;

  @Prop()
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'Tienda' })
  tienda: Types.ObjectId;

  @Prop()
  image: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
