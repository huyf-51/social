import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'src/database/entities/connection.entity';
import { User } from 'src/database/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { EventGateway } from '../event/event.gateway';
import { NotificationService } from '../notification/notification.service';
import { Type } from 'src/common/enum/notification-type.enum';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    @Inject('CONNECTION_REPOSITORY')
    private connectionRepository: Repository<Connection>,
    private eventGateway: EventGateway,
    private notificationService: NotificationService
  ) {}

  async sendFriendRequest(requesterUserID: number, receiverUserID: number) {
    await this.connectionRepository.save({
      requesterID: requesterUserID,
      receiverID: receiverUserID,
    });
    this.eventGateway.sendNotification(receiverUserID, {type: 'ADD_FRIEND', requesterID: requesterUserID})
    await this.notificationService.storeNotification(Type.ADD_FRIEND, requesterUserID, receiverUserID)
  }

  async acceptFriendRequest(acceptUserID: number, requesterUserID: number) {
    await this.connectionRepository.update({receiverID: acceptUserID, requesterID: requesterUserID}, {isConnected: true})
  }

  async searchUser(name: string) {
    return await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.firstName ~ :name', {name})
      .orWhere('user.lastName ~ :name', {name})
      .orWhere(`'${name}' ~ user.firstName`)
      .orWhere(`'${name}' ~ user.lastName`)
      .getMany()
  }
} 
