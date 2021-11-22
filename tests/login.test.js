/* eslint-disable no-undef */
import 'jest';
import '../src/setup';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import app from '../src/app';
import connection from '../src/database/database';

beforeEach(async () => {
  await connection.query('DELETE FROM product_user;');
  await connection.query('DELETE FROM products;');
  await connection.query('DELETE FROM sessions;');
  await connection.query('DELETE FROM users;');
  await connection.query('DELETE FROM plans;');
});

describe('POST /login', () => {
  it('should return status 406 in case of invalid params', async () => {
    const body = {
      email: 'marinasena@',
      password: 'de1primeira!',
    };
    const result = await supertest(app).post('/login').send(body);
    expect(result.status).toEqual(406);
  });

  it('should return status 401 in case of email not registered', async () => {
    const body = {
      email: 'marinasena@gmail.com',
      password: 'De1primira!',
    };
    const result = await supertest(app).post('/login').send(body);
    expect(result.status).toEqual(401);
  });

  it('should return status 401 in case of incorrect password', async () => {
    const hashedPass = bcrypt.hashSync('De1primeira!', 13);
    await connection.query(`
      INSERT INTO users
      (user_name, email, password, plan_status)
      VALUES ('Marina', 'marinasena@gmail.com', $1, false)
    `, [hashedPass]);
    const body = {
      email: 'marinasena@gmail.com',
      password: 'De1primira!',
    };
    const result = await supertest(app).post('/login').send(body);
    expect(result.status).toEqual(401);
  });

  it('should return status 200 in case of success', async () => {
    const hashedPass = bcrypt.hashSync('De1primeira!', 13);
    await connection.query(`
      INSERT INTO users
      (user_name, email, password, plan_status)
      VALUES ('Marina', 'marinasena@gmail.com', $1, false)
    `, [hashedPass]);
    const body = {
      email: 'marinasena@gmail.com',
      password: 'De1primeira!',
    };
    const result = await supertest(app).post('/login').send(body);
    expect(result.status).toEqual(200);
  });
});

afterAll(() => {
  connection.end();
});
