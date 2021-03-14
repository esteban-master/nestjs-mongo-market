import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';
import { ID } from '../constants';

Injectable();
export class IsValidId implements PipeTransform {
  transform(id: ID) {
    if (typeof id === 'string') {
      if (!Types.ObjectId.isValid(id))
        throw new BadRequestException('ID invalido');
    } else {
      const valid = Object.values(id).every((id) => Types.ObjectId.isValid(id));
      if (!valid) throw new BadRequestException('Identificadores invalidos');
    }

    return id;
  }
}
