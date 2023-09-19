import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.models';
import { Category } from './categories.model';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports:[
    SequelizeModule.forFeature([User, Category])
  ]
})
export class CategoriesModule {}
