import {config} from "dotenv"
config()

export default () => ({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts}'],
    autoLoadEntities: true,
})