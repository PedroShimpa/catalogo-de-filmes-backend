import { IsDate, IsNotEmpty } from "class-validator";

export class CreateFilmDto {
  @IsNotEmpty()
  name: string;
  description: string;

  @IsDate()
  releaseData: Date;

}
