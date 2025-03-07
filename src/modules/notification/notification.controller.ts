import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) {}

    @Get('/:userID')
    @UseGuards(AuthGuard)
    async getAllNotification(@Param('userID', ParseIntPipe) param) {
        return await this.notificationService.getAllNotification(param)
    }
}
