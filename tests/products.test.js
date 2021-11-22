/* eslint-disable no-undef */
import 'jest';
import '../src/setup';
import supertest from 'supertest';
import { v4 as uuid } from 'uuid';
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

describe('GET /products', () => {
  it('should return 401 in case of invalid token', async () => {
    const hashedPass = bcrypt.hashSync('De1primeira!', 13);
    let userId = await connection.query(`
      INSERT INTO users
      (user_name, email, password, plan_status)
      VALUES ('Marina', 'marinasena@gmail.com', '${hashedPass}', false)
      RETURNING user_id
    `);

    userId = userId.rows[0].user_id;
    const token = uuid();
    await connection.query(`
      INSERT INTO sessions
      (user_id, token)
      VALUES (${userId}, '${token}')
    `, []);

    const result = await supertest(app).get('/products').set('Authorization', 'Bearer pelejei');
    expect(result.status).toEqual(401);
  });

  it('should return 200 in case of success', async () => {
    const hashedPass = bcrypt.hashSync('De1primeira!', 13);
    let userId = await connection.query(`
      INSERT INTO users
      (user_name, email, password, plan_status)
      VALUES ('Marina', 'marinasena@gmail.com', $1, false)
      RETURNING user_id
    `, [hashedPass]);
    userId = userId.rows[0].user_id;

    const token = uuid();
    await connection.query(`  
      INSERT INTO sessions
      (user_id, token)
      VALUES (${userId[0]}, '${token}')
    `);

    const result = await supertest(app).get('/products').set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(200);
  });
});

afterAll(() => {
  connection.end();
});
