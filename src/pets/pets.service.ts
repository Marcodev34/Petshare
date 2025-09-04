import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { supabase } from 'src/config/supabase.config';
@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}
  SUPABASE_BUCKET = process.env.SUPABASE_BUCKET as string;
  async create(
    createPetDto: CreatePetDto,
    userId: string,
    photos: Express.Multer.File[],
  ) {
    const uploadedPhotos = await this.uploadPhotos(photos);
    const userData = {
      ...createPetDto,
      avatar: uploadedPhotos[0], // primeira foto é o avatar
      photo1: uploadedPhotos[1] || null,
      photo2: uploadedPhotos[2] || null,
      photo3: uploadedPhotos[3] || null,
      photo4: uploadedPhotos[4] || null,
    };
    delete userData.photos;

    return this.prisma.pets.create({
      data: {
        ...userData,
        userId,
      },
    });
  }

  async uploadPhotos(photos: Express.Multer.File[]): Promise<string[]> {
    const uploadPromises = photos.map(async (photo, index) => {
      const fileName = `${Date.now()}-${index}`;
      const filePath = `pets/${fileName}`;

      const { data, error } = await supabase.storage
        .from(this.SUPABASE_BUCKET) // nome do seu bucket
        .upload(filePath, photo.buffer, {
          contentType: photo.mimetype,
        });

      if (error) {
        throw new Error(
          `Erro no upload da foto ${index + 1}: ${error.message}`,
        );
      }

      // Retorna a URL pública da foto
      const { data: publicUrl } = supabase.storage
        .from(this.SUPABASE_BUCKET)
        .getPublicUrl(data.path);

      return publicUrl.publicUrl;
    });

    return Promise.all(uploadPromises);
  }

  async findAll(userId: string) {
    return this.prisma.pets.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string) {
    const pet = await this.prisma.pets.findUnique({
      where: { id },
    });

    if (!pet) {
      throw new NotFoundException('pet not found');
    }

    return pet;
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

  async updateAvatar(
    id: string,
    avatar: Express.Multer.File[],
    removePhotos?: string[],
  ) {
    const pet = await this.prisma.pets.findUnique({
      where: { id },
    });
    if (!pet?.avatar) {
      throw new NotFoundException('pet not found');
    }

    if (avatar.length === 0) {
      throw new NotFoundException('No photo uploaded');
    }

    const uploadedPhotos = await this.uploadPhotos(avatar);

    const petData = {
      ...pet,
      avatar: uploadedPhotos[0],
    };

    await this.deletePhotosFromSupabase([pet.avatar]);

    return this.prisma.pets.update({
      where: { id },
      data: petData,
    });
  }

  async updatePhotos(
    id: string,
    photos: Express.Multer.File[],
    removePhotos?: string[],
  ) {
    const pet = await this.prisma.pets.findUnique({
      where: { id },
    });

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    const photoFields = ['photo1', 'photo2', 'photo3', 'photo4'];
    const updatedData = {};
    const urlsToRemove: string[] = [];
    let hasChanges = false;

    // Remover fotos solicitadas
    if (removePhotos?.length) {
      for (const field of removePhotos) {
        if (photoFields.includes(field)) {
          if (pet[field]) {
            urlsToRemove.push(pet[field]);
            updatedData[field] = null;
            hasChanges = true;
          }
        }
      }
    }

    // Upload das novas fotos e remoção das fotos antigas substituídas
    if (photos && photos.length > 0) {
      // Primeiro, remove as fotos antigas que serão substituídas
      const photosToReplace: string[] = [];
      for (let i = 0; i < Math.min(photos.length, photoFields.length); i++) {
        const field = photoFields[i];
        if (pet[field]) {
          photosToReplace.push(pet[field]);
        }
      }

      if (photosToReplace.length > 0) {
        urlsToRemove.push(...photosToReplace);
      }

      try {
        const uploadedPhotos = await this.uploadPhotos(photos);

        // Mapeia as novas fotos para os campos photo1, photo2, etc.
        for (
          let i = 0;
          i < Math.min(uploadedPhotos.length, photoFields.length);
          i++
        ) {
          const field = photoFields[i];
          updatedData[field] = uploadedPhotos[i];
          hasChanges = true;
        }
      } catch (error) {
        throw new Error(`Erro no upload das fotos: ${error.message}`);
      }
    }

    // Remove todas as fotos coletadas do Supabase
    if (urlsToRemove.length > 0) {
      try {
        await this.deletePhotosFromSupabase(urlsToRemove);
      } catch (error) {
        // Continua mesmo se houver erro na remoção
      }
    }

    // Verifica se há mudanças para atualizar
    if (!hasChanges) {
      return pet;
    }

    // Atualiza no banco
    try {
      const updatedPet = await this.prisma.pets.update({
        where: { id },
        data: updatedData,
      });
      return updatedPet;
    } catch (error) {
      throw new Error(`Erro ao atualizar pet: ${error.message}`);
    }
  }

  async remove(id: string) {
    const pet = await this.prisma.pets.findUnique({
      where: { id },
    });

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    const ImgPetsUrls = await this.prisma.pets.findUnique({
      where: { id },
      select: {
        avatar: true,
        photo1: true,
        photo2: true,
        photo3: true,
        photo4: true,
      },
    });

    if (ImgPetsUrls) {
      const urls = Object.values(ImgPetsUrls).filter((url) => url !== null);

      await this.deletePhotosFromSupabase(urls);
    }

    return this.prisma.pets.delete({
      where: { id },
    });
  }

  async deletePhotosFromSupabase(photoUrls: string[]) {
    try {
      // Filtrar URLs válidas (não null/undefined)
      const validUrls = photoUrls.filter(
        (url) => url !== null && url !== undefined,
      );

      for (const url of validUrls) {
        const filePath = url.split(`${this.SUPABASE_BUCKET}/`)[1];

        if (filePath) {
          const { error } = await supabase.storage
            .from(this.SUPABASE_BUCKET)
            .remove([filePath]);

          if (error) {
            console.error(`Error deleting file ${filePath}:`, error.message);
          } else {
            console.log(`Successfully deleted photo: ${filePath}`);
          }
        }
      }
    } catch (error) {
      console.error('Error in deletePhotosFromSupabase:', error);
    }
  }
}
