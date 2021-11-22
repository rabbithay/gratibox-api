/* eslint-disable camelcase */
import connection from '../database/database';

export async function searchUserByEmail(email) {
  const emailList = await connection.query(`
    SELECT * FROM users
    WHERE email = $1
  `, [email]);
  return emailList.rows;
}

export async function insertUser(userInfo) {
  const {
    name, email, hashedPass,
  } = userInfo;
  await connection.query(`
    INSERT INTO users
    (user_name, email, password, plan_status)
    VALUES ($1, $2, $3, false)
  `, [name, email, hashedPass]);
}

export async function updateUser(userInfo) {
  const {
    full_user_name, address, cep, city, state, planId, user_id,
  } = userInfo;
  console.log({ userInfo });
  await connection.query(`
    UPDATE users
    SET full_user_name = $1,
    address = $2,
    cep = $3,
    city = $4,
    state = $5,
    plan_id = $6
    WHERE user_id = ${user_id}
  `, [full_user_name, address, cep, city, state, planId]);
}

export async function createSession(userInfo) {
  const { user_id, token } = userInfo;
  await connection.query(`
    INSERT INTO sessions
    (user_id, token)
    VALUES ($1, $2)
  `, [user_id, token]);
}

export async function deleteSession({ userId }) {
  await connection.query(`
    DELETE FROM sessions
    WHERE user_id=$1
  `, [userId]);
}
