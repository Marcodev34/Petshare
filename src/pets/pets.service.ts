import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async create(createPetDto: CreatePetDto, userId: string) {
    return this.prisma.pets.create({
      data: {
        ...createPetDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.pets.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.pets.findUnique({
      where: { id },
    });
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    const existingPet = await this.prisma.pets.findUnique({
      where: { id },
    });

    if (!existingPet) {
      throw new Error('Pet not found');
    }

    return this.prisma.pets.update({
      where: { id },
      data: updatePetDto,
    });
  }

  remove(id: string) {
    return this.prisma.pets.delete({
      where: { id },
    });
  }
}
