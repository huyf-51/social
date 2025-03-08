import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataSource } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { DatabaseModule } from '../database/database.module';
import databaseProvider from '../database/database.provider';
import { Connection } from 'src/database/entities/connection.entity';
import { EventGateway } from '../event/event.gateway';
import { NotificationModule } from '../notification/notification.module';
import { NotificationService } from '../notification/notification.service';
import { Notification } from 'src/database/entities/notification.entity';

@Module({
  providers: [
    UserService,
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) => {
        return dataSource.getRepository(User);
      },
      inject: ['DATA_SOURCE'],
    },
    databaseProvider,
    {
      provide: 'CONNECTION_REPOSITORY',
      useFactory: (dataSource: DataSource) => {
        return dataSource.getRepository(Connection);
      },
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'NOTIFICATION_REPOSITORY',
      useFactory: (dataSource: DataSource) => {
        return dataSource.getRepository(Notification);
      },
      inject: ['DATA_SOURCE'],
    },
    EventGateway,
    NotificationService
  ],
  controllers: [UserController],
  exports: [UserService],
  imports: [DatabaseModule, EventGateway, NotificationModule, NotificationModule],
})
export class UserModule {}
