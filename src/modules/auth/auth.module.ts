import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import fs from 'fs-extra';
import path from 'path';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '../database/database.module';
import { User } from 'src/database/entities/user.entity';
import { UserProfile } from 'src/database/entities/profile.entity';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'USER_REPOSITORY',
      useFactory(dataSource: DataSource) {
        return dataSource.getRepository(User);
      },
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'USER_PROFILE_REPOSITORY',
      useFactory(dataSource: DataSource) {
        return dataSource.getRepository(UserProfile);
      },
      inject: ['DATA_SOURCE'],
    },
  ],
  imports: [
    JwtModule.register({
      signOptions: {
        algorithm: 'ES256',
        expiresIn: '1d',
      },
      publicKey: fs.readFileSync(
        path.join(__dirname, '../../../keys/es256_key.pub'),
        'utf-8',
      ),
      privateKey: fs.readFileSync(
        path.join(__dirname, '../../../keys/es256_key'),
        'utf-8',
      ),
      global: true,
    }),
    DatabaseModule,
  ],
})
export class AuthModule {}
