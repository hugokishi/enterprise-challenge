import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeUserTelephoneType1651292202571 implements MigrationInterface {
    name = 'ChangeUserTelephoneType1651292202571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "telephone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "telephone"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "telephone" integer NOT NULL`);
    }

}
