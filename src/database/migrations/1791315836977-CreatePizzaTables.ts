import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePizzaTables1791315836977 implements MigrationInterface {
    name = 'CreatePizzaTables1791315836977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pizza_border" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_9ff6d92fb6e9b65e045a0d1b0aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pizza_size" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_1a8d3d99c959ee4edf35901c300" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pizza_topping" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_8e567fb464827f1fee817b845cf" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pizza_topping"`);
        await queryRunner.query(`DROP TABLE "pizza_size"`);
        await queryRunner.query(`DROP TABLE "pizza_border"`);
    }

}
