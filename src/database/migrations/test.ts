import { MigrationInterface, QueryRunner } from 'typeorm';

export class Test implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
