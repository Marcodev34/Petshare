import { IsOptional, IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreatePetDto {
  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  photo1?: string;

  @IsOptional()
  @IsString()
  photo2?: string;

  @IsOptional()
  @IsString()
  photo3?: string;

  @IsOptional()
  @IsString()
  photo4?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  @IsNotEmpty()
  breed: string;

  @IsString()
  @IsNotEmpty()
  sex: string;

  @IsString()
  @IsNotEmpty()
  tutor: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
