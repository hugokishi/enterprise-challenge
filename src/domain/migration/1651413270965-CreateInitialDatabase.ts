import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateInitialDatabase1651413270965 implements MigrationInterface {
  name = 'CreateInitialDatabase1651413270965'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "skill" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "telephone" character varying NOT NULL, "birthDate" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_49568c2027c8bc1f33f7878e189" UNIQUE ("telephone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "certificate" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, "skillId" integer, CONSTRAINT "PK_8daddfc65f59e341c2bbc9c9e43" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "user_skills_skill" ("userId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_972b9abaae51dbb33e482d81a26" PRIMARY KEY ("userId", "skillId"))'
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_b5cce6242aae7bce521a76a3be" ON "user_skills_skill" ("userId") '
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_c7e4f0b8d58a56f71dd097d754" ON "user_skills_skill" ("skillId") '
    )
    await queryRunner.query(
      'ALTER TABLE "certificate" ADD CONSTRAINT "FK_52422eba9e5b9d779d3e173a25d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "certificate" ADD CONSTRAINT "FK_2fc3624dea803df5be9006e9b95" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "user_skills_skill" ADD CONSTRAINT "FK_b5cce6242aae7bce521a76a3be1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE'
    )
    await queryRunner.query(
      'ALTER TABLE "user_skills_skill" ADD CONSTRAINT "FK_c7e4f0b8d58a56f71dd097d7546" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user_skills_skill" DROP CONSTRAINT "FK_c7e4f0b8d58a56f71dd097d7546"'
    )
    await queryRunner.query(
      'ALTER TABLE "user_skills_skill" DROP CONSTRAINT "FK_b5cce6242aae7bce521a76a3be1"'
    )
    await queryRunner.query(
      'ALTER TABLE "certificate" DROP CONSTRAINT "FK_2fc3624dea803df5be9006e9b95"'
    )
    await queryRunner.query(
      'ALTER TABLE "certificate" DROP CONSTRAINT "FK_52422eba9e5b9d779d3e173a25d"'
    )
    await queryRunner.query('DROP INDEX "IDX_c7e4f0b8d58a56f71dd097d754"')
    await queryRunner.query('DROP INDEX "IDX_b5cce6242aae7bce521a76a3be"')
    await queryRunner.query('DROP TABLE "user_skills_skill"')
    await queryRunner.query('DROP TABLE "certificate"')
    await queryRunner.query('DROP TABLE "user"')
    await queryRunner.query('DROP TABLE "skill"')
  }
}
