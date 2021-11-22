/* eslint-disable camelcase */
import connection from '../database/database';

export async function createPlan(planInfo) {
  const { plan_type, delivery_day } = planInfo;

  const planId = await connection.query(`
    INSERT INTO plans
    (plan_type, delivery_day)
    VALUES ($1, $2)
    RETURNING plan_id
  `, [plan_type, delivery_day]);

  return planId.rows[0].plan_id;
}

export async function example2() {
  //
}
