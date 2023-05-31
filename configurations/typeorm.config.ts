import { Clients } from "src/clients/clients.entity";
import { Tours } from "src/tours/tours.entity";
import { Workers } from "src/workers/workers.entity";
import { DataSource } from "typeorm";

const ormConfig: DataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'nestjs_new',
    username: 'postgres',
    password: 'root',
    entities: ['dist/**/*.entity{.js}'],
    logging: true,
    synchronize: false,
    migrationsTableName: 'migrations',
    migrations: ['dist/migrations/*{.js,.ts}'],
});
export default ormConfig;