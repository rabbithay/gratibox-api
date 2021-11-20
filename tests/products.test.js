/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import 'jest';
import supertest from 'supertest';
import { v4 as uuid } from 'uuid';
import app from '../src/app';
import connection from '../src/database/database';

beforeEach(async () => {
  await connection.query('DELETE FROM users;');
});

describe('GET /products', () => {
  it('should return 401 in case of invalid token', async () => {
    const hashedPass = bcrypt.hashSync('De1primeira!', 13);
    const userId = await connection.query(`
      INSERT INTO users
      (name, email, password)
      VALUES ('Marina', 'marinasena@gmail.com', $1)
      RETURNING user_id
    `, [hashedPass]);

    const token = uuid();
    await connection.query(`
      INSERT INTO sessions
      (user_id, token)
      VALUES (${userId}, ${token})
    `);

    const result = await supertest(app).get('/products').set('Authorization', 'Bearer pelejei');
    expect(result.status).toEqual(401);
  });

  it('should return 200 in case of success', async () => {
    const hashedPass = bcrypt.hashSync('De1primeira!', 13);
    const userId = await connection.query(`
      INSERT INTO users
      (name, email, password)
      VALUES ('Marina', 'marinasena@gmail.com', $1)
      RETURNING user_id
    `, [hashedPass]);

    const token = uuid();
    await connection.query(`  
      INSERT INTO sessions
      (user_id, token)
      VALUES (${userId}, ${token})
    `);

    const result = await supertest(app).get('/products').set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(200);
  });
});

afterAll(() => {
  connection.end();
});
