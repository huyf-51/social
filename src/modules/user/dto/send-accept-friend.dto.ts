import { IsNumber } from 'class-validator';

export class SendAndAcceptFriendDto {
  @IsNumber()
  userID: number;
}
