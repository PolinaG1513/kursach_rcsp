import {ToursService} from 'src/tours/tours.service';
import {Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import {Tours} from 'src/tours/tours.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateToursDTO } from './dto/ToursDTO';

@Controller('tours')
@ApiTags('Туры')
export class ToursController {
    constructor(private readonly toursService: ToursService) {}

    @ApiOperation({summary: 'Поиск всех туров'})
    @Get() 
        findAll():Promise<Tours[]> {
        return this.toursService.findAll();
    }

    @ApiOperation({summary: 'Поиск конкретного тура'})
    @Get(':id')
        findOne(@Param('id') id: string) {
        return this.toursService.findOne(+id);
    }

    @ApiOperation({summary: 'Изменение тура'})
    @Put(':id')
        update(@Param('id') id: string, @Body() updateTours: Tours) {
        return this.toursService.update(+id, updateTours);
    }

    @ApiOperation({summary: 'Создание тура'})
    @Post()
        create(@Body() createTours: CreateToursDTO): Promise<Tours> {
        return this.toursService.create(createTours);
    }   

    @ApiOperation({summary: 'Удаление тура'})
    @Delete(':id')
        remove(@Param('id') id: string) {
        return this.toursService.remove(+id);
    }
} 