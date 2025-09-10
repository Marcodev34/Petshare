import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';

import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UpdatePetDto } from './dto/update-pet.dto';
import { User } from 'src/users/decorators/user.decorator';
import { JwtUser } from 'src/interfaces/user.interface';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdatePhotosDto } from './dto/UpdatePhotos.dto';
import {
  SwaggerFindAllPets,
  SwaggerCreatePet,
  SwaggerFindPet,
  SwaggerUpdatePet,
  SwaggerDeletePet,
  SwaggerUpdateAvatar,
  SwaggerUpdatePhotos,
} from './swagger/pet.swagger';

@Controller('pets')
@UseGuards(JwtAuthGuard)
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @SwaggerCreatePet()
  @UseInterceptors(FilesInterceptor('photos', 5))
  create(
    @Body() createPetDto: CreatePetDto,
    @User() user: JwtUser,
    @UploadedFiles() photos: Express.Multer.File[],
  ) {
    return this.petsService.create(createPetDto, user.id, photos);
  }

  @Get()
  @SwaggerFindAllPets()
  findAll(@User() user: JwtUser) {
    return this.petsService.findAll(user.id);
  }

  @Get(':id')
  @SwaggerFindPet()
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  @SwaggerUpdatePet()
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(id, updatePetDto);
  }

  @Patch(':id/avatar')
  @SwaggerUpdateAvatar()
  @UseInterceptors(FilesInterceptor('avatar', 1))
  updateAvatar(
    @Param('id') id: string,
    @UploadedFiles() avatar: Express.Multer.File[],
  ) {
    return this.petsService.updateAvatar(id, avatar);
  }

  @Patch(':id/photos')
  @SwaggerUpdatePhotos()
  @UseInterceptors(FilesInterceptor('photos', 4))
  updatePhotos(
    @Param('id') id: string,
    @UploadedFiles() photos: Express.Multer.File[],
    @Body() body: UpdatePhotosDto,
  ) {
    console.log(body.removePhotos);
    return this.petsService.updatePhotos(id, photos, body.removePhotos);
  }

  @Delete(':id')
  @SwaggerDeletePet()
  remove(@Param('id') id: string) {
    return this.petsService.remove(id);
  }
}
