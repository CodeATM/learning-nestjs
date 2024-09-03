import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class userDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  email: string;
  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'valid role required',
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}