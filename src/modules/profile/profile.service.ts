import { Inject, Injectable } from '@nestjs/common';
import { UserProfile } from 'src/database/entities/profile.entity';
import { Repository, DataSource } from 'typeorm';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('USER_PROFILE_REPOSITORY')
    private userProfileRepository: Repository<UserProfile>,
    @Inject('DATA_SOURCE') private dataSource: DataSource,
  ) {}

  async getProfile(id: number) {
    const profile = await this.dataSource
      .getRepository(UserProfile)
      .createQueryBuilder('profile')
      .where('profile.userID = :id', { id: id })
      .getOne();
    return profile;
  }

  async updateProfileAvatar(filename: string, id: number) {
    await this.userProfileRepository.update({ id }, { avatar: filename });
  }

  async updateProfileBackground(filename: string, id: number) {
    await this.userProfileRepository.update({ id }, { avatar: filename });
  }

  async updateProfileDetail(userProfile: UpdateProfileDto, id: number) {
    await this.userProfileRepository.update({ id }, { ...userProfile });
  }
}
