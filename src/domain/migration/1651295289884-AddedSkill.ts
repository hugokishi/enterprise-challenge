import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedSkill1651295289884 implements MigrationInterface {
    name = 'AddedSkill1651295289884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skill" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "skill" ADD CONSTRAINT "FK_c08612011a88745a32784544b28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "skill" DROP CONSTRAINT "FK_c08612011a88745a32784544b28"`);
        await queryRunner.query(`DROP TABLE "skill"`);
    }

}
