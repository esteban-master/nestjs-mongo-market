import { PartialType } from '@nestjs/mapped-types';
import { CreateTiendaDto } from './createTienda.dto';

export class EditTiendaDto extends PartialType(CreateTiendaDto) {}
