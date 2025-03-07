import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('Connections')
export class Connection {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'requesterID' })
  requesterID: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'receiverID' })
  receiverID: number;

  @Column({ default: false })
  isConnected: boolean;
}
