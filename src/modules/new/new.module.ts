import { Module } from '@nestjs/common';
import { NewService } from './new.service';
import { DataSource } from 'typeorm';
import { New } from 'src/database/entities/new.entity';
import { DatabaseModule } from '../database/database.module';
import { NewController } from './new.controller';

@Module({
  controllers: [NewController],
  providers: [
    NewService,
    {
      provide: 'NEW_REPOSITORY',
      useFactory: (dataSource: DataSource) => {
        return dataSource.getRepository(New)
      },
      inject: ['DATA_SOURCE']
    },
  ],
  imports: [DatabaseModule]
})
export class NewModule {}
