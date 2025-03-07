import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from 'src/common/pipe/file-validation.pipe';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/:userID')
  @UseGuards(AuthGuard)
  async getProfile(@Param('userID', ParseIntPipe) params: any) {
    const profile = await this.profileService.getProfile(params);
    return profile;
  }

  @Put('/upload/avatar/:userID')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  updateProfileAvatar(
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
    @Param('userID', ParseIntPipe) id,
  ) {
    this.profileService.updateProfileAvatar(file.filename, id);
    return 'success';
  }

  @Put('/upload/background/:userID')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('background'))
  updateProfileBackground(
    @UploadedFile(new FileSizeValidationPipe()) file: Express.Multer.File,
    @Param('userID', ParseIntPipe) id,
  ) {
    this.profileService.updateProfileBackground(file.filename, id);
    return 'success';
  }

  @Put('/:userID')
  updateProfileDetail(
    @Body(new ValidationPipe()) userProfile: UpdateProfileDto,
    @Param('userID', ParseIntPipe) id,
  ) {
    this.profileService.updateProfileDetail(userProfile, id);
    return 'success';
  }
}
