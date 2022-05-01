import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateInitialDatabase1651446704764 implements MigrationInterface {
  name = 'CreateInitialDatabase1651446704764'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "skill" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "certificate" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "candidateId" integer, "skillId" integer, CONSTRAINT "PK_8daddfc65f59e341c2bbc9c9e43" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "candidate" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "telephone" character varying NOT NULL, "birthDate" character varying NOT NULL, "gender" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_b9a27c80a36f4eed20a3ade044a" UNIQUE ("cpf"), CONSTRAINT "UQ_80e766f22573be71b86b2f05371" UNIQUE ("email"), CONSTRAINT "UQ_30ae87e38203afbbdf0308ede45" UNIQUE ("telephone"), CONSTRAINT "PK_b0ddec158a9a60fbc785281581b" PRIMARY KEY ("id"))'
    )
    await queryRunner.query(
      'CREATE TABLE "candidate_skills_skill" ("candidateId" integer NOT NULL, "skillId" integer NOT NULL, CONSTRAINT "PK_dabde7de391d8cb615c8e5cdba9" PRIMARY KEY ("candidateId", "skillId"))'
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_4705aaac46cfe4677063924aa1" ON "candidate_skills_skill" ("candidateId") '
    )
    await queryRunner.query(
      'CREATE INDEX "IDX_bfb1e97111854a77e033dc71cd" ON "candidate_skills_skill" ("skillId") '
    )
    await queryRunner.query(
      'ALTER TABLE "certificate" ADD CONSTRAINT "FK_d5f37b929f13ca06e0e22861b5e" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "certificate" ADD CONSTRAINT "FK_2fc3624dea803df5be9006e9b95" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    )
    await queryRunner.query(
      'ALTER TABLE "candidate_skills_skill" ADD CONSTRAINT "FK_4705aaac46cfe4677063924aa1a" FOREIGN KEY ("candidateId") REFERENCES "candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE'
    )
    await queryRunner.query(
      'ALTER TABLE "candidate_skills_skill" ADD CONSTRAINT "FK_bfb1e97111854a77e033dc71cd2" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "candidate_skills_skill" DROP CONSTRAINT "FK_bfb1e97111854a77e033dc71cd2"'
    )
    await queryRunner.query(
      'ALTER TABLE "candidate_skills_skill" DROP CONSTRAINT "FK_4705aaac46cfe4677063924aa1a"'
    )
    await queryRunner.query(
      'ALTER TABLE "certificate" DROP CONSTRAINT "FK_2fc3624dea803df5be9006e9b95"'
    )
    await queryRunner.query(
      'ALTER TABLE "certificate" DROP CONSTRAINT "FK_d5f37b929f13ca06e0e22861b5e"'
    )
    await queryRunner.query('DROP INDEX "IDX_bfb1e97111854a77e033dc71cd"')
    await queryRunner.query('DROP INDEX "IDX_4705aaac46cfe4677063924aa1"')
    await queryRunner.query('DROP TABLE "candidate_skills_skill"')
    await queryRunner.query('DROP TABLE "candidate"')
    await queryRunner.query('DROP TABLE "certificate"')
    await queryRunner.query('DROP TABLE "skill"')
  }
}
