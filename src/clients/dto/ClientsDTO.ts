import { ApiProperty, PickType } from "@nestjs/swagger";
import { Clients } from "../clients.entity";

export class CreateClientsDTO extends PickType(Clients, ['fullname', 'age', 'gender', 
'document', 'telephone', 'email', 'password'] as const) {
    @ApiProperty({examples: [1,2], description: 'Список идентификаторов работников'})
    workers: number[];
    @ApiProperty({examples: [1,2], description: 'Список идентификаторов туров'})
    tours: number[];
}