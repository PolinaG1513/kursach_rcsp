import { ApiProperty, PickType } from "@nestjs/swagger";
import { Tours } from "../tours.entity";

export class CreateToursDTO extends PickType(Tours, ['name', 'date', 'countdays', 'cost', 'country'] as const) {
    @ApiProperty({example: [1,2], type: [Number], description: 'Список клиентов'})
    clients: number[];
}