/* eslint-disable camelcase */
import connection from '../database/database';

export async function addUserProducts(planInfo) {
  const { user_id, products } = planInfo;

  let productQuery = '';
  products.forEach((i) => {
    productQuery += ` (${user_id}, ${i}),`;
  });
  productQuery = productQuery.slice(0, -1);

  await connection.query(`
    INSERT INTO product_user
    (user_id, product_id)
    VALUES ${productQuery}
  `);
}

export async function example2() {
  //
}
