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
import { User } from 'src/decorators/user.decorator';
import { JwtUser } from 'src/interfaces/user.interface';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('pets')
@UseGuards(JwtAuthGuard)
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('photos', 5))
  create(
    @Body() createPetDto: CreatePetDto,
    @User() user: JwtUser,
    @UploadedFiles() photos: Express.Multer.File[],
  ) {
    return this.petsService.create(createPetDto, user.id, photos);
  }

  @Get()
  findAll(@User() user: JwtUser) {
    return this.petsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(id, updatePetDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(id);
  }
}
