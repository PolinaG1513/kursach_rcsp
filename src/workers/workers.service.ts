import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from 'src/clients/clients.entity';
import { Tours } from 'src/tours/tours.entity';
import { Workers } from 'src/workers/workers.entity';
import { In, Repository } from 'typeorm';
import { CreateWorkersDto } from './dto/WorkersDTO';
import { IncompleteWorkersDto } from './dto/incomplete-workers.dto';


@Injectable()
export class WorkersService {
    constructor(
        @InjectRepository(Workers)
        private readonly workersRepository: Repository<Workers>,
        @InjectRepository(Clients)
        private readonly clientsRepository: Repository<Clients>) {}

        async create(workersDto: CreateWorkersDto): Promise<Workers> {
            const workers = this.workersRepository.create();
            workers.fullname = workersDto.fullname;
            workers.age = workersDto.age;
            workers.position = workersDto.position;
            workers.education = workersDto.position;
            workers.telephone = workersDto.telephone;
            workers.salary = workersDto.salary;
            const clients = await this.clientsRepository.findBy({
                id: In(workersDto.clients),
            });
            workers.clients = clients;
            await this.workersRepository.save(workers);
            return workers;
        }

        findOne(id: number): Promise<Workers> {
            return this.workersRepository.findOne({
                where: {id},
                relations: {clients: true,}
            });
        }

        async findAll(): Promise<Workers[]> {
            const workers = await this.workersRepository.find({
                relations: {
                    clients: true,
                }
            });
            return workers;
        }

        async findIncomplete(): Promise<IncompleteWorkersDto[]> {
            const workers = await this.workersRepository.find();
            const incompleteWorkers: IncompleteWorkersDto[] = workers.map((workers)=>{
                const incompleteWorkers = new IncompleteWorkersDto();
                incompleteWorkers.id = workers.id;
                incompleteWorkers.fullname = workers.fullname;
                incompleteWorkers.position = workers.position;
                incompleteWorkers.education = workers.education;
                return incompleteWorkers;
            });
            return incompleteWorkers;
        }

        async update(id: number, updatedWorkers: Workers) {
            const workers = await this.workersRepository.findOne({where: {id} });
            workers.fullname = updatedWorkers.fullname;
            workers.age = updatedWorkers.age;
            workers.position = updatedWorkers.position;
            workers.education = updatedWorkers.education;
            workers.telephone = updatedWorkers.telephone;
            workers.salary = updatedWorkers.salary;
            workers.clients = updatedWorkers.clients;
            await this.workersRepository.save(workers);
            return workers;
        }

        remove(id: number) {
            this.workersRepository.delete({id});
        }  
}