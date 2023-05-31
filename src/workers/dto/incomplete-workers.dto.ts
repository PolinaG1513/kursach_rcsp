import { PickType } from "@nestjs/swagger";
import { Workers } from "../workers.entity";

export class IncompleteWorkersDto extends PickType(Workers, ['id', 'fullname', 'position', 'education'] as const) {}