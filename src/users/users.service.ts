import { Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import { User } from './users.models';
import { CreateUserDto } from './create-user-dto';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private UserRepository: typeof User){}
    async createUser(dto: CreateUserDto){
        const user = await this.UserRepository.create(dto);
        return user
    }

    async getUserByEmail(email: string){
        const user = await this.UserRepository.findOne({where: {email}})
        return user
    }
}

