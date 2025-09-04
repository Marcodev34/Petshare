import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
} from '@nestjs/swagger';
import { PetResponseDto } from '../dto/pet-response.dto';
import {
  CreatePetDto,
  CreatePetWithoutPhotosDto,
  UpdatePetAvatarDto,
  UpdatePetPhotosDto,
} from '../dto/create-pet.dto';

export function SwaggerFindAllPets() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      status: 201,
      description: 'Pets retornados com sucesso.',
      type: PetResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Pets nao encontrado' }),
  );
}

export function SwaggerCreatePet() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiConsumes('multipart/form-data'),
    ApiBody({ type: CreatePetDto }),
    ApiResponse({
      status: 201,
      description: 'Pets retornados com sucesso.',
      type: PetResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Pets nao encontrado' }),
  );
}

export function SwaggerFindPet() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      status: 201,
      description: 'Pet retornado com sucesso.',
      type: PetResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Pet nao encontrado' }),
  );
}
export function SwaggerUpdatePet() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiBody({ type: CreatePetWithoutPhotosDto }),
    ApiResponse({
      status: 201,
      description: 'Pet retornado com sucesso.',
      type: PetResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Pet nao encontrado' }),
  );
}

export function SwaggerDeletePet() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      status: 201,
      description: 'Pet retornado com sucesso.',
      type: PetResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Pet nao encontrado' }),
  );
}

export function SwaggerUpdateAvatar() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiConsumes('multipart/form-data'),
    ApiBody({ type: UpdatePetAvatarDto }),
    ApiResponse({
      status: 201,
      description: 'Pet retornado com sucesso.',
      type: PetResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Pet nao encontrado' }),
  );
}

export function SwaggerUpdatePhotos() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiConsumes('multipart/form-data'),
    ApiBody({ type: UpdatePetPhotosDto }),
    ApiResponse({
      status: 201,
      description: 'Pet retornado com sucesso.',
      type: PetResponseDto,
    }),
    ApiResponse({ status: 404, description: 'Pet nao encontrado' }),
  );
}
