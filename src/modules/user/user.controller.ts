import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { SendAndAcceptFriendDto } from './dto/send-accept-friend.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/friend/invite')
  @UseGuards(AuthGuard)
  async sendFriendRequest(
    @Req() req,
    @Body(new ValidationPipe()) user: SendAndAcceptFriendDto,
  ) {
    await this.userService.sendFriendRequest(req.userId, user.userID);
    return 'send friend request success';
  }

  @Put('/friend/accept')
  @UseGuards(AuthGuard)
  async acceptFriendRequest(@Req() req, @Body(new ValidationPipe()) user: SendAndAcceptFriendDto) {
    await this.userService.acceptFriendRequest(req.userId, user.userID);
    return 'accept friend request success';
  }

  @Get('/search')
  async searchUser(@Query('name') name: string) {
    return await this.userService.searchUser(name)
  }
}
