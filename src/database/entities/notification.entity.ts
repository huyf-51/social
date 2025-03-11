import { Type } from 'src/common/enum/notification-type.enum';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('Notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'requesterID' })
  @Column()
  requesterID: number;

  @Column({
    type: 'enum',
    enum: Type
  })
  type: Type;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'receiverID' })
  @Column()
  receiverID: number;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date
}
