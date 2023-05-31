import {Module} from '@nestjs/common';
import {ClientsModule} from './clients/clients.module';
import {WorkersModule } from './workers/workers.module';
import {ToursModule} from './tours/tours.module';
import {TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from '../configurations/env.config'

@Module({
  imports: [ClientsModule, WorkersModule, ToursModule,
    TypeOrmModule.forRoot({
      type: 'postgres', 
      port: 5432, //порт
      username: 'postgres', //имя пользователя
      password: 'root', //пароль
      host: 'localhost',
      synchronize: false,
      logging: 'all',
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    ConfigModule.forRoot({
      load: [configurations],
      isGlobal: true
    })
  ],
    controllers: [],
    providers: [],
  })
  export class AppModule {}
