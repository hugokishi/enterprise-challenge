import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedSkill21651295418604 implements MigrationInterface {
    name = 'AddedSkill21651295418604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."skill" DROP CONSTRAINT "FK_c08612011a88745a32784544b28"`);
        await queryRunner.query(`ALTER TABLE "public"."skill" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."skill" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."skill" ADD CONSTRAINT "FK_c08612011a88745a32784544b28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
