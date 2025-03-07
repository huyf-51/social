import { Inject, Injectable } from '@nestjs/common';
import { New } from 'src/database/entities/new.entity';
import { Repository } from 'typeorm';
import { CreateNewDto } from './dto/create-new.dto';

@Injectable()
export class NewService {
    constructor(@Inject('NEW_REPOSITORY') private newRepository: Repository<New>) {}

    async createNew(newPost: CreateNewDto) {
        await this.newRepository.save(this.newRepository.create(newPost))
    }

    async getAllNew(userID: number) {
        return await this.newRepository.find({where: {userID}})
    }

    async updateNew(newID: number, content: string) {
        await this.newRepository.update({id: newID}, {content})
    }

    async deleteNew(newID: number) {
        await this.newRepository.delete({id: newID})
    }
} 
