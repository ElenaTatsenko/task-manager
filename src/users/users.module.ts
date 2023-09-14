import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.models';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    forwardRef(() => AuthModule)
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule{}
