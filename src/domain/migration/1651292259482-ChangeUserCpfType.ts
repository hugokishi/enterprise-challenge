import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeUserCpfType1651292259482 implements MigrationInterface {
    name = 'ChangeUserCpfType1651292259482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "cpf" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "cpf" integer NOT NULL`);
    }

}
