import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserProfile } from '../entities/profile.entity';
import { Message } from '../entities/message.entity';
import { New } from '../entities/new.entity';
import { Notification } from '../entities/notification.entity';
import { Connection } from '../entities/connection.entity';
import { Conversation } from '../entities/conversation.entity';
import { ConversationMember } from '../entities/conversationMember.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: "localhost",
    port: 5432,
    username: "postgres",
    password: process.env.DB_PASS,
    database: "social",
  entities: [
    User,
    UserProfile,
    Message,
    New,
    Notification,
    Connection,
    Conversation,
    ConversationMember
  ],
  logging: true,
});

export default AppDataSource;
