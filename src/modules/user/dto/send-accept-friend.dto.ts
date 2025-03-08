import { IsNotEmpty, IsNumber } from 'class-validator';

export class SendAndAcceptFriendDto {
  @IsNotEmpty({message: 'userId required'})
  @IsNumber()
  userID: number;
}
