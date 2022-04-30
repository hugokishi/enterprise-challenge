import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUserTable1651292166490 implements MigrationInterface {
    name = 'CreateUserTable1651292166490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" integer NOT NULL, "email" character varying NOT NULL, "telephone" integer NOT NULL, "birthDate" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
