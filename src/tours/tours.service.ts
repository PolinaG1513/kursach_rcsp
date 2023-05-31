import {Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {Tours} from 'src/tours/tours.entity';
import { Clients } from 'src/clients/clients.entity';
import { CreateToursDTO } from './dto/ToursDTO';
import { Workers } from 'src/workers/workers.entity';


@Injectable()
export class ToursService {
    constructor( 
        @InjectRepository(Workers)
        private readonly workersRepository: Repository<Workers>,
        @InjectRepository(Clients)
        private readonly clientsRepository: Repository<Clients>,
        @InjectRepository(Tours)
        private readonly toursRepository: Repository<Tours>) {}

        async create(toursDTO: CreateToursDTO) :Promise<Tours> {
            const tours = this.toursRepository.create()
            tours.name = toursDTO.name;
            tours.date = toursDTO.date;
            tours.countdays = toursDTO.countdays;
            tours.cost = toursDTO.cost;
            tours.country = toursDTO.country;
            const clients = await this.clientsRepository.findBy({
                id: In(toursDTO.clients)
            });
            tours.clients = clients;
            await this.toursRepository.save(tours)
            return tours
        }

        findOne(id: number): Promise<Tours> {
            return this.toursRepository.findOne({
                where: {id}
            })
        }

        async findAll(): Promise<Tours[]> {
            return await this.toursRepository.find();
        }

        async update(id: number, updatedTours: Tours) {
            const tours = await this.toursRepository.findOne({
                where: {id}
            })
            tours.name = updatedTours.name;
            tours.date = updatedTours.date;
            tours.country = updatedTours.country;
            tours.countdays = updatedTours.countdays;
            tours.cost = updatedTours.cost;
            tours.clients = updatedTours.clients;
            await this.toursRepository.save(tours);
            return tours;
        }

        remove(id: number) {
            this.toursRepository.delete({id})
        }  
}