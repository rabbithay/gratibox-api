/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import 'jest';
import supertest from 'supertest';
import app from '../src/app';
import connection from '../src/database/database';

beforeEach(async () => {
  await connection.query('DELETE FROM users;');
});

describe('', () => {
  it('', async () => {

  });
});

afterAll(() => {
  connection.end();
});
