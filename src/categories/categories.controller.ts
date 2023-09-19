import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
constructor(private categoryService: CategoriesService) {}

    @Post()
    createCategoty(@Body() dto: CreateCategoryDto) {
        this.categoryService.create(dto)
    }
}
