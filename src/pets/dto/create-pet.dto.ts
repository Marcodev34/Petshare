import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreatePetDto {
  @ApiProperty({ example: 'fibs' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '44' })
  @IsString()
  age: string;

  @ApiProperty({ example: 'caramelo' })
  @IsString()
  @IsNotEmpty()
  breed: string;

  @ApiProperty({ example: 'femea' })
  @IsString()
  @IsNotEmpty()
  sex: string;

  @ApiProperty({ example: 'Pedro' })
  @IsString()
  @IsNotEmpty()
  tutor: string;

  @ApiProperty({ example: 'Ceara' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: 'gente fina so' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    isArray: true,
    required: false,
    description: 'Fotos do pet (até 5 imagens)',
  })
  photos?: Express.Multer.File[];
}

export class CreatePetWithoutPhotosDto extends OmitType(CreatePetDto, [
  'photos',
] as const) {}

export class UpdatePetAvatarDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Avatar do pet (arquivo único)',
  })
  avatar: Express.Multer.File;
}

export class UpdatePetPhotosDto {
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    description: 'Novas fotos do pet (arquivos)',
    required: false,
  })
  @IsOptional()
  photos?: Express.Multer.File[];

  @ApiProperty({
    type: 'array',
    items: { type: 'string' },
    description:
      'Fotos antigas a serem removidas. Exemplo: ["photo2","photo3"]',
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return value;
  })
  removePhotos?: string[];
}
