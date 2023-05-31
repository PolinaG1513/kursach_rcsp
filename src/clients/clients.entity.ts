import { Workers } from "src/workers/workers.entity";
import { IsString, IsNotEmpty, IsEmail, IsInt, Min, Max, MinLength } from "class-validator";
import { Tours } from 'src/tours/tours.entity';
import {
  Column,
  Entity, 
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";

@Entity('clients')
export class Clients {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @PrimaryGeneratedColumn()
    id: number;


    @IsString({message: 'ФИО должно быть строкой'})
    @IsNotEmpty({message: 'Заполните поле fullname'})
    @ApiProperty({example: 'Иванов Иван Иванович', description: "ФИО"})
    @Column({})
    fullname: string;

    @IsString({message: 'Поле password должно быть строкой'})
    @IsNotEmpty({message: 'Заполните поле password'})
    @MinLength(6)
    @ApiProperty({example: 'qazwsx123', description:'Пароль'})
    @Column({})
    password: string;

    @IsInt({message: 'Поле age должно быть числом'})
    @IsNotEmpty({message: 'Заполните поле age'})
    @Min(10, {message: 'Минимальный возраст - 10'})
    @Max(95, {message: 'Максимальный возраст - 95'})
    @ApiProperty({example: '23', description: "Возраст"})
    @Column()
    age: number;

    @IsString({message: 'Поле gender должно быть строкой'})
    @IsNotEmpty({message: 'Заполните поле gender'})
    @ApiProperty({example: 'Мужской', description: "Пол"})
    @Column()
    gender: string;

    @IsString({message: 'Поле document должно быть строкой'})
    @IsNotEmpty({message: 'Заполните поле document'})
    @ApiProperty({example: '123456', description: "Данные документов"})
    @Column()
    document:string;

    @IsInt({message: 'Поле telephone должно быть числом'})
    @IsNotEmpty({message: 'Заполните поле telephone'})
    @ApiProperty({example: '34523', description: "Телефон"})
    @Column()
    telephone:number;

 
    @IsString({message: 'Поле email должно быть строкой'})
    @IsEmail()
    @IsNotEmpty({message: 'Заполните поле email'})
    @ApiProperty({example: 'mail@mail.com', description: "Почта"})
    @Column()
    email: string;

    @ManyToMany((type)=> Workers, (workers) => workers.clients)
    @JoinTable({name: 'clients_workers',
                joinColumn: {name: 'clients_id'},
                inverseJoinColumn: {name: 'workers_id'},})
    workers: Workers[];

    @ManyToMany((type) => Tours, (tours) => tours.clients)
    @JoinTable({name: 'clients_tours',
              joinColumn: {name: 'clients_id'},
              inverseJoinColumn: {name: 'tours_id'},})
    tours: Tours[];
}