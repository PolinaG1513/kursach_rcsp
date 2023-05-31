import { Clients } from 'src/clients/clients.entity';
import { IsNumber, IsString, IsNotEmpty, IsInt } from "class-validator";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tours')  
export class Tours {
  @PrimaryGeneratedColumn()
  id:number;
  
  @IsNotEmpty({message: 'Заполните поле name'})
  @IsString({message: 'Имя должно быть строкой'})
  @ApiProperty({example: 'Тур в Францию', description: 'Название тура'})
  @Column()
  name: string;

  @IsNotEmpty({message: 'Заполните поле date'})
  @IsString({message: 'Имя должно быть строкой'})
  @ApiProperty({example: '25.07.2019-31.07.2019', description: 'Даты тура'})
  @Column()
  date: string;

  @IsNotEmpty({message: 'Заполните поле countdays'})
  @IsInt({message: 'Количество должно быть числом'})
  @ApiProperty({example: '6', description: 'Количество дней'})
  @Column()
  countdays: number;

  @IsNotEmpty({message: 'Заполните поле cost'})
  @IsInt({message: 'Цена должна быть числом'})
  @ApiProperty({example: '80000', description: 'Стоимость тура'})
  @Column()
  cost:number;

  @IsNotEmpty({message: 'Заполните поле country'})
  @IsString({message: 'Имя должно быть строкой'})
  @ApiProperty({example: 'Франция', description: 'Страна'})
  @Column()
  country:string;
  
  @ManyToMany((type)=> Clients, (clients) => clients.tours)
  @JoinTable({name: 'tours_workers',
              joinColumn: {name: 'tours_id'},
              inverseJoinColumn: {name: 'clients_id'},})
  clients: Clients[];
}