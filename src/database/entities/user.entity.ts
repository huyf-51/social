import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from 'src/common/enum/role.enum';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  roleId: Role;

  @Column({ nullable: true })
  status: boolean;
}
