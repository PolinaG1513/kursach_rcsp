import {ClientsService } from './clients.service';
import {Controller, Get, Put, Post, Delete, Param, Body } from '@nestjs/common';
import {Clients} from './clients.entity';
import { CreateClientsDTO } from './dto/ClientsDTO';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IncompleteClientsDto } from './dto/incomplete-clients.dto';

@Controller('clients')
@ApiTags('Клиенты')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}

    @ApiOperation({summary: 'Поиск всех клиентов'})
    @Get() 
        findAll() :Promise<Clients[]> {
        return this.clientsService.findAll();
    }

    @ApiOperation({summary: 'Поиск для неавторизованных клиентов'})
    @Get('incomplete')
        findIncomplete(): Promise<IncompleteClientsDto[]> {
            return this.clientsService.findIncomplete();
    }

    @ApiOperation({summary: 'Поиск конкретного клиента'})
    @Get(':id')
        findOne(@Param('id') id: string) {
        return this.clientsService.findOne(+id);
    }

    @ApiOperation({summary: 'Изменение клиента'})
    @Put(':id')
        update(@Param('id') id: string, @Body() updateClients: Clients) {
        return this.clientsService.update(+id, updateClients);
    }

    @ApiOperation({summary: 'Создание клиента'})
    @Post()
        create(@Body() clientsDTO: CreateClientsDTO) : Promise<Clients>{
        return this.clientsService.create(clientsDTO);
    }   

    @ApiOperation({summary: 'Удаление клиента'})
    @Delete(':id')
        remove(@Param('id') id: string) {
        return this.clientsService.remove(+id);
    }
}  