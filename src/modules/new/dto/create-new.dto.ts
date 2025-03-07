import { IsNumber, IsString } from "class-validator"

export class CreateNewDto {
    @IsString()
    content: string

    @IsNumber()
    userID: number
}