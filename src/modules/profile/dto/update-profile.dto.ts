import { IsDateString, IsString, IsNotEmpty } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  address: string;

  @IsDateString()
  birthDay: Date;

  @IsString()
  school: string;

  @IsString()
  work: string;

  @IsString()
  nickName: string;

  @IsString()
  bio: string;
}
