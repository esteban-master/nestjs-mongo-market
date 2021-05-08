import {
  Length,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateProductoDto {
  @IsNotEmpty()
  @IsString()
  @Length(5)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly categoria: string;

  @IsNotEmpty()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @IsNumber()
  readonly cantidad: number;

  @IsNotEmpty()
  @ValidateNested()
  readonly prices: {
    originalPrice: number;
    descuentoPorcentajeInternet: number;
    descuentoPorcentajeCard: number;
  };
}
