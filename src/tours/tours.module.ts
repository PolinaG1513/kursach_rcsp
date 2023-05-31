import {Module} from '@nestjs/common';
import {ToursService } from 'src/tours/tours.service';
import {ToursController} from 'src/tours/tours.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tours } from 'src/tours/tours.entity';
import { Clients } from 'src/clients/clients.entity';
import { Workers } from 'src/workers/workers.entity';

@Module ({
    controllers: [ToursController],
    providers: [ToursService],
    imports: [TypeOrmModule.forFeature([Clients, Tours, Workers]),],
})
export class ToursModule {}

