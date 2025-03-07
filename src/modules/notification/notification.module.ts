import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { DataSource } from 'typeorm';
import { Notification } from 'src/database/entities/notification.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, {
    provide: 'NOTIFICATION_REPOSITORY',
    useFactory: (dataSource: DataSource) => {
      return dataSource.getRepository(Notification);
    },
    inject: ['DATA_SOURCE']
  }],
  exports: [NotificationService],
  imports: [DatabaseModule]
})
export class NotificationModule {}
