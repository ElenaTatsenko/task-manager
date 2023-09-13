import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/create-user-dto';
import { UsersService } from 'src/users/users.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {User} from "../users/users.models";
 

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
        private jwtService: JwtService){}
   
    async login(userDto: CreateUserDto){
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto){
        const userToCreate = await this.userService.getUserByEmail(userDto.email);
        if(userToCreate) {
            throw new HttpException(`User with email ${userDto.email} address already exists`, HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User){
        const payload = {email: user.email, id: user.id}
        return this.jwtService.sign(payload)
    }

    private async validateUser(userDto:CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if(user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: 'Incorrect email or password'})
    }
}