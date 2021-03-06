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

describe('POST /plan', () => {
  it('should return status 401 in case of invalid token', async () => {
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
      VALUES (${userId}, '${token}')
    `);

    const body = {
      user_id: 1,
      plan_type: 'anual',
      delivery_day: 1,
      products: ['incenso'],
      full_user_name: 'Marina Sena',
      address: 'Rua dos bobos, n° 0',
      cep: '0000000',
      city: '',
      state: '',
    };

    const result = await supertest(app).post('/plan').send(body).set('Authorization', 'Bearer ');
    expect(result.status).toEqual(401);
  });

  it('should return status 406 in case of invalid params', async () => {
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
      VALUES (${userId}, '${token}')
    `);

    const body = {
      user_id: 1,
      plan_type: 'anual',
      delivery_day: 1,
      products: ['incenso'],
      full_user_name: 'Marina Sena',
      address: 'Rua dos bobos, n° 0',
      cep: '0000000',
      city: '',
      state: '',
    };

    const result = await supertest(app).post('/plan').send(body).set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(406);
  });

  it('should return status 201 in case of success', async () => {
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
      VALUES (${userId}, '${token}')
    `);

    const response = await connection.query(`
      INSERT INTO products
      (product_name)
      VALUES ('incenso'), ('chás')
      RETURNING product_id
    `);
    const productId = response.rows.flatMap((i) => i.product_id);
    const body = {
      user_id: userId,
      plan_type: 'Semanal',
      delivery_day: 1,
      products: productId,
      full_user_name: 'Marina Sena',
      address: 'Rua dos bobos, n° 0',
      cep: '44380000',
      city: 'Cruz das Almas',
      state: 'BA',
    };

    const result = await supertest(app).post('/plan').send(body).set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(201);
  });
});

afterAll(() => {
  connection.end();
});
