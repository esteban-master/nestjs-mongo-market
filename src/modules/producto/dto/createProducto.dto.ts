import { Length, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsNumber()
  readonly price: number;
}
