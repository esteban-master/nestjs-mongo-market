import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { AppRoles } from 'src/app.roles';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsArray()
  @IsEnum(AppRoles, {
    each: true,
    message: `Los roles validos son ${Object.keys(AppRoles).join()}`,
  })
  roles: string[];
}
