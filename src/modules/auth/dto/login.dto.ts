import { IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail()
    @MinLength(10)
    @IsNotEmpty()
    email: string;
  
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
