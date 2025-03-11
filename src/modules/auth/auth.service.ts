import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Repository, EntityManager } from 'typeorm';
import { User } from 'src/database/entities/user.entity';
import { UserProfile } from 'src/database/entities/profile.entity';
import AppDataSource from 'src/database/config/typeorm';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
    @Inject('USER_PROFILE_REPOSITORY')
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  async login(account: LoginDto) {
    const { phoneNumber, password } = account;
    const existAccount = await this.userRepository.findOne({
      where: { phoneNumber: phoneNumber },
    });
    
    if (!existAccount) {
      throw new UnauthorizedException('incorrect phonenumber or password');
    }
    const resultCheckPass = bcrypt.compareSync(password, existAccount.password);
    if (!resultCheckPass) {
      throw new UnauthorizedException('incorrect phonenumber or password');
    }
    const payload = { id: existAccount.id };
    return { accessToken: await this.jwtService.signAsync(payload), _id: existAccount.id };
  }

  async signUp(account: CreateAccountDto) {
    const { phoneNumber, password } = account;
    const existAccount = await this.userRepository.findOne({
      where: { phoneNumber: phoneNumber },
    });
    if (existAccount) {
      throw new ConflictException('the account is exist');
    }
    const salt = bcrypt.genSaltSync();
    const hashPassword = bcrypt.hashSync(password, salt);

    await AppDataSource.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const newUser = await transactionalEntityManager.save(
          this.userRepository.create({
            ...account, 
            password: hashPassword,
          }),
        );
        await transactionalEntityManager.save(
          this.userProfileRepository.create({
            userID: newUser.id,
          }),
        );
      },
    );
  }
}
