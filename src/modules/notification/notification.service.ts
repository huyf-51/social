import { Inject, Injectable } from '@nestjs/common';
import { Type } from 'src/common/enum/notification-type.enum';
import { Notification } from 'src/database/entities/notification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
    constructor(@Inject('NOTIFICATION_REPOSITORY') private notificationRepository: Repository<Notification>) {}

    async storeNotification(type: Type, requesterID: number, receiverID: number) {
        const newNotification = this.notificationRepository.create({type, requesterID, receiverID})
        await this.notificationRepository.save(newNotification);
    }

    async getAllNotification(userID: number) {
        return (await this.notificationRepository.find({
            where: {receiverID: userID},
            select: {id: true, requesterID: true, type: true}
        }))
    }
}
