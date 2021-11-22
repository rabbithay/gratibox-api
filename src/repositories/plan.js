/* eslint-disable camelcase */
import connection from '../database/database';

export async function createPlan(planInfo) {
  const { plan_type, delivery_day } = planInfo;

  connection.query(`
    INSERT INTO plans
    (plan_type, delivery_day)
    VALUES ($1, $2)
  `, [plan_type, delivery_day]);
}

export async function example2() {
  //
}
