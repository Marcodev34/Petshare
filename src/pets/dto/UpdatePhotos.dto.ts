import { Transform } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class UpdatePhotosDto {
  @IsArray()
  @IsString({ each: true })
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
  removePhotos: string[];
}
