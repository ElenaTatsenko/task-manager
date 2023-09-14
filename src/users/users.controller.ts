import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import { AddRoleDto } from './dto/add-role.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {

    }
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getUserByEmail
    }
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto)
    }
}
