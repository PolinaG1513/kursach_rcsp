import {WorkersService } from 'src/workers/workers.service';
import {Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import {Workers} from 'src/workers/workers.entity';
import { CreateWorkersDto } from './dto/WorkersDTO';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('workers')
@ApiTags('Работники')
export class WorkersController {
    constructor(private readonly workersService: WorkersService) {}

    @ApiOperation({summary: 'Поиск всех работников'})
    @Get() 
        findAll():Promise<Workers[]> {
        return this.workersService.findAll();
    }

    @ApiOperation({summary: 'Поиск неавторизованных работников'})
    @Get('incomplete')
    findIncomplete(){
       return this.workersService.findIncomplete();
    }

    @ApiOperation({summary: 'Поиск конкретного работника'})
    @Get(':id')
        findOne(@Param('id') id: string) {
        return this.workersService.findOne(+id);
    }

    @ApiOperation({summary: 'Изменение работника'})
    @Put(':id')
        update(@Param('id') id: string, @Body() updateWorkers: Workers) {
        return this.workersService.update(+id, updateWorkers);
    }

    @ApiOperation({summary: 'Создание работника'})
    @Post()
        create(@Body() workersDTO: CreateWorkersDto): Promise<Workers> {
        return this.workersService.create(workersDTO);
    }   

    @ApiOperation({summary: 'Удаление работника'})
    @Delete(':id')
        remove(@Param('id') id: string) {
        return this.workersService.remove(+id);
    }
}  