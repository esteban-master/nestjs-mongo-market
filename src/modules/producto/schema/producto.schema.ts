import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
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

  @Prop(
    raw({
      descuento: { type: Number },
      originalPrice: { type: Number },
      offerPrice: { type: Number },
      descuentoPorcentajeInternet: { type: Number },
      descuentoPorcentajeCard: { type: Number },
      cardPrice: { type: Number },
      formattedOfferPrice: { type: String },
      formattedCardPrice: { type: String },
      formattedOriginalPrice: { type: String },
    }),
  )
  prices: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'Tienda' })
  tienda: Types.ObjectId;

  @Prop()
  image: string;

  @Prop([
    raw({
      nameCliente: { type: String },
      title: { type: String },
      comment: { type: String },
      rating: { type: Number },
      ubicacion: { type: String },
      createdAt: { type: Date, default: Date.now },
      emailCliente: { type: String },
    }),
  ])
  comments: Record<string, any>[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
