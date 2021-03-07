import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTiendaDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly image: string;
}
