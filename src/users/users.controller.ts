import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {

    }
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }
}
