import { Injectable } from '@nestjs/common';
import { Clients } from './clients.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Workers } from 'src/workers/workers.entity';
import { CreateClientsDTO } from './dto/ClientsDTO';
import { IncompleteClientsDto } from './dto/incomplete-clients.dto';
import { Tours } from 'src/tours/tours.entity';


@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Workers)
        private readonly workersRepository: Repository<Workers>,
        @InjectRepository(Clients)
        private readonly clientsRepository: Repository<Clients>,
        @InjectRepository(Tours)
        private readonly toursRepository: Repository<Tours>) {}

        async create(clientsDTO: CreateClientsDTO): Promise<Clients> {
            const client = this.clientsRepository.create();
            client.fullname = clientsDTO.fullname;
            client.age = clientsDTO.age;
            client.gender = clientsDTO.gender;
            client.document = clientsDTO.document;
            client.telephone = clientsDTO.telephone;
            client.email = clientsDTO.email;
            client.password = clientsDTO.password;
            const workers = await this.workersRepository.findBy({
                id: In(clientsDTO.workers),
            });
            client.workers = workers;
            await this.clientsRepository.save(client);
            return client;
        }

        findOne(id: number): Promise<Clients> {
            return this.clientsRepository.findOne({
                where: {id},
                relations: {workers: true,
                            tours: true,},
            });
        }

        async findAll(): Promise<Clients[]> {
            return await this.clientsRepository.find({
                relations: {workers:true,
                            tours: true,},
            });
        }

        async findIncomplete(): Promise<IncompleteClientsDto[]> {
            const clients = await this.clientsRepository.find();
            const incompleteClints: IncompleteClientsDto[] = clients.map((clients)=>{
                const incompleteClints = new IncompleteClientsDto();
                incompleteClints.id = clients.id;
                incompleteClints.fullname = clients.fullname;
                incompleteClints.age = clients.age;
                incompleteClints.telephone = clients.telephone;
                return incompleteClints;
            });
            return incompleteClints;
        }

        async update(id: number, updatedClients: Clients) {
            const clients = await this.clientsRepository.findOne({where: {id} });
            clients.fullname = updatedClients.fullname;
            clients.age = updatedClients.age;
            clients.gender = updatedClients.gender;
            clients.document = updatedClients.document;
            clients.telephone = updatedClients.telephone;
            clients.email = updatedClients.email;
            clients.password = updatedClients.password;
            clients.workers = updatedClients.workers;
            await this.clientsRepository.save(clients);
            return clients;
        } 

        remove(id: number) {
            this.clientsRepository.delete({id});
        }   
}

