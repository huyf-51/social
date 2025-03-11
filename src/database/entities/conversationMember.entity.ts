import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Conversation } from './conversation.entity';

@Entity('Conversations')
export class ConversationMember {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userID' })
  userID: number;

  @ManyToOne(() => Conversation, (conversation) => conversation.id)
  @JoinColumn({ name: "conversationID"})
  conversationID: number
}
