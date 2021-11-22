/* eslint-disable no-undef */
import 'jest';
import '../src/setup';
import supertest from 'supertest';
import app from '../src/app';
import connection from '../src/database/database';

beforeEach(async () => {
  await connection.query('DELETE FROM sessions;');
  await connection.query('DELETE FROM users;');
});

describe('POST /register', () => {
  it('should return status 406 in case of invalid params', async () => {
    const body = {
      name: 'Marina',
      email: 'marinasena@',
      password: 'de1primeira!',
    };

    const result = await supertest(app).post('/register').send(body);
    expect(result.status).toEqual(406);
  });

  it('should return status 409 in case of repeated e-mail', async () => {
    await connection.query(`
      INSERT INTO users
      (user_name, email, password, plan_status)
      VALUES ('Marina', 'marinasena@gmail.com', 'De1primeira!', false)
    `);
    const body = {
      name: 'Marina',
      email: 'marinasena@gmail.com',
      password: 'De1primeira!',
    };

    const result = await supertest(app).post('/register').send(body);
    expect(result.status).toEqual(409);
  });

  it('should return status 201 for valid params', async () => {
    const body = {
      name: 'Marina',
      email: 'marinasena@gmail.com',
      password: 'De1primeira!',
    };

    const result = await supertest(app).post('/register').send(body);
    expect(result.status).toEqual(201);
  });
});

afterAll(() => {
  connection.end();
});
