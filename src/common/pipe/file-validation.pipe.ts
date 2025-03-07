import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File, metadata: ArgumentMetadata) {
    // return file.size < 1000
    if (file.size > 1000000) {
      throw new BadRequestException('file size must be less than 1MB');
    }
    return file;
  }
}
