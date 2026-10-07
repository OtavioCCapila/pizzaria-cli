import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderTableAndRelations1791317908717 implements MigrationInterface {
    name = 'CreateOrderTableAndRelations1791317908717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "toppingId" integer NOT NULL, "sizeId" integer NOT NULL, "borderId" integer NOT NULL, "amount" numeric(10,2) NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_a779bdda19ef992541908023ccc" FOREIGN KEY ("toppingId") REFERENCES "pizza_topping"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_a4553c809a3bbb08c359275e5a7" FOREIGN KEY ("sizeId") REFERENCES "pizza_size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_59e0724743c176db34d25e9daef" FOREIGN KEY ("borderId") REFERENCES "pizza_border"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_59e0724743c176db34d25e9daef"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_a4553c809a3bbb08c359275e5a7"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_a779bdda19ef992541908023ccc"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
