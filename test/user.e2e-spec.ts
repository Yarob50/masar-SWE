import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource, QueryRunner } from 'typeorm';

describe('User (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    // Get the DataSource
    dataSource = app.get(DataSource);

    queryRunner = dataSource.createQueryRunner();
  });

  it('/users (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/users');

    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.users).toBeInstanceOf(Array);
    expect(res.body.users.length).toBe(0);
  });

  it('/users (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send({ fullName: 'Yarob', age: 30 });

    console.log(res.body);
    expect(res.status).toBe(201);
    // expect(res.body.user.fullName).toBe('John Doe');
    // expect(res.body.user.age).toBe(30);
  });

  afterAll(async () => {
    // Clean up the database
    await queryRunner.clearDatabase();

    // Release the QueryRunner
    await queryRunner.release();

    await app.close();
  });
});
