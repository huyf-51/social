import { DataSource } from 'typeorm';
import { Account } from '../entities/auth.entity';
import { User } from '../entities/user.entity';
import { UserProfile } from '../entities/profile.entity';
import { Message } from '../entities/message.entity';
import { New } from '../entities/new.entity';
import { Notification } from '../entities/notification.entity';
import { Connection } from '../entities/connection.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [
    Account,
    User,
    UserProfile,
    Message,
    New,
    Notification,
    Connection,
  ],
  synchronize: false,
  logging: true,
});

export default AppDataSource;
