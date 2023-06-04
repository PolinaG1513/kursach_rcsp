import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1685559377054 implements MigrationInterface {
    name = 'Init1685559377054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workers" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "age" integer NOT NULL, "position" character varying NOT NULL, "education" character varying NOT NULL, "telephone" integer NOT NULL, "salary" integer NOT NULL, CONSTRAINT "PK_e950c9aba3bd84a4f193058d838" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tours" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "date" character varying NOT NULL, "countdays" integer NOT NULL, "cost" integer NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_2202ba445792c1ad0edf2de8de2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, "gender" character varying NOT NULL, "document" character varying NOT NULL, "telephone" integer NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tours_workers" ("tours_id" integer NOT NULL, "clients_id" integer NOT NULL, CONSTRAINT "PK_ba04553abc9834c9032bcc2dd76" PRIMARY KEY ("tours_id", "clients_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8163ae155a33bf35e316fd7e21" ON "tours_workers" ("tours_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_923f14676c7dcb7cbfe0813d06" ON "tours_workers" ("clients_id") `);
        await queryRunner.query(`CREATE TABLE "clients_workers" ("clients_id" integer NOT NULL, "workers_id" integer NOT NULL, CONSTRAINT "PK_9b218e52eb4469f909e3dd67e45" PRIMARY KEY ("clients_id", "workers_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_82a0b7bd73bb0cbb21425d1c19" ON "clients_workers" ("clients_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_484459108f2cae2450b74accf9" ON "clients_workers" ("workers_id") `);
        await queryRunner.query(`CREATE TABLE "clients_tours" ("clients_id" integer NOT NULL, "tours_id" integer NOT NULL, CONSTRAINT "PK_8fbb01b9d7f7e1005e9e4370433" PRIMARY KEY ("clients_id", "tours_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2ddf094dd0daaf34a15126fd41" ON "clients_tours" ("clients_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5637c2cdf92c5e0dedad2ee74c" ON "clients_tours" ("tours_id") `);
        await queryRunner.query(`ALTER TABLE "tours_workers" ADD CONSTRAINT "FK_8163ae155a33bf35e316fd7e217" FOREIGN KEY ("tours_id") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tours_workers" ADD CONSTRAINT "FK_923f14676c7dcb7cbfe0813d063" FOREIGN KEY ("clients_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients_workers" ADD CONSTRAINT "FK_82a0b7bd73bb0cbb21425d1c197" FOREIGN KEY ("clients_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clients_workers" ADD CONSTRAINT "FK_484459108f2cae2450b74accf97" FOREIGN KEY ("workers_id") REFERENCES "workers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients_tours" ADD CONSTRAINT "FK_2ddf094dd0daaf34a15126fd41e" FOREIGN KEY ("clients_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clients_tours" ADD CONSTRAINT "FK_5637c2cdf92c5e0dedad2ee74cf" FOREIGN KEY ("tours_id") REFERENCES "tours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients_tours" DROP CONSTRAINT "FK_5637c2cdf92c5e0dedad2ee74cf"`);
        await queryRunner.query(`ALTER TABLE "clients_tours" DROP CONSTRAINT "FK_2ddf094dd0daaf34a15126fd41e"`);
        await queryRunner.query(`ALTER TABLE "clients_workers" DROP CONSTRAINT "FK_484459108f2cae2450b74accf97"`);
        await queryRunner.query(`ALTER TABLE "clients_workers" DROP CONSTRAINT "FK_82a0b7bd73bb0cbb21425d1c197"`);
        await queryRunner.query(`ALTER TABLE "tours_workers" DROP CONSTRAINT "FK_923f14676c7dcb7cbfe0813d063"`);
        await queryRunner.query(`ALTER TABLE "tours_workers" DROP CONSTRAINT "FK_8163ae155a33bf35e316fd7e217"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5637c2cdf92c5e0dedad2ee74c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2ddf094dd0daaf34a15126fd41"`);
        await queryRunner.query(`DROP TABLE "clients_tours"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_484459108f2cae2450b74accf9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_82a0b7bd73bb0cbb21425d1c19"`);
        await queryRunner.query(`DROP TABLE "clients_workers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_923f14676c7dcb7cbfe0813d06"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8163ae155a33bf35e316fd7e21"`);
        await queryRunner.query(`DROP TABLE "tours_workers"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "tours"`);
        await queryRunner.query(`DROP TABLE "workers"`);
    }

}
