import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderID: number;

  @Column()
  receiverID: number;

  @Column()
  content: string;

  @Column()
  chatRoomID: number;
}
