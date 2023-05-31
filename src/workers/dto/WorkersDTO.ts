import { ApiProperty, PickType } from "@nestjs/swagger";
import { Workers } from "../workers.entity";

export class CreateWorkersDto extends PickType(Workers, ['fullname', 'age', 'position', 
'education', 'telephone', 'salary'] as const) {
    @ApiProperty({example: [], type: [String], description: 'Что-то тут'})
    clients: string[];
}