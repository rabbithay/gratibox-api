/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import connection from '../database/database';

export async function searchUserByEmail(email) {
  const emailList = await connection.query(`
    SELECT * FROM users
    WHERE email = $1
  `, [email]);
  return emailList.rows;
}

export async function insertUser(userInfo) {
  console.log({ userInfo });

  const {
    name, email, password,
  } = userInfo;
  await connection.query(`
    INSERT INTO users
    (user_name, email, password, plan_status)
    VALUES ($1, $2, $3, false)
  `, [name, email, password]);
}
