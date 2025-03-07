import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('UserProfiles')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  birthDay: Date;

  @Column({ nullable: true })
  school: string;

  @Column({ nullable: true })
  work: string;

  @Column({ nullable: true })
  nickName: string;

  @Column({ nullable: true })
  bio: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userID' })
  userID: number;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  backgroundImage: string;
}
