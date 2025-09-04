import { ApiProperty } from '@nestjs/swagger';

export class PetResponseDto {
  @ApiProperty({ example: '51356388-adda-477a-a93e-3f72fbbcee36' })
  id: string;

  @ApiProperty({
    example: 'https://url/img/1754944001230-0',
    nullable: true,
  })
  avatar: string | null;

  @ApiProperty({
    example: 'https://url/img/1754944001230-1',
    nullable: true,
  })
  photo1: string | null;

  @ApiProperty({
    example: 'https://url/img/1754944001230-0',
    nullable: true,
  })
  photo2: string | null;

  @ApiProperty({
    example: 'https://url/img/1754944001230-0',
    nullable: true,
  })
  photo3: string | null;

  @ApiProperty({
    example: 'https://url/img/1754944001230-0',
    nullable: true,
  })
  photo4: string | null;

  @ApiProperty({ example: 'fibs' })
  name: string;

  @ApiProperty({ example: '44' })
  age: string;

  @ApiProperty({ example: 'caramelo' })
  breed: string;

  @ApiProperty({ example: 'femea' })
  sex: string;

  @ApiProperty({ example: 'Pedro' })
  tutor: string;

  @ApiProperty({ example: 'Ceara' })
  location: string;

  @ApiProperty({ example: 'gente fina so' })
  description: string;

  @ApiProperty({ example: '28eb444b-973b-4d37-a533-4e9d274ae614' })
  userId: string;

  @ApiProperty({ example: '2025-08-11T20:26:43.139Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-08-11T20:42:51.135Z' })
  updatedAt: Date;
}
