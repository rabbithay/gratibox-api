/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import 'jest';
import supertest from 'supertest';
import app from '../src/app';
import connection from '../src/database/database';

beforeEach(async () => {
  await connection.query('DELETE FROM users;');
});

const body = {
  name: 'Marina',
  email: 'marinasena@gmail.com',
  password: 'De1primeira!',
};

describe('POST /register', () => {
  it('should return status 406 in case of invalid params', async () => {
    const body2 = {
      name: 'Marina',
      email: 'marinasena@',
      password: 'de1primeira!',
    };
    const result = await supertest(app).post('/register').send(body2);
    expect(result.status).toEqual(406);
  });

  it('should return status 409 in case of repeated e-mail', async () => {
    await connection.query(`
      INSERT INTO users
      (name, email, password)
      VALUES ('Marina', 'marinasena@gmail.com', 'De1primeira!');
    `);

    const result = await supertest(app).post('/register').send(body);
    expect(result.status).toEqual(409);
  });

  it('should return status 201 for valid params', async () => {
    const result = await supertest(app).post('/register').send(body);
    expect(result.status).toEqual(201);
  });
});

afterAll(() => {
  connection.end();
});
