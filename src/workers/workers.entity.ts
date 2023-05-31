import { Clients } from 'src/clients/clients.entity';
import { IsNumber, IsString, IsNotEmpty, IsInt, Min, Max } from "class-validator";
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('workers')
export class Workers {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString({message: 'Имя должно быть строкой'})
    @IsNotEmpty({message: 'Заполните поле fullName'})
    @Column({})
    @ApiProperty({example: 'Иванов Иван Иванович', description: 'ФИО'})
    fullname: string;

    @IsInt({message: 'Возраст должно быть числом'})
    @Min(10, {message: 'Минимальный возраст - 10'})
    @Max(95, {message: 'Максимальный возраст - 95'})
    @IsNotEmpty({message: 'Заполните поле age'})
    @ApiProperty({example: '27', description: 'Возраст'})
    @Column()
    age: number;

    @IsString({message: 'Должность должна быть строкой'})
    @IsNotEmpty({message: 'Заполните поле position'})
    @ApiProperty({example: 'Управляющий', description: 'Должность'})
    @Column()
    position: string;

    @IsString({message: 'Образование должно быть строкой'})
    @IsNotEmpty({message: 'Заполните поле education'})
    @ApiProperty({example: 'Высшее', description: 'Образование'})
    @Column()
    education:string;

    @IsInt({message: 'Телефон должен быть числом'})
    @IsNotEmpty({message: 'Заполните поле telephone'})
    @ApiProperty({example: '2345', description: 'Номер телефона'})
    @Column()
    telephone:number;

    @IsInt({message: 'Зарплата должна быть числом'})
    @IsNotEmpty({message: 'Заполните поле salary'})
    @ApiProperty({example: '20000', description: 'Зарплата'})
    @Column()
    salary: number;
    @ManyToMany((type)=> Clients, (clients) => clients.workers)
    clients: Clients[];
}