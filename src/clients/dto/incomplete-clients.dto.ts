import { PickType } from "@nestjs/swagger";
import { Clients } from "../clients.entity";

export class IncompleteClientsDto extends PickType(Clients, ['id','fullname', 'age', 'telephone'] as const) {}