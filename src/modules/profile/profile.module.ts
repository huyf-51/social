import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { DatabaseModule } from '../database/database.module';
import { DataSource } from 'typeorm';
import { UserProfile } from 'src/database/entities/profile.entity';
import databaseProvider from '../database/database.provider';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  controllers: [ProfileController],
  providers: [
    ProfileService,
    {
      provide: 'USER_PROFILE_REPOSITORY',
      useFactory: (dataSource: DataSource) => {
        return dataSource.getRepository(UserProfile);
      },
      inject: ['DATA_SOURCE'],
    },
    databaseProvider,
  ],
  imports: [
    DatabaseModule,
    MulterModule.register({
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, './upload');
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '-' + file.originalname);
        },
      }),
    }),
  ],
})
export class ProfileModule {}
