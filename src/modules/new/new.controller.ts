import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { NewService } from './new.service';
import { CreateNewDto } from './dto/create-new.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';

@Controller('new')
export class NewController {
    constructor(private newService: NewService) {}

    @Post() 
    async createNew(@Body(new ValidationPipe()) newPost: CreateNewDto) {
        this.newService.createNew(newPost)
        return 'success'
    }

    @Get('/:userID') 
    // @UseGuards(AuthGuard)
    async getAllNew(@Param('userID', ParseIntPipe) userID: number) {
        return await this.newService.getAllNew(userID)
    }

    @Put('/:newID')
    // @UseGuards(AuthGuard)
    async updateNew(@Param('newID', ParseIntPipe) newID: number, @Body("content") content: string) {
        await this.newService.updateNew(newID, content)
        return 'success'
    }

    @Delete('/:newID')
    // @UseGuards(AuthGuard)
    async deleteNew(@Param('newID', ParseIntPipe) newID: number) {
        await this.newService.deleteNew(newID)
        return 'success'
    }
}
