import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateFilmDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsDateString()
  releaseData: Date;
}
