import { Inject, Injectable } from '@nestjs/common';
import { Account } from 'src/database/entities/auth.entity';
import { Connection } from 'src/database/entities/connection.entity';
import { User } from 'src/database/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { EventGateway } from '../event/event.gateway';
import { NotificationService } from '../notification/notification.service';
import { Type } from 'src/common/enum/notification-type.enum';

@Injectable()
export class UserService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private accountRepository: Repository<Account>,
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('DATA_SOURCE') private dataSource: DataSource,
    @Inject('CONNECTION_REPOSITORY')
    private connectionRepository: Repository<Connection>,
    private eventGateway: EventGateway,
    private notificationService: NotificationService
  ) {}

  async sendFriendRequest(requesterAccountID: number, receiverUserID: number) {
    const requestUser = await this.dataSource
      .createQueryBuilder()
      .select('user.id')
      .from(User, 'user')
      .where('user.accountID = :id', { id: requesterAccountID })
      .getOne();
    await this.connectionRepository.save({
      requesterID: requestUser['id'],
      receiverID: receiverUserID,
    });
    this.eventGateway.sendNotification(receiverUserID, {type: 'ADD_FRIEND', requesterID: requestUser['id']})
    await this.notificationService.storeNotification(Type.ADD_FRIEND, requestUser['id'], receiverUserID)
  }

  async acceptFriendRequest(acceptAccountID: number, requesterUserID: number) {
    const acceptUser = await this.dataSource
      .createQueryBuilder()
      .select('user.id')
      .from(User, 'user')
      .where('user.accountID = :id', { id: acceptAccountID })
      .getOne();
    await this.connectionRepository.update({receiverID: acceptUser['id'], requesterID: requesterUserID}, {isConnected: true})
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
